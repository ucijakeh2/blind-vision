
import { SafeAreaView } from "react-native-safe-area-context";
import { SystemBars } from "react-native-edge-to-edge";
import { useContext, useEffect } from "react";
import { Link, useRouter } from "expo-router";
import { Button } from "react-native-paper";
import { Text, Image } from "react-native";

import logo from "@/constants/logo";

import { AuthContext } from "./_layout";

export default function App() {
  const router = useRouter()
  const [authorized, _] = useContext(AuthContext)

  // In-progress: this should be changed to if user logged in
  useEffect(() => {
    if(authorized) {
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
          alignItems: "center",
          backgroundColor: "white",
          gap: 25
        }}
      >
        <Text
          className="text-xl font-bold text-buttonGreen"
        >
          Thanks for choosing Blind Vision!
        </Text>
        <Image
          className="w-[327px] h-[170px]"
          source={logo.animated}
        />
        <Link href="/sign-in">
          <Button
            mode="contained"
            labelStyle={{color: "white"}}
            theme={{ colors: { primary: "#2AB2DB" }}}
          >
              Continue
          </Button>
        </Link>
      </SafeAreaView>
    </>
  );
}