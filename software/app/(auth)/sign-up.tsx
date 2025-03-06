import { Keyboard, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from 'expo-linear-gradient';
import { Link, useRouter } from "expo-router";
import { useState } from "react";

import ThemedTextInput from "@/components/auth/ThemedTextInput";
import ThemedSnackbar from "@/components/auth/ThemedSnackbar";
import ThemedButton from "@/components/auth/ThemedButton";
import AuthLabel from "@/components/auth/AuthLabel";

import { isValidEmail, isValidNickname, isValidPassword, isMatchingPassword } from "@/scripts/validityCheck";
import styles from "@/constants/styles";

export default function SignIn() {
    const router = useRouter()
    const [email, setEmail] = useState("");
    const [nickname, setNickname] = useState("");
    const [password, setPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");
    
    // Snackbar control
    const [snackBar, setSnackBar] = useState({
        visible: false,
        isError: false,
        message: ""
    });
    
    const setSnackBarVisibility = (visible: boolean) => { setSnackBar({...snackBar, visible: visible}) }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styleSheet.container}>
                <LinearGradient 
                    colors={['#81DCD4', "#0D9276"]} 
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styleSheet.container}
                >
                    <AuthLabel text="Sign Up"/>
                    <View className="h-4/5 w-full absolute bottom-0">
                        <View className="h-full w-full bg-white absolute opacity-75 rounded-3xl"/>
                        <View className="w-11/12 mx-auto my-6">
                            <View>
                                <ThemedTextInput 
                                    label="Email"
                                    text={email}
                                    setText={setEmail}
                                    outlineColor="#699F89"
                                />
                                <ThemedTextInput 
                                    label="Nickname"
                                    text={nickname}
                                    setText={setNickname}
                                    outlineColor="#699F89"
                                />
                                <ThemedTextInput 
                                    label="Password"
                                    text={password}
                                    setText={setPassword}
                                    outlineColor="#699F89"
                                    isPassword
                                />
                                <ThemedTextInput 
                                    label="Confirm Password"
                                    text={confirmedPassword}
                                    setText={setConfirmedPassword}
                                    outlineColor="#699F89"
                                    isPassword
                                />
                                <ThemedButton 
                                    customNativeWind="bg-buttonGreen rounded"
                                    text="Sign Up"
                                    textColor="white"
                                    trigger={async () => {
                                        const isValid = isValidEmail(email, setSnackBar) && 
                                                        isValidNickname(nickname, setSnackBar) &&
                                                        isValidPassword(password, setSnackBar) && 
                                                        isMatchingPassword(password, confirmedPassword, setSnackBar)

                                        if (isValid) {
                                            const key = [email, password].toString()
                                            const value = { nickname: nickname }
                                            await AsyncStorage.setItem(key, JSON.stringify(value))
                                            console.log(`Stored: ${key} ${value} `)

                                            setSnackBar({
                                                visible: true,
                                                isError: false,
                                                message: "Account created, you can log in now"
                                            })
                                        }
                                    }}
                                />
                            </View>
                            <View className="border-t">
                                <View className="mt-6 flex flex-row justify-around">
                                    {/* In-progess: this button is not working yet */}
                                    <ThemedButton 
                                        customNativeWind={styles.auth.foreignAuthButton}
                                        text="Google"
                                        icon="google"
                                        trigger={() => {}}
                                        />
                                    {/* In-progess: this button is not working yet */}
                                    <ThemedButton
                                        customNativeWind={styles.auth.foreignAuthButton}
                                        text="Facebook"
                                        icon="facebook"
                                        trigger={() => {}}
                                    />
                                </View>
                                <View accessible>
                                    <Text className="mx-auto">
                                        Already have an account?{" "}
                                        <Link href="/sign-in" style={styleSheet.link} onPress={() => router.dismiss()}>
                                            Log In
                                        </Link>
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <ThemedSnackbar
                            visible={snackBar.visible}
                            isError={snackBar.isError}
                            message={snackBar.message}
                            setVisibility={setSnackBarVisibility}
                        />
                    </View>
                </LinearGradient>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styleSheet = StyleSheet.create({
    container: {
        height: "100%",
    },
    link: {
        color: "#0059FF",
        textDecorationLine: "underline",
        fontStyle: "italic"
    }
})