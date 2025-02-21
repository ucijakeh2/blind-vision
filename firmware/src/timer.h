#ifndef TIMER_H
#define TIMER_H

#include <arduino-timer.h>

using g_us_timer_t = Timer<100, micros>;

g_us_timer_t g_us_timer;

#endif
