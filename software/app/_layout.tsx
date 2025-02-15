import { configureReanimatedLogger, ReanimatedLogLevel, } from 'react-native-reanimated';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PaperProvider } from "react-native-paper";
import { createContext, useState } from "react";
import { Stack } from "expo-router";

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
});

type ThemeContextType = [boolean, () => void];
export const ThemeContext = createContext<ThemeContextType>([false, () => {}]);

type AuthObjectType = { key: string[], value: string } | null
type AuthContextType = [AuthObjectType, (a: AuthObjectType) => void]
export const AuthContext = createContext<AuthContextType>([null, () => {}]);

export default function RootLayout() {
  const [dark, setDark] = useState<boolean>(false)
  const [auth, setAuth] = useState<AuthObjectType>(null)
  
  const toggleDark = () => { setDark((prev) => !prev) }
  const setAuthData = (a: AuthObjectType) => { setAuth(a) }

  return (
    <GestureHandlerRootView>
      <PaperProvider>
        <ThemeContext.Provider value={[dark, toggleDark]}>
        <AuthContext.Provider value={[auth, setAuthData]}>
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
