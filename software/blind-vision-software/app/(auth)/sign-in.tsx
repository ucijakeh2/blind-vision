import { Keyboard, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from "react";
import { Link } from "expo-router";

import ThemedTextInput from "@/components/ThemedTextInput";
import ThemedButton from "@/components/ThemedButton";
import AuthLabel from "@/components/AuthLabel";
import utils from "@/constants/utils"

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [reqLogIn, setLogIn] = useState(false);

    useEffect(() => {
        if(reqLogIn) {
            console.log(email, password)
            setLogIn(false)
        }
    }, [reqLogIn])

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <LinearGradient 
                    colors={['#40A2E3', '#81DCD4']} 
                    start={{
                        x: 0,
                        y: 0
                    }}
                    end={{
                        x: 1,
                        y: 0
                    }}
                    style={styles.container}
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
                                    style="bg-buttonBlue rounded"
                                    text="Log In"
                                    textColor="white"
                                    trigger={setLogIn}
                                />
                                <Text className="mb-6 mx-auto">
                                    {/* In-progess: this button is not working yet */}
                                    Forgot Password?{" "}
                                    <Link style={styles.link} href={"/"}>
                                        Reset Password
                                    </Link>
                                </Text>
                            </View>
                            <View className="border-t">
                                <View className="mt-6 flex flex-row justify-around">
                                    {/* In-progess: this button is not working yet */}
                                    <ThemedButton 
                                        style={utils.foreignAuthButtonStyle}
                                        text="Google"
                                        icon="google"
                                        trigger={() => {}}
                                        />
                                    {/* In-progess: this button is not working yet */}
                                    <ThemedButton
                                        style={utils.foreignAuthButtonStyle}
                                        text="Facebook"
                                        icon="facebook"
                                        trigger={() => {}}
                                    />
                                </View>
                                <Text className="mx-auto">
                                    Don't have an account?{" "}
                                    <Link style={styles.link} href={"/(auth)/sign-up"}>
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

const styles = StyleSheet.create({
    container: {
        height: "100%",
        backgroundColor: "black"
    },
    link: {
        color: "#0059FF",
        textDecorationLine: "underline",
        fontStyle: "italic"
    }
})