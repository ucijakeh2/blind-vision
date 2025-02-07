#include "config.h"
#include "va.h"

#ifdef VA_PIN_0 // VIBRATOR_PIN defined

void va_init()
{
  pinMode(VA_PIN_0, OUTPUT);
  pinMode(VA_PIN_1, OUTPUT);
  analogWrite(VA_PIN_0, 0); // start motor off not moving
  analogWrite(VA_PIN_1, 0); // start motor off not moving
  LOG("VA: initialization completed");
}

void va_drive(uint8_t a_amount)
{
  analogWrite(VA_PIN_0, a_amount);
  analogWrite(VA_PIN_1, a_amount);
  LOG(String("VA: drive amount set to ") + String(a_amount));
}

#else // VA_PIN_0 undefined

void va_init()
{
  // do nothing.
}

void va_drive(uint8_t)
{
  // do nothing.
}

#endif
