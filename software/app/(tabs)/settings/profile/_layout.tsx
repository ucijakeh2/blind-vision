import { Stack } from "expo-router"
import { useContext } from "react"

import { ThemeContext } from "@/app/_layout"

const ProfileLayout = () => {
    const [dark, _] = useContext(ThemeContext);

    const darkTheme = (dark: boolean) => {
        if (dark) {
            return {
                headerBackroundColor: "#135C8C"
            }
        } else {
            return {
                headerBackroundColor: "#2AB2DB"
            }
        }
    }

    return (
        <Stack
            screenOptions={{
                headerStyle: { backgroundColor: darkTheme(dark).headerBackroundColor },
                headerTitleAlign: "center",
                headerTintColor: "white"
            }}
        >
            <Stack.Screen
                name="index"
                options={{
                    title: "Profile",
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="nickname"
                options={{
                    title: "Nickname",
                    headerShown: true
                }}
            />
            <Stack.Screen
                name="email"
                options={{
                    title: "Email",
                    headerShown: true
                }}
            />
            <Stack.Screen
                name="reset-password"
                options={{
                    title: "Reset Password",
                    headerShown: true,
                }}
            />
            <Stack.Screen
                name="delete-account"
                options={{
                    title: "Delete Account",
                    headerShown: true,
                    presentation: "modal"
                }}
            />
        </Stack>
    )
}

export default ProfileLayout