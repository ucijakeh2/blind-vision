#include <Wire.h>
#include <QMC5883LCompass.h>

QMC5883LCompass compass;

void co_init() {
  Serial.println("Initializing QMC5883L...");

  Wire.begin();
  compass.init();

  Serial.println("QMC5883L detected and initialized!");
}

void co_read(int* a_x, int* a_y, int* a_z) {
  compass.read();

  *a_x = compass.getX();
  *a_y = compass.getY();
  *a_z = compass.getZ();

  Serial.print("X: ");
  Serial.print(*a_x);
  Serial.print(" Y: ");
  Serial.print(*a_y);
  Serial.print(" Z: ");
  Serial.println(*a_z);

  delay(250);
  
}
