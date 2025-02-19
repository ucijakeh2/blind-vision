#ifndef CO_H
#define CO_H

void co_init();

// this function can only be called once every 250ms, returns an angle (0-360)
int co_read();

#endif
