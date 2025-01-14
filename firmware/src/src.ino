// ESP32NANO DATASHEET: https://docs.arduino.cc/resources/datasheets/ABX00083-datasheet.pdf

#include "config.h"

void setup() {
  Serial.begin(9600);
  sleep(2);
  LOG("----------------");
  LOG("DEVICE BOOTED UP");
  LOG("----------------");
  pinMode(LED_PIN, OUTPUT);
  us_init();
  va_init();
  sleep(1);
  va_drive(0);
}

void loop() {
  static uint8_t l_drive = 0;
  // Serial.println(analogRead(US_AN));
  delay(500);

  // va_drive(l_drive);

  digitalWrite(LED_PIN, l_drive);

  l_drive = !l_drive;
  
  // ++l_drive;
}
