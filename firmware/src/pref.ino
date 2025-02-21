#include <Preferences.h>
#include "pref.h"

#define PREFERENCES_NAMESPACE "config"
#define VA_SLOPE_FACTOR_KEY "va_slope_factor"
#define SP_SLOPE_FACTOR_KEY "sp_slope_factor"
#define BL_PAIRING_MODE_KEY "bl_pairing_mode"

double pref_read_va_slope_factor()
{
  Preferences l_pref;
  // open preferences namespace
  l_pref.begin(PREFERENCES_NAMESPACE, true);
  // read the slope factor, if not exist, default to 1.0
  double l_result = l_pref.getDouble(VA_SLOPE_FACTOR_KEY, 1.0);
  // clear resources with this preferences object
  l_pref.end();
  // return the retrieved value
  return l_result;
}

void pref_write_va_slope_factor(double a_va_slope_factor)
{
  Preferences l_pref;
  // open preferences namespace
  l_pref.begin(PREFERENCES_NAMESPACE, false);
  // write the slope factor
  l_pref.putDouble(VA_SLOPE_FACTOR_KEY, a_va_slope_factor);
  // clear resources with this preferences object
  l_pref.end();
}

double pref_read_sp_slope_factor()
{
  Preferences l_pref;
  // open preferences namespace
  l_pref.begin(PREFERENCES_NAMESPACE, true);
  // read the slope factor, if not exist, default to 1.0
  double l_result = l_pref.getDouble(SP_SLOPE_FACTOR_KEY, 1.0);
  // clear resources with this preferences object
  l_pref.end();
  // return the retrieved value
  return l_result;
}

void pref_write_sp_slope_factor(double a_sp_slope_factor)
{
  Preferences l_pref;
  // open preferences namespace
  l_pref.begin(PREFERENCES_NAMESPACE, false);
  // write the slope factor
  l_pref.putDouble(SP_SLOPE_FACTOR_KEY, a_sp_slope_factor);
  // clear resources with this preferences object
  l_pref.end();
}

bool   pref_read_bl_pairing_mode()
{
  Preferences l_pref;
  // open preferences namespace
  l_pref.begin(PREFERENCES_NAMESPACE, true);
  // read the pairing mode bool, if not exist, default to true
  double l_result = l_pref.getBool(BL_PAIRING_MODE_KEY, true);
  // clear resources with this preferences object
  l_pref.end();
  // return the retrieved value
  return l_result;
}

void   pref_write_bl_pairing_mode(bool a_bl_pairing_mode)
{
  Preferences l_pref;
  // open preferences namespace
  l_pref.begin(PREFERENCES_NAMESPACE, false);
  // write the pairing mode bool
  l_pref.putBool(BL_PAIRING_MODE_KEY, a_bl_pairing_mode);
  // clear resources with this preferences object
  l_pref.end();
}
