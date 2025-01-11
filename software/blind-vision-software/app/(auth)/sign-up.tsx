import { Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet } from "react-native";
import { Link } from "expo-router";

export default function SignIn() {
    return (
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
                <View className="h-[80%] w-full bg-white absolute bottom-0 rounded-3xl opacity-80">
                    <Link href="/sign-in">Log In</Link>
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