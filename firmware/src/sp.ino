#include "sp.h"

#define SP_LEVELS 10
#define MIN_PERIOD_uS 500
#define MAX_PERIOD_uS 1000
#define PERIOD_RANGE_uS (MAX_PERIOD_uS - MIN_PERIOD_uS)

bool     s_cutoff    = false;
uint32_t s_period_ms = 0;

void sp_init()
{
  pinMode(SP_PIN, OUTPUT);
  digitalWrite(SP_PIN, LOW);
}

void sp_drive_amount(uint8_t a_amount)
{
  s_cutoff = (a_amount == 0);
  
  constexpr double RATIO = ((double)SP_LEVELS / (double)256);
  constexpr double PERIOD_uS_VS_LEVEL = (double)PERIOD_RANGE_uS / SP_LEVELS;

  int l_level = SP_LEVELS - int(a_amount * RATIO);
  s_period_ms = MIN_PERIOD_uS + l_level * PERIOD_uS_VS_LEVEL;

}

void sp_drive()
{
  if (s_cutoff) return;
  digitalWrite(SP_PIN, HIGH);
  delayMicroseconds(s_period_ms);
  digitalWrite(SP_PIN, LOW);
  delayMicroseconds(s_period_ms);
}
