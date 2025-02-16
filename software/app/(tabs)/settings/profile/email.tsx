import AsyncStorage from '@react-native-async-storage/async-storage';
import { useContext, useState } from 'react';

import ProfilePages from '@/components/tabs/settings/profile/ProfilePages';

import { isValidEmail } from '@/scripts/validityCheck';

import { AuthContext } from '@/app/_layout';


const Email = () => {
  const [auth, setAuthObject] = useContext(AuthContext);

  // Snackbar control
  const [snackBar, setSnackBar] = useState({
    visible: false,
    isError: false,
    message: ""
  });

  const setSnackBarVisibility = (visible: boolean) => { setSnackBar({...snackBar, visible: visible}) }

  const setEmail = async (email: string) => {
    const isValid = isValidEmail(email, setSnackBar)

    if (auth && isValid) {
      console.log(email, isValidEmail(email))
      await AsyncStorage.removeItem(auth.key.toString())

      const keys = [email, auth.key[1]]
      setAuthObject({...auth, key: keys})

      const key = keys.toString()
      const value = JSON.stringify({nickname: auth.value})
      await AsyncStorage.setItem(key, value)

      console.log({key: key, value: value})
      setSnackBar({
        visible: true,
        isError: false,
        message: `Email has beeen changed to: ${email}`
      })      
    } 
  }

  return (
    <ProfilePages
      inputLabel="New email"
      buttonLabel="Confirm email"
      setValue={setEmail}

      message={snackBar.message}
      isError={snackBar.isError}
      visible={snackBar.visible}
      setVisibility={setSnackBarVisibility}
    />
  )
}

export default Email