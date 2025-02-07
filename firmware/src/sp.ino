#include "sp.h"
#include "timer.h"

#ifdef SP_PIN_0 // check SP_PIN defined

// #define SP_LEVELS 10
// #define PERIOD_RANGE_uS (MAX_PERIOD_uS - MIN_PERIOD_uS)

// #define SP_PERIOD_uS 800
// #define SP_MIN_PERIOD_BETWEEN_PULSES_ms 5
// #define SP_MAX_PERIOD_BETWEEN_PULSES_ms 150
// #define SP_PULSE_PERIOD_RANGE_ms = (SP_MAX_PERIOD_BETWEEN_PULSES_ms - SP_MIN_PERIOD_BETWEEN_PULSES_ms)

// bool     s_cutoff    = false;
// uint32_t s_period_ms = 0;

#define DEFAULT_PERIOD_us 1000

uint32_t s_period;

g_us_timer_t::Task s_pop_task;

bool sp_drive(void*)
{
  static bool s_popped = false;
  s_popped = !s_popped;
  digitalWrite(SP_PIN_0, s_popped);
  digitalWrite(SP_PIN_1, s_popped);
  return true;
}

void sp_init()
{
  // initialize the pop task
  s_pop_task = nullptr;
  // initialize pins
  pinMode(SP_PIN_0, OUTPUT);
  pinMode(SP_PIN_1, OUTPUT);
  digitalWrite(SP_PIN_0, LOW);
  digitalWrite(SP_PIN_1, LOW);
}

void sp_drive_amount(uint8_t a_amount)
{
  if (a_amount == 0) {
    if (s_pop_task)
      g_us_timer.cancel(s_pop_task);
    return;
  }

  s_period = DEFAULT_PERIOD_us;

  // constexpr double SP_PULSE_PERIOD_RANGE_ms1 = (SP_MAX_PERIOD_BETWEEN_PULSES_ms - SP_MIN_PERIOD_BETWEEN_PULSES_ms);

  // constexpr double RATIO = ((double)SP_LEVELS / (double)256);
  // constexpr double PERIOD_ms_VS_LEVEL = SP_PULSE_PERIOD_RANGE_ms1 / SP_LEVELS;

  // int l_cmp_lvl = int(a_amount * RATIO);

  // int l_level = SP_LEVELS - l_cmp_lvl;
  // s_period_ms = SP_MIN_PERIOD_BETWEEN_PULSES_ms + l_level * PERIOD_ms_VS_LEVEL;

  s_pop_task = g_us_timer.every(s_period, sp_drive); // initiate this event

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

#endif
