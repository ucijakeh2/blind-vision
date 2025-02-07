#include "us.h"

#ifdef US_TX // if us sensor is plugged in

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

  LOG("US: calibration completed");

}

void us_init()
{
  // us_calibrate();
  // set pin modes for use
  pinMode(US_RX, OUTPUT);
  pinMode(US_AN, INPUT);
  pinMode(US_PW, INPUT);
  pinMode(US_TX, INPUT);

  digitalWrite(US_RX, HIGH);

  LOG("US: initialization completed");

}

uint16_t us_read_scaled()
{
  constexpr uint16_t SENSOR_RESOLUTION = 512;
  uint16_t l_unscaled = analogRead(US_AN);
  return (l_unscaled * SENSOR_RESOLUTION) / ESP32_ANALOG_RESOLUTION;
}

uint8_t  us_read_useful()
{
  // THIS FUNCTION CONVERTS SENSOR DISTANCE INTO
  //     USEFUL UNITS
  // 
  // UNIT SPEC: (0-255),
  //     0   means obstacle is far enough away to be irrelevant   ( actuator cutoff      )
  //     255 means obstacle is as close as we deem useful         ( saturating actuators )
  //

  #if GLASSES

  constexpr uint8_t MAX_USEFUL_DISTANCE_IN = 96;
  constexpr uint8_t MIN_USEFUL_DISTANCE_IN = 12;

  #else

  constexpr uint8_t MAX_USEFUL_DISTANCE_IN = 48;
  constexpr uint8_t MIN_USEFUL_DISTANCE_IN = 12;

  #endif

  // there is a 1-1 correspondance between inches and Vcc/512, per US datasheet.
  constexpr uint16_t MAX_USEFUL = MAX_USEFUL_DISTANCE_IN;
  constexpr uint16_t MIN_USEFUL = MIN_USEFUL_DISTANCE_IN;
  constexpr uint16_t USEFUL_RANGE = MAX_USEFUL - MIN_USEFUL;

  // read in raw value
  uint16_t l_raw = us_read_scaled();

  // clip the raw value to being within the useful range
  uint16_t l_capped = min(MAX_USEFUL, max(MIN_USEFUL, l_raw));

  // moving the minimum possible sample down to zero (this will make the maximum downshifted sample=USEFUL_RANGE)
  uint16_t l_downshifted = l_capped - MIN_USEFUL;

  // accounts for inverse-distance. closer obstacles should yield higher values for actuator control
  uint16_t l_compliment = USEFUL_RANGE - l_downshifted;

  // scales every value to range 0-1.
  double l_ratio = (double)l_compliment / (double)USEFUL_RANGE;

  // construct the resulting value
  uint8_t l_result = l_ratio * 255;

  return l_result;

}

#else // if us sensor is not plugged in

void us_init()
{
 // do nothing
}

uint16_t us_read_scaled()
{
 // do nothing
  return 0;
}

uint8_t us_read_useful()
{
 // do nothing
  return 0;
}

#endif
