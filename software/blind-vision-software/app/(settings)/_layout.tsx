import { Stack } from 'expo-router'
import { View, Text } from 'react-native'

const SettingsLayout = () => {
  return (
    <Stack>
        <Stack.Screen
            name='profile'
            options={{
                headerShown: false
            }}
        />
        <Stack.Screen
            name='glasses'
            options={{
                headerShown: false
            }}
        />
        <Stack.Screen
            name='stick'
            options={{
                headerShown: false
            }}
        />
    </Stack>
  )
}

export default SettingsLayout