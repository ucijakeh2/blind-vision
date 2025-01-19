import { Stack } from "expo-router"

const StickLayout = () => {
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

export default StickLayout