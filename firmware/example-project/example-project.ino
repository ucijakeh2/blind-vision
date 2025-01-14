#include "header.h"

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  sleep(2);
}

void loop() {
  // put your main code here, to run repeatedly:
  // Serial.println("test123");
  doPrint();
}
