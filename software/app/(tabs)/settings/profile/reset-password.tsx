import AsyncStorage from '@react-native-async-storage/async-storage';
import { useContext, useState } from 'react';

import ProfilePages from '@/components/tabs/settings/profile/ProfilePages';

import { isValidPassword } from '@/scripts/validityCheck';

import { AuthContext } from '@/app/_layout';

const ResetPassword = () => {
  const [auth, setAuthObject] = useContext(AuthContext);

  // Snackbar control
    const [snackBar, setSnackBar] = useState({
      visible: false,
      isError: false,
      message: ""
    });
  
  const setSnackBarVisibility = (visible: boolean) => { setSnackBar({...snackBar, visible: visible}) }

  const setPassword = async (password: string) => {
    const isValid = isValidPassword(password, setSnackBar)

    if (auth && isValid) {
      await AsyncStorage.removeItem(auth.key.toString())

      const keys = [auth.key[0], password]
      setAuthObject({...auth, key: keys})

      const key = keys.toString()
      const value = JSON.stringify({nickname: auth.value})
      await AsyncStorage.setItem(key, value)

      console.log({key: key, value: value})
      setSnackBar({
        visible: true,
        isError: false,
        message: "Password has beeen changed"
      }) 
    }
  }

  return (
    <ProfilePages
      inputLabel="New password"
      buttonLabel="Confirm password"
      setValue={setPassword}
      isPassword

      message={snackBar.message}
      isError={snackBar.isError}
      visible={snackBar.visible}
      setVisibility={setSnackBarVisibility}
    />
  )
}

export default ResetPassword