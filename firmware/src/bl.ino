#include <BLEDevice.h>
#include <BLEServer.h>
#include <BLEUtils.h>
#include <BLE2902.h>

#include "bl.h"
#include "va.h"

// BLE Service and Characteristic UUIDs
#define SERVICE_UUID        "12345678-1234-1234-1234-123456789abc"
#define CHARACTERISTIC_UUID "abcd1234-ab12-cd34-ef56-1234567890ab"

BLECharacteristic *pCharacteristic;
bool deviceConnected = false;

// Callback class for handling device connections
class MyServerCallbacks : public BLEServerCallbacks {
  void onConnect(BLEServer* pServer) {
    deviceConnected = true;
    Serial.println("Device connected!");
  }

  void onDisconnect(BLEServer* pServer) {
    deviceConnected = false;
    Serial.println("Device disconnected!");
    // Restart advertising so the app can find the ESP32 again
    pServer->getAdvertising()->start();
  }
};

// Callback for reading and writing BLE characteristic
class MyCallbacks : public BLECharacteristicCallbacks {
  void onWrite(BLECharacteristic *pCharacteristic) {
    String value(pCharacteristic->getValue().c_str());

    #if TEST_BL
    ///////////////////////////
    ///// IN CASE OF TESTING MODE
    ///////////////////////////

    // just do some serial prints for testing bluetooth

    Serial.print("Received: ");
    Serial.println(value);

    #elif GLASSES
    ///////////////////////////
    ///// IN CASE OF PRODUCTION MODE : GLASSES
    ///////////////////////////

    #else
    ///////////////////////////
    ///// IN CASE OF PRODUCTION MODE : STICK
    ///////////////////////////

    Serial.print("Received: ");

    // extract control byte
    uint8_t l_byte = value[0];

    double l_va_slope_factor = (double)l_byte / (double)255;

    Serial.println(l_byte);
    Serial.println("Slope Factor: " + String(l_va_slope_factor));
    
    // configure vibrating actuator slope factor
    va_slope_factor(l_va_slope_factor);

    #endif

  }
};

void bl_init() {
  Serial.println("Starting BLE Server...");

  // Initialize BLE
  BLEDevice::init("ESP32_BLE_Server");
  BLEServer *pServer = BLEDevice::createServer();
  pServer->setCallbacks(new MyServerCallbacks());

  // Create BLE Service
  BLEService *pService = pServer->createService(SERVICE_UUID);

  // Create BLE Characteristic
  pCharacteristic = pService->createCharacteristic(
                      CHARACTERISTIC_UUID,
                      BLECharacteristic::PROPERTY_READ |
                      BLECharacteristic::PROPERTY_WRITE |
                      BLECharacteristic::PROPERTY_NOTIFY
                    );

  pCharacteristic->setCallbacks(new MyCallbacks());
  pCharacteristic->addDescriptor(new BLE2902());

  // Start the service
  pService->start();

  // Start Advertising
  BLEAdvertising *pAdvertising = BLEDevice::getAdvertising();
  pAdvertising->addServiceUUID(SERVICE_UUID);  // Add service UUID
  pAdvertising->setScanResponse(true);
  pAdvertising->setMinPreferred(0x06);
  pAdvertising->setMinPreferred(0x12);
  
  BLEDevice::startAdvertising();
  Serial.println("ESP32 BLE Server is advertising...");

}

bool bl_send(const char* a_data)
{
  if (!deviceConnected)
    return false;
  // sends a notification
  pCharacteristic->setValue(a_data);
  pCharacteristic->notify();
  Serial.println("Sent notification: " + String(a_data));
  return true;
}
