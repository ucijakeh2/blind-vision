#include "header.h"

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  sleep(2);
  pinMode(24, OUTPUT);
  sleep(1);
}

void loop() {
  // put your main code here, to run repeatedly:
  // Serial.println("test123");
  // doPrint();
  digitalWrite(24, HIGH);
  sleep(1);
  digitalWrite(24, LOW);
  sleep(1);
}
