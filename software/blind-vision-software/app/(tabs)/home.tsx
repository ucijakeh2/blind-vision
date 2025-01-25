import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "react-native";

import CustomDeviceCard from "@/components/tabs/home/CustomDeviceCard";
import HomeLabel from "@/components/tabs/home/HomeLabel";

import backgrounds from "@/constants/backgrounds";
import images from "@/constants/images";
import styles from "@/constants/styles";


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
                destination="/settings/glasses"
                connected={true}
                imageSource={images.glasses}
            />
            <CustomDeviceCard
                deviceName="Stick"
                destination="/settings/stick"
                connected={false}
                imageSource={images.blindStick}
            />
        </SafeAreaView>
    )
}