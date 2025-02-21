#ifndef PREF_H
#define PREF_H

double pref_read_va_slope_factor();
void   pref_write_va_slope_factor(double);

double pref_read_sp_slope_factor();
void   pref_write_sp_slope_factor(double);

bool   pref_read_bl_pairing_mode();
void   pref_write_bl_pairing_mode(bool);

#endif
