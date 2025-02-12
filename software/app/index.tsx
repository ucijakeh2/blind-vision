
import { SafeAreaView } from "react-native-safe-area-context";
import { SystemBars } from "react-native-edge-to-edge";
import { useContext, useEffect } from "react";
import { Link, useRouter } from "expo-router";
import { Text } from "react-native";

import { AuthContext } from "./_layout";

export default function App() {
  const router = useRouter()
  const [authorized, _] = useContext(AuthContext)

  // In-progress: this should be changed to if user logged in
  useEffect(() => {
    if(authorized) {
      console.log("if");
      router.dismiss();
      router.replace("/(tabs)/home")
    }
  }, [authorized])

  return (
    <>
      <SystemBars hidden={{ navigationBar: true }}/>
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Text className="text-red-500 text-2xl font-bold">Edit app/index.tsx to edit this screen.</Text>
        <Link href="/sign-in">Go to auth</Link>
      </SafeAreaView>
    </>
  );
}