
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { SystemBars } from "react-native-edge-to-edge";
import { Button } from "react-native-paper";
import { Text, Image } from "react-native";
import { Link } from "expo-router";
import { useEffect } from "react";

import logo from "@/constants/logo";

export default function App() {
  
  useEffect(() => { 
    // Reset storage every reload
    AsyncStorage.clear(); 

    // Create a demo user every reload
    const key = ["demo@gmail.com", "blindvision"].toString();
    const value = JSON.stringify({nickname: "Blind Vision"});
    AsyncStorage.setItem(key, value);

    // Create a quick access user every reload
    const qKey = ["", ""].toString();
    const qValue = JSON.stringify({nickname: "Phil Dunphy"});
    AsyncStorage.setItem(qKey, qValue);
  }, [])

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
        <Link href="/sign-in" asChild>
          <Button
            mode="contained"
            disabled={false}
            labelStyle={{color: "white"}}
            theme={{ colors: { primary: "#2AB2DB" }}}

            accessibilityHint={"navigate to login page"}
          >
              Continue
          </Button>
        </Link>
      </SafeAreaView>
    </>
  );
}