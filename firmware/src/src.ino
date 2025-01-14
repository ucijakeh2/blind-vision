#include "config.h"

void setup() {
  Serial.begin(9600);
  sleep(2);
  pinMode(LED_PIN, OUTPUT);
  pinMode(VIBRATOR_PIN, OUTPUT); // vibrator
  us_init();
  sleep(1);
}

// void loop() {
//   // put your main code here, to run repeatedly:
//   // Serial.println("test123");
//   // doPrint();
//   analogWrite(VIBRATOR_PIN, 0);
//   digitalWrite(LED_PIN, HIGH);
//   sleep(1);
//   digitalWrite(LED_PIN, LOW);

//   Serial.println(analogRead(US_AN));
  
//   sleep(1);
// }

void loop() {
  Serial.println(analogRead(US_AN));
  delay(50);
}
