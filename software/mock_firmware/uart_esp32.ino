#define TX_PIN 17
#define RX_PIN 16
#define BAUD_RATE 115200

HardwareSerial mySerial(1);  // Use hardware serial 1 (you can use 0, 1, or 2)

void setup() {
  // Initialize Serial Monitor
  Serial.begin(115200);
  while (!Serial);

  // Initialize UART communication
  mySerial.begin(BAUD_RATE, SERIAL_8N1, RX_PIN, TX_PIN);
  Serial.println("ESP32 Receiver Ready.");
}

void loop() {
  // Check if data is available to read
  if (mySerial.available() > 0) {
    // Read and display the received data
    byte receivedMessage = mySerial.read();
    Serial.print("Received message: ");
    Serial.println(receivedMessage);
  }
}