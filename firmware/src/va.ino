#include "config.h"
#include "va.h"
#include "pref.h"

#ifdef VA_PIN_0 // VIBRATOR_PIN defined

double g_va_slope_factor;

void va_init()
{
  // pull slope factor from preferences
  g_va_slope_factor = pref_read_va_slope_factor();
  pinMode(VA_PIN_0, OUTPUT);
  pinMode(VA_PIN_1, OUTPUT);
  analogWrite(VA_PIN_0, 0); // start motor off not moving
  analogWrite(VA_PIN_1, 0); // start motor off not moving
  LOG("VA: initialization completed, slope factor: " + String(g_va_slope_factor));
}

void va_drive(uint8_t a_amount)
{
  constexpr uint8_t MIN_DRIVE_AMOUNT = 100;
  constexpr uint8_t MAX_DRIVE_AMOUNT = 255;
  constexpr uint8_t DRIVE_AMOUNT_RANGE = MAX_DRIVE_AMOUNT - MIN_DRIVE_AMOUNT;

  // a_amount = 255;

  Serial.println(a_amount);

  if (a_amount == 0) // cutoff, just return
  {
    // drive the motors at zero
    analogWrite(VA_PIN_0, 0);
    analogWrite(VA_PIN_1, 0);
    return;
  }

  // scale the drive amount
  uint8_t l_drive_amount =
    (double)a_amount * g_va_slope_factor * (double)DRIVE_AMOUNT_RANGE/(double)255 + (double)MIN_DRIVE_AMOUNT;

  // drive the motors at this PWM value
  analogWrite(VA_PIN_0, l_drive_amount);
  analogWrite(VA_PIN_1, l_drive_amount);

  LOG(String("VA: drive amount set to ") + String(l_drive_amount));
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

void va_slope_factor(double)
{
  // do nothing.
}

#endif
