#include <arduino-timer.h>
#include "config.h"
#include "timer.h"

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
#elif GLASSES
///////////////////////////////////////////////////////////
//////////// GENERIC RELEASE MAIN - GLASSES ///////////////
///////////////////////////////////////////////////////////

// ultrasonic measurement
uint8_t g_us_useful_measurement;

// compass measurements
int g_co_x;
int g_co_y;
int g_co_z;

#define MAX_SP_PULSE_PERIOD 1000000
#define MIN_SP_PULSE_PERIOD  250000

g_us_timer_t::Task g_sp_pulse_task;

bool sp_pulse(void*)
{
  static bool s_pulse = false;
  Serial.println(s_pulse);
  s_pulse = !s_pulse;
  sp_drive_amount(s_pulse ? 1 : 0);
  return true;
}

bool print_measurements(void*)
{
  // print measured compass values
  // Serial.print("X: ");
  // Serial.print(g_co_x);
  // Serial.print(" Y: ");
  // Serial.print(g_co_y);
  // Serial.print(" Z: ");
  // Serial.print(g_co_z);
  // Serial.print(", US: ");
  // Serial.println(g_us_useful_measurement);
  return true;
}

bool update_us_data(void*)
{
  constexpr uint32_t MAX_FREQUENCY_mHz = 10000;
  constexpr uint32_t MIN_FREQUENCY_mHz = 500;
  constexpr uint8_t QUANTIZATION_LEVELS = 4;
  static uint8_t s_previous_quantized_measurement = 0;

  // Serial.println(us_read_scaled());

  ////////////////////

  // max 255, min 0
  g_us_useful_measurement = us_read_useful();

  // Serial.println(g_us_useful_measurement);

  // max 255, min 0
  uint8_t l_us_quantized_measurement = (uint32_t)g_us_useful_measurement * (uint32_t)QUANTIZATION_LEVELS / (uint32_t)255;

  // Serial.println(l_us_quantized_measurement);

  ////////////////////////////////////////////////////////////
  ////////////////// LATCH THE QUANTIZED VALUE ///////////////
  ////////////////////////////////////////////////////////////
  if (l_us_quantized_measurement == s_previous_quantized_measurement) return true;
  s_previous_quantized_measurement = l_us_quantized_measurement;

  if (g_sp_pulse_task) {
    // cancel pulse task (ONLY IF CURRENTLY RUNNING)
    g_us_timer.cancel(g_sp_pulse_task);
    g_sp_pulse_task = nullptr;
  }

  ////////////////////////////////////////////////////////////
  ////////////// IF CUTOFF, DON'T START PULSE TASK ///////////
  ////////////////////////////////////////////////////////////
  if (l_us_quantized_measurement == 0) {
    sp_drive_amount(0); // we never want to get stuck at a note. Always clear the drive amount.
    return true;
  }

  // COMPUTE FREQUENCY BASED ON INVERSE-DISTANCE
  uint32_t frequency_mHz = (uint32_t)l_us_quantized_measurement * ((uint32_t)MAX_FREQUENCY_mHz - (uint32_t)MIN_FREQUENCY_mHz) / (uint32_t)QUANTIZATION_LEVELS + (uint32_t)MIN_FREQUENCY_mHz;

  // Serial.println(frequency_mHz);

  uint32_t period_us = 1000000000 / frequency_mHz;

  Serial.println(period_us);

  // Serial.println(g_us_timer.size());

  // sp_pulse(nullptr); // pulse once to make sure we emit SOME noise when quantized level is transitioning
  g_sp_pulse_task = g_us_timer.every(period_us, sp_pulse);
  
  return true;
}

bool update_co_data(void*)
{
  co_read(&g_co_x, &g_co_y, &g_co_z);
  return true;
}

void setup() {
  Serial.begin(9600);
  g_sp_pulse_task = nullptr;
  sleep(2);
  LOG("----------------");
  LOG("DEVICE BOOTED UP: GLASSES");
  LOG("----------------");
  us_init();
  co_init();
  sp_init();
  sleep(1);
  g_us_timer.every(50000, update_us_data);
  // g_us_timer.every(250000, update_co_data);
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

// ultrasonic measurement
uint8_t g_us_useful_measurement;

bool update_us_data(void*)
{
  g_us_useful_measurement = us_read_useful();
  return true;
}

bool update_va_drive(void*)
{
  constexpr uint8_t MIN_DRIVE_AMOUNT = 140;
  constexpr uint8_t MAX_DRIVE_AMOUNT = 255;
  constexpr uint8_t DRIVE_AMOUNT_RANGE = MAX_DRIVE_AMOUNT - MIN_DRIVE_AMOUNT;

  uint8_t l_drive_amount = 
    g_us_useful_measurement == 0 ?
    0 : // cutoff
    (double)g_us_useful_measurement * (double)DRIVE_AMOUNT_RANGE/(double)255 + (double)MIN_DRIVE_AMOUNT;

  va_drive(l_drive_amount);
  return true;
}

auto timer = timer_create_default();

void setup() {
  Serial.begin(9600);
  sleep(2);
  LOG("----------------");
  LOG("DEVICE BOOTED UP: STICK");
  LOG("----------------");
  va_init();
  sleep(1);
  timer.every(50, update_us_data);
  timer.every(50, update_va_drive);
}

void loop() {
  timer.tick();
  delay(1);
}

#endif 
