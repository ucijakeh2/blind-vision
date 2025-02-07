import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "react-native";

import CustomDeviceCard from "@/components/tabs/home/CustomDeviceCard";
import HomeLabel from "@/components/tabs/home/HomeLabel";

import backgrounds from "@/constants/backgrounds";
import images from "@/constants/images";
import styles from "@/constants/styles";

const SERVICE_UUID = "12345678-1234-1234-1234-123456789abc";
const CHARACTERISTIC_UUID = "abcd1234-ab12-cd34-ef56-1234567890ab";

export default function Home() {
    return (
        <SafeAreaView className={styles.tabs.safeAreaViewStyle}>
            <Image 
                className={styles.tabs.headerImageStyle} 
                source={backgrounds.home}
            />
            <HomeLabel firstName="Huy"/>
            <CustomDeviceCard
                deviceName="Glasses"
                sliderName="Glasses volume"
                destination="/settings/glasses"
                connected={true}
                imageSource={images.glasses}
            />
            <CustomDeviceCard
                deviceName="Stick"
                sliderName="Blind stick vibration"
                destination="/settings/stick"
                connected={false}
                imageSource={images.blindStick}
            />
        </SafeAreaView>
    )
}