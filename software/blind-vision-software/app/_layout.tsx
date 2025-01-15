import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PaperProvider } from "react-native-paper";

export default function RootLayout() {
  return (
    <GestureHandlerRootView>
      <PaperProvider>
        <Stack>
          <Stack.Screen 
            name="index"
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen 
            name="(auth)"
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen 
            name="(tabs)"
            options={{
              headerShown: false
            }}
          />
        </Stack>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}
