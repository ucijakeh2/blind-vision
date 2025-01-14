import { Link } from "expo-router";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Settings() {
    return (
        <SafeAreaView>
            <Link href="/(settings)/glasses">
                glasses
            </Link>
        </SafeAreaView>
            
    )
}