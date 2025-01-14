#include "config.h"
#include "va.h"

void va_init()
{
  pinMode(VIBRATOR_PIN, OUTPUT);
  analogWrite(VIBRATOR_PIN, 0); // start motor off not moving
  LOG("VA: initialization completed");
}

void va_drive(uint8_t a_amount)
{
  analogWrite(VIBRATOR_PIN, a_amount);
  LOG(String("VA: drive amount set to ") + String(a_amount));
}
