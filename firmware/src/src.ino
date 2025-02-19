#include <arduino-timer.h>
#include "config.h"
#include "timer.h"
#include <math.h>

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
  us_init();
  // va_init();
  sleep(1);
  // va_drive(255);
}

void loop() {
  uint8_t l_useful = us_read_useful();
  Serial.println(l_useful);
  // analogWrite(LED_PIN, l_useful);
  delayMicroseconds(500000);
}

#elif TEST_CO
///////////////////////////////////////////////////////////
/////////////////// COMPASS TEST MAIN /////////////////////
///////////////////////////////////////////////////////////

bool read_compass_data(void*)
{
  int l_angle = co_read();
  // // print measured values
  // Serial.print("X: ");
  // Serial.print(x);
  // Serial.print(" Y: ");
  // Serial.print(y);
  // Serial.print(" Z: ");
  // Serial.print(z);

  // float l_heading = atan2(y, x) * (180.0 / PI);
  // if (l_heading < 0) l_heading += 360.0;

  Serial.println(" Theta: " + String(l_angle));
  return true;
}

void setup() {
  Serial.begin(9600);
  sleep(2);
  LOG("----------------");
  LOG("TESTING COMPASS");
  LOG("----------------");
  co_init();
  sleep(1);
  g_us_timer.every(250000, read_compass_data);
}

void loop() {
  g_us_timer.tick();
  delay(1); // default delay to not drain power like crazy
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
  va_init();
  sleep(1);
}

void loop() {
  static uint8_t l_drive_amount = 0;
  va_drive(l_drive_amount++);
  delay(50);
}

// TEST_VA
#elif TEST_SP
///////////////////////////////////////////////////////////
//////////////////// SPEAKER TEST MAIN ////////////////////
///////////////////////////////////////////////////////////

bool pulse(void*)
{
  static bool s_pulse = false;
  Serial.println(s_pulse);
  s_pulse = !s_pulse;
  sp_drive_amount(s_pulse ? 1 : 0);
  return true;
}

void setup() {
  Serial.begin(9600);
  sleep(2);
  LOG("----------------");
  LOG("TESTING SPEAKERS");
  LOG("----------------");
  sp_init();
  sleep(1);
  g_us_timer.every(2000000, pulse);
}

void loop() {
  g_us_timer.tick();
  delayMicroseconds(1);
}

// TEST_SP
#elif TEST_BL

void setup() {
  Serial.begin(9600);
  sleep(2);
  LOG("----------------");
  LOG("TESTING BLE");
  LOG("----------------");
  bl_init();
  sleep(1);
}

void loop() {
  bool res = bl_send("Testing Send");
  Serial.println("Send successful: " + String(res));
  delay(2000);
}

// TEST_BL
#elif GLASSES
///////////////////////////////////////////////////////////
//////////// GENERIC RELEASE MAIN - GLASSES ///////////////
///////////////////////////////////////////////////////////

// compass measurements
int g_co_x;
int g_co_y;
int g_co_z;

bool update_us_data_and_beep(void*)
{
  constexpr uint32_t MAX_BEEP_PERIOD_us = 1000000;
  constexpr uint32_t MIN_BEEP_PERIOD_us = 50000;
  constexpr uint32_t BEEP_PERIOD_RANGE_us = MAX_BEEP_PERIOD_us - MIN_BEEP_PERIOD_us;
  constexpr double   CONVERSION_FACTOR = (double)BEEP_PERIOD_RANGE_us/(double)255;

  // static pulse var
  static bool s_pulse = false;

  ////////////////////

  // max 255, min 0
  uint8_t l_us_useful_measurement = us_read_useful();
  // uint8_t l_us_useful_measurement = 255;

  // Serial.println(l_us_useful_measurement);

  // cutoff test
  if (l_us_useful_measurement == 0)
  {
    g_us_timer.in(500000, update_us_data_and_beep);
    sp_drive_amount(0);
    return true;
  }

  // toggle pulse
  s_pulse = !s_pulse;

  // drive speaker with (tone / no tone)
  sp_drive_amount(s_pulse ? 1 : 0);

  // if (l_us_useful_measurement == 0)
  //   return

  Serial.println(sp_slope_factor());

  Serial.println(l_us_useful_measurement);

  // period computed from ultrasonic useful measurement
  uint32_t l_period_us =
    (double)(255 - l_us_useful_measurement) // USEFUL COMPLIMENT
    * CONVERSION_FACTOR             // CONVERSION RATIO
    * sp_slope_factor()
    + (double)MIN_BEEP_PERIOD_us;   // OFFSET

  Serial.println(l_period_us);

  g_us_timer.in(l_period_us, update_us_data_and_beep);
  
  return true;
}

bool update_co_data(void*)
{
  int l_angle = co_read();
  // Serial.println(" Theta: " + String(l_angle));
  return true;
}

void setup() {
  Serial.begin(9600);
  sleep(2);
  LOG("----------------");
  LOG("DEVICE BOOTED UP: GLASSES");
  LOG("----------------");
  us_init();
  co_init();
  sp_init();
  // bl_init();
  sleep(1);
  g_us_timer.in(500000, update_us_data_and_beep);
  g_us_timer.every(250000, update_co_data);
  // g_us_timer.every(50000,  print_measurements);
}

void loop() {
  g_us_timer.tick();
  delayMicroseconds(1);
}

// GLASSES
#else
///////////////////////////////////////////////////////////
///////////// GENERIC RELEASE MAIN - STICK ////////////////
///////////////////////////////////////////////////////////

bool update_us_measurement_and_va_drive(void*)
{
  // collect ultrasonic measurement
  uint8_t l_us_useful_measurement = us_read_useful();

  va_drive(l_us_useful_measurement);
  
  return true;
}

void setup() {
  Serial.begin(9600);
  sleep(2);
  LOG("----------------");
  LOG("DEVICE BOOTED UP: STICK");
  LOG("----------------");
  va_init();
  // bl_init();
  sleep(1);
  g_us_timer.every(50000, update_us_measurement_and_va_drive);
}

void loop() {
  g_us_timer.tick();
  delay(1);
}

#endif 
