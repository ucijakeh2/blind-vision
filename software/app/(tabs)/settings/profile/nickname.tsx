import AsyncStorage from '@react-native-async-storage/async-storage';
import { useContext, useState } from 'react';

import ProfilePages from '@/components/tabs/settings/profile/ProfilePages';

import { isValidNickname } from '@/scripts/validityCheck';

import { AuthContext } from '@/app/_layout';

const Nickname = () => {
  const [auth, setAuthObject] = useContext(AuthContext);

  // Snackbar control
  const [snackBar, setSnackBar] = useState({
    visible: false,
    isError: false,
    message: ""
  });

  const setSnackBarVisibility = (visible: boolean) => { setSnackBar({...snackBar, visible: visible}) }

  const setNickname = async (nickname: string) => {
    const isValid = isValidNickname(nickname, setSnackBar)

    if (auth && isValid) {
      setAuthObject({key: auth.key, value: nickname})
      const key = auth.key.toString()
      const value = JSON.stringify({nickname: nickname})

      await AsyncStorage.setItem(key, value)

      console.log({key: key, value: value})
      setSnackBar({
        visible: true,
        isError: false,
        message: `Nickname has beeen changed to: ${nickname}`
      }) 
    }
  }

  return (
    <ProfilePages
      inputLabel="New nickname"
      buttonLabel="Confirm nickname"
      setValue={setNickname}

      message={snackBar.message}
      isError={snackBar.isError}
      visible={snackBar.visible}
      setVisibility={setSnackBarVisibility}
    />
  )
}

export default Nickname