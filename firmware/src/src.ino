#include "config.h"

#if TEST_US
///////////////////////////////////////////////////////////
////////////////// ULTRASONIC TEST MAIN ///////////////////
///////////////////////////////////////////////////////////

void setup() {
  Serial.begin(9600);
  sleep(2);
  LOG("----------------");
  LOG("TESTING ULTRASONIC");
  LOG("----------------");
  pinMode(LED_PIN, OUTPUT);
  us_init();
  va_init();
  sleep(1);
}

void loop() {
  uint8_t l_useful = us_read_useful();
  // Serial.println(l_useful);
  analogWrite(LED_PIN, l_useful);
  delay(50);
}

// TEST_US
#elif TEST_VA
///////////////////////////////////////////////////////////
////////////// VIBRATING ACTUATOR TEST MAIN ///////////////
///////////////////////////////////////////////////////////

void setup() {
  Serial.begin(9600);
  sleep(2);
  LOG("----------------");
  LOG("TESTING VIBRATING ACTUATOR");
  LOG("----------------");
  pinMode(LED_PIN, OUTPUT);
  va_init();
  sleep(1);
}

void loop() {
  static uint8_t l_drive_amount = 0;
  va_drive(l_drive_amount++);
  delay(50);
}

// TEST_VA
#elif GLASSES
///////////////////////////////////////////////////////////
//////////// GENERIC RELEASE MAIN - GLASSES ///////////////
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
  sp_init();
  sleep(1);
}

void loop() {
  static uint8_t s_useful = 0;
  static unsigned long s_loop_it = 0;
  // delay(50);
  if ((s_loop_it++) > 1000000 == 0)
  {
    s_loop_it = 0;
    s_useful = us_read_useful();
    sp_drive_amount(s_useful);
    Serial.println(s_useful);
  }
  sp_drive();
}

// GLASSES
#else
///////////////////////////////////////////////////////////
///////////// GENERIC RELEASE MAIN - STICK ////////////////
///////////////////////////////////////////////////////////



#endif 
