// SENSOR DATASHEET: https://cdn.shopify.com/s/files/1/0550/8091/0899/files/11832.pdf?v=1726578772

#ifndef US_H
#define US_H

/// initializes the ultrasonic sensor
void     us_init();

/// returns a value scaled to sensor resolution (9 bits of precision, 512)
uint16_t us_read_scaled();

/// returns a value which can be natively used to drive actuators (0-255, with 0 corresponding to no obstacle)
uint8_t  us_read_useful();

#endif
