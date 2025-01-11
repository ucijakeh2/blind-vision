import { StyleSheet, Text, Touchable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from "expo-router";
import { TextInput } from "react-native-paper";
import ThemedTextInput from "@/components/ThemedTextInput";
import { useEffect, useState } from "react";
import ThemedButton from "@/components/ThemedButton";

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
                <View className="h-[80%] w-full bg-white absolute bottom-0 rounded-3xl opacity-80">
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
                        text="Log In"
                        trigger={setLogIn}
                    />
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