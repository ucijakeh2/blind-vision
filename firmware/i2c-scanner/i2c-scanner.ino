#include <Wire.h>

void setup() {
  Serial.begin(9600);
  sleep(3);
  Serial.println("Scanning I2C devices...");
  Wire.begin();

  for (byte address = 1; address < 127; address++) {
    Wire.beginTransmission(address);
    if (Wire.endTransmission() == 0) {
      Serial.print("Device found at 0x");
      Serial.println(address, HEX);
    }
  }
}

void loop() {
  delay(5000);
}
