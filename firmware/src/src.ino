#include "config.h"

#if TEST_US
///////////////////////////////////////////////////////////
////////////////// ULTRASONIC TEST MAIN ///////////////////
///////////////////////////////////////////////////////////

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
}

void loop() {
  uint8_t l_useful = us_read_useful();
  Serial.println(l_useful);
  analogWrite(LED_PIN, l_useful);
  delay(50);
}

// TEST_US
#else
///////////////////////////////////////////////////////////
////////////////// GENERIC RELEASE MAIN ///////////////////
///////////////////////////////////////////////////////////

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
  static int led_state = 0;
  Serial.println(analogRead(US_AN));
  digitalWrite(LED_PIN, led_state);
  delay(250);
  led_state = !led_state;
}

#endif 
