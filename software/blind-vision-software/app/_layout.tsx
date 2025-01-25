import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PaperProvider } from "react-native-paper";
import { createContext, useState, Dispatch, SetStateAction, useEffect } from "react";

type ContextType = [boolean, () => void];
export const ThemeContext = createContext<ContextType>([false, () => {}]);
export const AuthContext = createContext<ContextType>([false, () => {}]);

export default function RootLayout() {
  const [dark, setDark] = useState(false)
  const [authorized, setAuthorized] = useState(false)
  
  const toggleDark = () => {
    setDark((prev) => !prev)
  }
  
  const toggleAuthorization = () => {
    setAuthorized(true)
    
  }

  return (
    <GestureHandlerRootView>
      <PaperProvider>
        <ThemeContext.Provider value={[dark, toggleDark]}>
          <AuthContext.Provider value={[authorized, toggleAuthorization]}>
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
          </AuthContext.Provider>
        </ThemeContext.Provider>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}
