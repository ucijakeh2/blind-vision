import { PermissionsAndroid } from "react-native";
import BleManager, { Peripheral } from "react-native-ble-manager";
import { Buffer } from "buffer";

const SERVICE_UUID = "12345678-1234-1234-1234-123456789abc";
const CHARACTERISTIC_UUID = "abcd1234-ab12-cd34-ef56-1234567890ab";
const DELAY = 5; // in seconds

/**
 * Request Android BLE Permissions
 */
async function requestPermissions() {
    try {
        const granted = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        ]);
        console.log('Permissions granted:', granted);
    } catch (error) { console.error('Permission error:', error); }
}

/**
 * Start the BLE Manager
 */
async function start() {
    BleManager.start({ showAlert: false }).then(() => console.log('BLE Manager initialized'));
}

/**
 * Start scanning for the corresponding ESP32 (SERVICE_UUID).
 * Attempt to connect when found.
 * @returns { Peripheral | null }
 */
async function scanThenConnect() {
    console.log('Scanning for ESP32...');
    
    try {
        // Start scanning for ESP32
        await BleManager.scan([SERVICE_UUID], DELAY, true);
        console.log('Scan started');

        // Wait for the scan to complete
        await new Promise(resolve => setTimeout(resolve, (DELAY + 1) * 1000));

        // Get all discovered peripherals
        const foundDevices = await BleManager.getDiscoveredPeripherals();
        console.log('Discovered devices:', foundDevices);

        // Must find only 1 peripheral, connect if found
        if (foundDevices.length === 1) {
            await _connectToESP32(foundDevices[0].id);
            return foundDevices[0];
        }

        // Return null otherwise
        console.log("Failed to discover ESP32");
        return null;

    } catch (err) {
        console.error('Scan error:', err);
        return null;
    }
}

/**
 * Helper function that attempts to connect to deviceId,
 * ensure that it matches SERVICE_UUID and CHARACTERISTIC_UUID
 * @param {string} deviceId - The ESP32 ID, found in getDiscoveredPeripherals
 */
async function _connectToESP32(deviceId) {
    try {
      await BleManager.connect(deviceId);
      console.log(`Connected to ${deviceId}`);
  
      const services = await BleManager.retrieveServices(deviceId);
      console.log("Services:", services);
  
      const characteristic = services.characteristics.find(char => 
        char.characteristic === CHARACTERISTIC_UUID
      );
  
      if (characteristic) { console.log("Found characteristic:", characteristic); } 
      else { console.log("Characteristic not found"); }
    } catch (error) { console.error("Connection error:", error); }
}

/**
 * Read data from the ESP32 over BLE
 * @param {string} deviceId - The ESP32 ID, found in getDiscoveredPeripherals
 * @param {boolean} [convertToString=false] - Convert the data to string before returning
 * @returns {Array<number> | string} Default to array of bytes, unless convertToString is set to true
 */
async function read(deviceId, convertToString = false) {
    const data = await BleManager.read(deviceId, SERVICE_UUID, CHARACTERISTIC_UUID);
    console.log("Raw data from ESP32:", data);
    if(!convertToString) { return data; }

    // Convert byte array to string
    const text = String.fromCharCode(...data);
    console.log("Decoded String:", text);
    return text;
}

/**
 * Write data to the ESP32 over BLE
 * @param {string} deviceId - The ESP32 ID, found in getDiscoveredPeripherals
 * @param {Array<number>} byteArray - The array of bytes to write to ESP32
 */
async function write(deviceId, byteArray) {
    console.log("Writing to ESP32: " + byteArray)
    const buffer = Buffer.from(byteArray)
    await BleManager.write(deviceId, SERVICE_UUID, CHARACTERISTIC_UUID, buffer.toJSON().data)
}

export default {
    requestPermissions,
    start,
    scanThenConnect,
    read,
    write
}