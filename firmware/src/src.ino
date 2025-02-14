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
  sleep(1);
}

void loop() {
  uint8_t l_useful = us_read_useful();
  Serial.println(l_useful);
  // analogWrite(LED_PIN, l_useful);
  delay(50);
}

#elif TEST_CO
///////////////////////////////////////////////////////////
/////////////////// COMPASS TEST MAIN /////////////////////
///////////////////////////////////////////////////////////

bool read_compass_data(void*)
{
  int x,y,z;
  co_read(&x, &y, &z);
  // print measured values
  Serial.print("X: ");
  Serial.print(x);
  Serial.print(" Y: ");
  Serial.print(y);
  Serial.print(" Z: ");
  Serial.println(z);
  return true;
}

auto timer = timer_create_default();

void setup() {
  Serial.begin(9600);
  sleep(2);
  LOG("----------------");
  LOG("TESTING COMPASS");
  LOG("----------------");
  co_init();
  sleep(1);
  timer.every(250, read_compass_data);
}

void loop() {
  timer.tick();
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

  // Serial.println(l_us_useful_measurement);

  // cutoff test
  if (l_us_useful_measurement == 0)
  {
    g_us_timer.in(50000, update_us_data_and_beep);
    sp_drive_amount(0);
    return true;
  }

  // toggle pulse
  s_pulse = !s_pulse;

  // drive speaker with (tone / no tone)
  sp_drive_amount(s_pulse ? 1 : 0);


  // if (l_us_useful_measurement == 0)
  //   return 

  constexpr uint8_t TEMP_SAT_MEASUREMENT = 200;

  // period computed from ultrasonic useful measurement
  uint32_t l_period_us =
    (double)(TEMP_SAT_MEASUREMENT - min(TEMP_SAT_MEASUREMENT, l_us_useful_measurement)) // USEFUL COMPLIMENT
    * CONVERSION_FACTOR                     // CONVERSION RATIO
    + (double)MIN_BEEP_PERIOD_us;           // OFFSET

  // Serial.println(l_period_us);

  g_us_timer.in(l_period_us, update_us_data_and_beep);
  
  return true;
}

bool update_co_data(void*)
{
  co_read(&g_co_x, &g_co_y, &g_co_z);
  Serial.print("X: ");
  Serial.print(g_co_x);
  Serial.print(" Y: ");
  Serial.print(g_co_y);
  Serial.print(" Z: ");
  Serial.print(g_co_z);
  Serial.println(" Theta: " + String(atan2(g_co_y, g_co_x)));
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
  sleep(1);
  g_us_timer.in(50000, update_us_data_and_beep);
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
  bl_init();
  sleep(1);
  g_us_timer.every(50000, update_us_measurement_and_va_drive);
}

void loop() {
  g_us_timer.tick();
  delay(1);
}

#endif 
