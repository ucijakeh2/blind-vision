#include "us.h"

void us_calibrate()
{
  pinMode(US_TX, OUTPUT);
  pinMode(US_RX, OUTPUT);
  pinMode(US_PW, OUTPUT);
  pinMode(US_AN, OUTPUT);

  // start all pins at LOW
  digitalWrite(US_TX, LOW);
  digitalWrite(US_RX, LOW);
  digitalWrite(US_PW, LOW);
  analogWrite (US_AN, 0);

  // wait to start timing
  delay(100);

  // t=0ms
  digitalWrite(US_RX, HIGH);
  
  delay(1);

  // t=1ms
  digitalWrite(US_PW, HIGH);

  delay(1);

  // t=2ms
  analogWrite(US_AN, 255);

  delay(37);

  // t=39ms
  digitalWrite(US_PW, LOW);

  delay(5);

  // t=44ms
  delayMicroseconds(300);

  // t=44.3ms
  digitalWrite(US_TX, HIGH);

  delay(4);

  // t=48.3ms
  delayMicroseconds(700);

  digitalWrite(US_TX, LOW);
  digitalWrite(US_RX, LOW);

  ////////
  // END OF TIMING DIAGRAM

  delay(100);

}

void us_init()
{
  us_calibrate();
  // set pin modes for use
  pinMode(US_RX, OUTPUT);
  pinMode(US_AN, INPUT);
  pinMode(US_PW, INPUT);
  pinMode(US_TX, INPUT);

  digitalWrite(US_RX, HIGH);

}
