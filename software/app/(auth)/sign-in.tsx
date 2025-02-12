import { Keyboard, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from 'expo-linear-gradient';
import { useContext, useState } from "react";
import { Link } from "expo-router";

import ThemedTextInput from "@/components/auth/ThemedTextInput";
import ThemedSnackbar from "@/components/auth/ThemedSnackbar";
import ThemedButton from "@/components/auth/ThemedButton";
import AuthLabel from "@/components/auth/AuthLabel";

import styles from "@/constants/styles";

import { AuthContext, NicknameContext } from "../_layout";

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [snackBarMessage, setSnackBarMessage] = useState("");
    const [snackBarVisibility, setSnackBarVisibility] = useState(false);

    const [_1, setLogIn] = useContext(AuthContext);
    const [_2, setNickname] = useContext(NicknameContext);

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styleSheet.container}>
                <LinearGradient 
                    colors={['#40A2E3', '#81DCD4']} 
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styleSheet.container}
                >
                    <AuthLabel text="Sign In"/>
                    <View className="h-4/5 w-full absolute bottom-0">
                        <View className="h-full w-full bg-white absolute opacity-75 rounded-3xl"/>
                        <View className="w-11/12 mx-auto my-6 ">
                            <View>
                                <ThemedTextInput 
                                    label="Email"
                                    text={email}
                                    setText={setEmail}
                                    outlineColor="#1D8AFE"
                                />
                                <ThemedTextInput 
                                    label="Password"
                                    text={password}
                                    setText={setPassword}
                                    outlineColor="#1D8AFE"
                                    isPassword
                                />
                                <ThemedButton 
                                    customNativeWind="bg-buttonBlue rounded"
                                    text="Log In"
                                    textColor="white"
                                    trigger={ async () => {
                                        const key = [email, password].toString()
                                        const stringValue = await AsyncStorage.getItem(key)
                                        const value = stringValue ? JSON.parse(stringValue) : null
                                        console.log(`Value: ${value}`)

                                        if (value) { setLogIn(); setNickname(value.nickname); } 
                                        else { setSnackBarVisibility(true); setSnackBarMessage("Wrong email or password"); }
                                    }}
                                />
                                <Text className="mb-6 mx-auto">
                                    {/* In-progess: this button is not working yet */}
                                    Forgot Password?{" "}
                                    <Link style={styleSheet.link} href={"/"}>
                                        Reset Password
                                    </Link>
                                </Text>
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
                                <Text className="mx-auto">
                                    Don't have an account?{" "}
                                    <Link style={styleSheet.link} href={"/(auth)/sign-up"}>
                                        Create an account
                                    </Link>
                                </Text>
                            </View>
                        </View>
                        <ThemedSnackbar
                            visible={snackBarVisibility}
                            isError={true}
                            message={snackBarMessage}
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
        height: "100%"
    },
    link: {
        color: "#0059FF",
        textDecorationLine: "underline",
        fontStyle: "italic"
    }
})