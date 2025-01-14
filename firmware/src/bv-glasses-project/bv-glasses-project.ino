#include "header.h"

#define VIBRATOR_PIN 17

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  sleep(2);
  pinMode(24, OUTPUT);
  pinMode(VIBRATOR_PIN, OUTPUT); // vibrator
  sleep(1);
}

void loop() {
  // put your main code here, to run repeatedly:
  // Serial.println("test123");
  // doPrint();
  analogWrite(VIBRATOR_PIN, 0);
  digitalWrite(24, HIGH);
  sleep(3);
  digitalWrite(24, LOW);
  
  sleep(1);
}
