import { StyleSheet, Text, Touchable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from "expo-router";
import { TextInput } from "react-native-paper";
import ThemedTextInput from "@/components/ThemedTextInput";
import { useEffect, useState } from "react";
import ThemedButton from "@/components/ThemedButton";
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
                <View className="h-4/5 w-full absolute bottom-0">
                    <View className="h-full w-full bg-white absolute opacity-50 rounded-3xl"/>
                    <View className="w-11/12 mx-auto my-6 ">
                        <View>
                            <ThemedTextInput 
                                label="Email"
                                text={email}
                                setText={setEmail}
                            />
                            <ThemedTextInput 
                                label="Password"
                                text={password}
                                setText={setPassword}
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
                                <Link className={utils.linkStyle} href={"/"}>
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
                                <Link className={utils.linkStyle} href={"/(auth)/sign-up"}>
                                    Create an account
                                </Link>
                            </Text>
                        </View>
                    </View>
                </View>
            </LinearGradient>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        backgroundColor: "black"
    }
})