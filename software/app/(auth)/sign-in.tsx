import { Keyboard, StyleSheet, Text, TouchableWithoutFeedback, View, Button } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { Link, useRouter, Redirect } from "expo-router";
import { useContext, useState } from "react";

import ThemedTextInput from "@/components/auth/ThemedTextInput";
import ThemedButton from "@/components/auth/ThemedButton";
import AuthLabel from "@/components/auth/AuthLabel";

import styles from "@/constants/styles";

import { AuthContext } from "../_layout";

export default function SignIn() {
    const router = useRouter()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [reqLogIn, setLogIn] = useContext(AuthContext);

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
                                />
                                <ThemedButton 
                                    customNativeWind="bg-buttonBlue rounded"
                                    text="Log In"
                                    textColor="white"
                                    trigger={setLogIn}
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