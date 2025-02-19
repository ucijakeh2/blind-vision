#include <Preferences.h>
#include "pref.h"

#define PREFERENCES_NAMESPACE "config"
#define VA_SLOPE_FACTOR_KEY "va_slope_factor"
#define SP_SLOPE_FACTOR_KEY "sp_slope_factor"

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
