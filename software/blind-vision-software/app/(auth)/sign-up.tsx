import { Image, Keyboard, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from "react";
import { Link, useRouter } from "expo-router";

import ThemedTextInput from "@/components/auth/ThemedTextInput";
import ThemedButton from "@/components/auth/ThemedButton";
import AuthLabel from "@/components/auth/AuthLabel";
import utils from "@/constants/utils"

export default function SignIn() {
    const router = useRouter()
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");
    const [reqSignUp, setSignUp] = useState(false);

    useEffect(() => {
        if(reqSignUp) {
            console.log(email, password)
            setSignUp(false)
        }
    }, [reqSignUp])

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <LinearGradient 
                    colors={['#81DCD4', "#0D9276"]} 
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
                                    label="First Name"
                                    text={firstName}
                                    setText={setFirstName}
                                    outlineColor="#699F89"
                                />
                                <ThemedTextInput 
                                    label="Password"
                                    text={password}
                                    setText={setPassword}
                                    outlineColor="#699F89"
                                />
                                <ThemedTextInput 
                                    label="Confirm Password"
                                    text={confirmedPassword}
                                    setText={setConfirmedPassword}
                                    outlineColor="#699F89"
                                />
                                <ThemedButton 
                                    customNativeWind="bg-buttonGreen rounded"
                                    text="Sign Up"
                                    textColor="white"
                                    trigger={setSignUp}
                                />
                            </View>
                            <View className="border-t">
                                <View className="mt-6 flex flex-row justify-around">
                                    {/* In-progess: this button is not working yet */}
                                    <ThemedButton 
                                        customNativeWind={utils.styles.auth.foreignAuthButton}
                                        text="Google"
                                        icon="google"
                                        trigger={() => {}}
                                        />
                                    {/* In-progess: this button is not working yet */}
                                    <ThemedButton
                                        customNativeWind={utils.styles.auth.foreignAuthButton}
                                        text="Facebook"
                                        icon="facebook"
                                        trigger={() => {}}
                                    />
                                </View>
                                <Text className="mx-auto">
                                    Already have an account?{" "}
                                    <Link href="/sign-in" style={styles.link} onPress={() => router.dismiss()}>
                                        Log In
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
        height: "100%"
    },
    link: {
        color: "#0059FF",
        textDecorationLine: "underline",
        fontStyle: "italic"
    }
})