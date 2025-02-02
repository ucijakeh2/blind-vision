#include "sp.h"

#ifdef SP_PIN // check SP_PIN defined

#define SP_LEVELS 10
#define PERIOD_RANGE_uS (MAX_PERIOD_uS - MIN_PERIOD_uS)

#define SP_PERIOD_uS 800
#define SP_MIN_PERIOD_BETWEEN_PULSES_ms 5
#define SP_MAX_PERIOD_BETWEEN_PULSES_ms 150
#define SP_PULSE_PERIOD_RANGE_ms = (SP_MAX_PERIOD_BETWEEN_PULSES_ms - SP_MIN_PERIOD_BETWEEN_PULSES_ms)

bool     s_cutoff    = false;
uint32_t s_period_ms = 0;

void sp_init()
{
  pinMode(SP_PIN, OUTPUT);
  digitalWrite(SP_PIN, LOW);
}

void sp_drive_amount(uint8_t a_amount)
{
  s_cutoff = a_amount == 0;

  constexpr double SP_PULSE_PERIOD_RANGE_ms1 = (SP_MAX_PERIOD_BETWEEN_PULSES_ms - SP_MIN_PERIOD_BETWEEN_PULSES_ms);

  constexpr double RATIO = ((double)SP_LEVELS / (double)256);
  constexpr double PERIOD_ms_VS_LEVEL = SP_PULSE_PERIOD_RANGE_ms1 / SP_LEVELS;

  int l_cmp_lvl = int(a_amount * RATIO);

  int l_level = SP_LEVELS - l_cmp_lvl;
  s_period_ms = SP_MIN_PERIOD_BETWEEN_PULSES_ms + l_level * PERIOD_ms_VS_LEVEL;

}

void sp_drive()
{
  if (s_cutoff) return;
  
  static uint32_t s_it = 0;
  static bool     s_pulse_en = false;

  Serial.println(s_pulse_en);

  if (s_it++ > s_period_ms) {s_pulse_en = !s_pulse_en; s_it = 0;}

  if (s_pulse_en)
  {
    digitalWrite(SP_PIN, HIGH);
    delayMicroseconds(SP_PERIOD_uS);
    digitalWrite(SP_PIN, LOW);
    delayMicroseconds(SP_PERIOD_uS);
  }
  else
  {
    delayMicroseconds(SP_PERIOD_uS);
    delayMicroseconds(SP_PERIOD_uS);
    delayMicroseconds(SP_PERIOD_uS);
  }
  
}

#else // SP_PIN undefined

void sp_init()
{
  // do nothing.
}

void sp_drive_amount(uint8_t)
{
  // do nothing.
}

void sp_drive()
{
  // do nothing.
}

#endif
