import { Stack } from 'expo-router'

const GlassesLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name='index'
        options={{
          headerShown: false
        }}
      />
    </Stack>
  )
}

export default GlassesLayout