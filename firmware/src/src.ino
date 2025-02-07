#include <arduino-timer.h>
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

bool print_measurements(void*)
{
  // print measured compass values
  Serial.print("X: ");
  Serial.print(g_co_x);
  Serial.print(" Y: ");
  Serial.print(g_co_y);
  Serial.print(" Z: ");
  Serial.print(g_co_z);
  Serial.print(", US: ");
  Serial.println(g_us_useful_measurement);
  return true;
}

bool update_us_data(void*)
{
  g_us_useful_measurement = us_read_useful();
  return true;
}

bool update_co_data(void*)
{
  co_read(&g_co_x, &g_co_y, &g_co_z);
  return true;
}

auto timer = timer_create_default();

void setup() {
  Serial.begin(9600);
  sleep(2);
  LOG("----------------");
  LOG("DEVICE BOOTED UP: GLASSES");
  LOG("----------------");
  us_init();
  co_init();
  sleep(1);
  timer.every(50,  update_us_data);
  timer.every(250, update_co_data);
  timer.every(50,  print_measurements);
}

void loop() {
  timer.tick();
  delay(1);
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
