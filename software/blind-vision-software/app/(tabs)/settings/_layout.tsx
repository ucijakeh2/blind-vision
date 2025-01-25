import backgrounds from '@/constants/backgrounds'
import { Stack } from 'expo-router'
import { View, Text, Image } from 'react-native'

const SettingsLayout = () => {
  return (
    <Stack>
        <Stack.Screen
            name='index'
            options={{
                title: 'Settings',
                headerShown: false
            }}
        />
        <Stack.Screen
            name='profile'
            options={{
                title: "Profile",
                headerShown: false,
                headerBackground: () => (<Image source={backgrounds.profile}/>)
            }}            
        />
        <Stack.Screen
            name='glasses'
            options={{
                title: "Glasses",
                headerShown: false
            }}
        />
        <Stack.Screen
            name='stick'
            options={{
                title: "Stick",
                headerShown: false
            }}
        />
    </Stack>
  )
}

export default SettingsLayout