import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "react-native";

import CustomDeviceCard from "@/components/tabs/home/CustomDeviceCard";
import HomeLabel from "@/components/tabs/home/HomeLabel";

import backgrounds from "@/constants/backgrounds";
import images from "@/constants/images";
import utils from "@/constants/utils";


export default function Home() {

    return (
        <SafeAreaView className={utils.styles.tabs.safeAreaViewStyle}>
            <Image 
                className={utils.styles.tabs.headerImageStyle} 
                source={backgrounds.home}
            />
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