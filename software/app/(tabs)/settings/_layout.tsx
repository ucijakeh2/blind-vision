import { Stack } from 'expo-router'

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
                headerShown: false
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
            key={0}
        />
    </Stack>
  )
}

export default SettingsLayout