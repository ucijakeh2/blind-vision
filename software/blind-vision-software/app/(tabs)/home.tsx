import { Image, Text, View } from "react-native";
import { useFocusEffect, useNavigation } from "expo-router";
import { useRouter } from 'expo-router';
import { useEffect } from "react";
import CustomDeviceCard from "@/components/tabs/home/CustomDeviceCard";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "@/constants/images";
import AuthLabel from "@/components/auth/AuthLabel";
import HomeLabel from "@/components/tabs/home/HomeLabel";


export default function Home() {

    return (
        <SafeAreaView className="h-full bg-white flex flex-col items-center justify-end">
            <Image className="absolute top-0" source={images.homeBackground}/>
            <HomeLabel firstName="Huy"/>
            <CustomDeviceCard
                deviceName="Glasses"
                destination="/(tabs)/maps"
                connected={true}
                imageSource={images.glasses}
            />
            <CustomDeviceCard
                deviceName="Stick"
                destination="/(tabs)/settings"
                connected={false}
                imageSource={images.blindStick}
            />
        </SafeAreaView>
    )
}