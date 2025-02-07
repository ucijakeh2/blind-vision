#include <BLEDevice.h>
#include <BLEServer.h>
#include <BLEUtils.h>
#include <BLE2902.h>

// BLE Service and Characteristic UUIDs
#define SERVICE_UUID        "12345678-1234-1234-1234-123456789abc"
#define CHARACTERISTIC_UUID "abcd1234-ab12-cd34-ef56-1234567890ab"

BLECharacteristic *pCharacteristic;
bool deviceConnected = false;
String receivedValue = "";
const int indexLedPin = 23;
const int testLedPins[4] = {21, 3, 1, 22};

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
    String value = pCharacteristic->getValue();

    if (value.length() > 0) {
      uint8_t bitmask = (uint8_t)value[1];  // Read first byte as bitmask
      Serial.print("Received bitmask: 0x");
      Serial.println(bitmask, HEX);

      // Print individual bits
      Serial.print("Bit pattern: ");
      for (int i = 7; i >= 0; i--) {
        Serial.print((bitmask >> i) & 1);
      }
      Serial.println();

      // Apply bitmask to LEDs
      for (int i = 0; i < 4; i++) {
        digitalWrite(testLedPins[i], (bitmask >> i) & 1);
      }
      digitalWrite(indexLedPin, (uint8_t)value[0]);
    }
  }
};

void setup() {
  Serial.begin(115200);
  Serial.println("Starting BLE Server...");

  // Initialize LED pins as OUTPUT
  for (int i = 0; i < 4; i++) {
    pinMode(testLedPins[i], OUTPUT);
    digitalWrite(testLedPins[i], LOW);  // Start with LEDs OFF
  }
  pinMode(indexLedPin, OUTPUT);
  digitalWrite(indexLedPin, LOW);


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

void loop() {
  // Send a notification every 2 seconds if a device is connected
  if (deviceConnected) {
    std::string message = "Hello BLE";
    pCharacteristic->setValue(message.c_str());
    pCharacteristic->notify();
    Serial.println("Sent notification: " + String(message.c_str()));
    delay(2000);
  }
}