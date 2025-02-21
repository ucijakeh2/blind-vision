#include <Wire.h>
#include <QMC5883LCompass.h>

QMC5883LCompass compass;

void co_init() {
  LOG("Initializing QMC5883L...");

  Wire.begin();
  compass.init();

  LOG("QMC5883L detected and initialized!");
}

int co_read() {
  constexpr int X_MAX_VAL = 1730;
  constexpr int X_MIN_VAL = 760;
  constexpr int Y_MAX_VAL = -490;
  constexpr int Y_MIN_VAL = -1420;

  // offset defining north
  constexpr int NORTH_DEGREES = 360 + 100;

  constexpr int X_CENTER = (X_MAX_VAL + X_MIN_VAL) / 2;
  constexpr int Y_CENTER = (Y_MAX_VAL + Y_MIN_VAL) / 2;

  constexpr int X_RANGE = X_MAX_VAL - X_MIN_VAL;
  constexpr int Y_RANGE = Y_MAX_VAL - Y_MIN_VAL;

  compass.read();

  int l_x = compass.getX();
  int l_y = compass.getY();

  int l_x_recentered = l_x - X_CENTER;
  int l_y_recentered = l_y - Y_CENTER;

  double l_x_renormalized = (double)l_x_recentered / (double)X_RANGE;
  double l_y_renormalized = (double)l_y_recentered / (double)Y_RANGE;

  int l_heading = (int)(atan2(l_y_renormalized, l_x_renormalized) * (180.0 / PI));

  l_heading += NORTH_DEGREES;

  l_heading = l_heading % 360;

  return l_heading;
  
}
