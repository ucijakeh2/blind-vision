import { PermissionsAndroid } from "react-native";
import BleManager from "react-native-ble-manager";
import { Buffer } from "buffer";

export const SERVICE_UUID_STICK = "12345678-1234-1234-1234-123456789abc";
export const SERVICE_UUID_GLASSES = "22345678-1234-1234-1234-123456789abc";
export const CHARACTERISTIC_UUID = "abcd1234-ab12-cd34-ef56-1234567890ab";
const DELAY = 3; // in seconds

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
 * Return the device ID if found.
 * @param { string } serviceUUID - string of Service UUID to be filtered 
 * @returns { string | null }
 */
async function scan(serviceUUID) {
    console.log('Scanning for ESP32...');
    
    try {
        // Start scanning for ESP32
        await BleManager.scan([serviceUUID], DELAY, true);
        console.log('Scan started');

        // Wait for the scan to complete
        await new Promise(resolve => setTimeout(resolve, (DELAY + 1) * 1000));

        // Get all discovered peripherals
        const foundDevices = await BleManager.getDiscoveredPeripherals();
        console.log('Discovered devices:', foundDevices);

        // Must find only 1 peripheral, connect if found
        if (foundDevices.length > 0) {
            // await _connectToESP32(foundDevices[0].id);
            // await _connectToESP32(foundDevices[1].id);
            return foundDevices.filter((value) => value.advertising.serviceUUIDs[0] === serviceUUID)[0].id;
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
 * @returns {boolean} Connection status
 */
async function connect(deviceId) {
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
        
        return true;
    } 

    catch (error) { 
        console.error("Connection error:", error); 
        return false;
    }
}

/**
 * Read data from the ESP32 over BLE
 * @param {string} deviceId - The ESP32 ID, found in getDiscoveredPeripherals
 * @param {string} serviceUUID - The ESP32 service UUID
 * @param {boolean} [convertToString=false] - Convert the data to string before returning
 * @returns {number[] | string} Default to array of bytes, unless convertToString is set to true
 */
async function read(deviceId, serviceUUID, convertToString = false) {
    console.log(serviceUUID)

    const data = await BleManager.read(deviceId, serviceUUID, CHARACTERISTIC_UUID);
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
 * @param {string} serviceUUID - The ESP32 service UUID, found in getDiscoveredPeripherals
 * @param {number[]} byteArray - The array of bytes to write to ESP32
 */
async function write(deviceId, serviceUUID, byteArray) {
    console.log("Writing to ESP32: " + byteArray)
    const buffer = Buffer.from(byteArray)
    await BleManager.write(deviceId, serviceUUID, CHARACTERISTIC_UUID, buffer.toJSON().data)
}
/**
 * Ask user to enable bluetooth
 * @returns {boolean} Allow or deny
 */
async function enableBLE() {
    try {
        await BleManager.enableBluetooth();
        return true;
    } catch (error) { return false; }
}

export default {
    requestPermissions,
    start,
    scan,
    connect,
    read,
    write,
    enableBLE
}