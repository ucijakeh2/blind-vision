import AsyncStorage from '@react-native-async-storage/async-storage'
import { Button } from 'react-native-paper'
import { View, Text } from 'react-native'
import { useRouter } from 'expo-router'
import { useContext } from 'react'

import ThemedButton from '@/components/auth/ThemedButton'

import { AuthContext, ThemeContext } from '@/app/_layout'

const DeleteAccount = () => {
  const router = useRouter()
  const [dark, _1] = useContext(ThemeContext);
  const [auth, setAuth] = useContext(AuthContext);

  
  const darkTheme = (dark: boolean) => {
      if (dark) {
          return {
              buttonColor: "#135C8C"
          }
      } else {
          return {
              buttonColor: "#2AB2DB"
          }
      }
  }

  return (
    <View
      className='h-full flex flex-col items-center justify-center bg-white'
    >
      <Text
        className="font-bold mb-4"
      >
        Are you sure you want to delete your account?
      </Text>
      <View
        className='flex flex-row gap-2 items-baseline justify-center'
      >
        <Button
          mode='text'
          textColor='red'
          theme={{colors: { outline: "red" }}}
          onPress={async () => {
            setAuth(null);
            if(auth) { await AsyncStorage.removeItem(auth.key.toString()); }
            router.navigate("/(auth)/sign-in")
          }}
          >
          Yes
        </Button>
        <ThemedButton
          text='No'
          textColor='white'
          buttonColor={darkTheme(dark).buttonColor}
          trigger={() => { router.navigate("../") }}
        />
      </View>
    </View>
  )
}

export default DeleteAccount