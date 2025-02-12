import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PaperProvider } from "react-native-paper";
import { createContext, useState } from "react";
import { Stack } from "expo-router";

type BooleanContextType = [boolean, () => void];
export const ThemeContext = createContext<BooleanContextType>([false, () => {}]);
export const AuthContext = createContext<BooleanContextType>([false, () => {}]);

type StringContextType = [string, (n: string) => void];
export const NicknameContext = createContext<StringContextType>(["", () => {}]);

export default function RootLayout() {
  const [dark, setDark] = useState<boolean>(false)
  const [authorized, setAuthorized] = useState<boolean>(false)
  const [nickname, setNickname] = useState<string>("")
  
  const toggleDark = () => {
    setDark((prev) => !prev)
  }
  
  const toggleAuthorization = () => {
    setAuthorized(true)
  }

  const assignNickname = (n: string) => {
    setNickname(n)
  }

  return (
    <GestureHandlerRootView>
      <PaperProvider>
        <ThemeContext.Provider value={[dark, toggleDark]}>
        <AuthContext.Provider value={[authorized, toggleAuthorization]}>
        <NicknameContext.Provider value={[nickname, assignNickname]}>
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
        </NicknameContext.Provider>
        </AuthContext.Provider>
        </ThemeContext.Provider>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}
