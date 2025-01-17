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
  static int led_state = 0;
  int val = analogRead(US_AN);
  int max_val = 2000;
  double converted = (double)(max_val - val) / (double)max_val;
  Serial.println(converted);
  digitalWrite(LED_PIN, led_state);
  analogWrite(VIBRATOR_PIN, 0 * converted);
  delay(250);
  led_state = !led_state;
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
