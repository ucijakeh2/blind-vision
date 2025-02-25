import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { SystemBars } from 'react-native-edge-to-edge';
import { Button } from "react-native-paper";
import { Image } from "react-native";

import CustomDeviceCard from "@/components/tabs/home/CustomDeviceCard";
import ThemedSnackbar from "@/components/auth/ThemedSnackbar";
import HomeLabel from "@/components/tabs/home/HomeLabel";

import backgrounds from "@/constants/backgrounds";
import images from "@/constants/images";
import styles from "@/constants/styles";

import ble, { SERVICE_UUID_GLASSES, SERVICE_UUID_STICK } from "@/scripts/ble";

import { AuthContext, ThemeContext } from '../_layout';
const BLEButton: React.FC<{
    isLoading: boolean,
    trigger: () => void 
}> = ({
    isLoading,
    trigger 
}) => {
    return (
        <Button
            mode="elevated"
            textColor="white"
            buttonColor="#0059FF"
            rippleColor="white"
            onPress={trigger}
            loading={isLoading}
            disabled={isLoading}
            labelStyle={{ fontSize: 16 }}
            icon="bluetooth"   
        >
            Connect Glasses & Stick
        </Button>
    )
}

export default function Home() {
    const [message, setSnackBarMessage] = useState<string>("");
    const [visible, setVisibility] = useState<boolean>(false);

    const [dark, _1] = useContext(ThemeContext);
    const [auth, _2] = useContext(AuthContext);

    const triggerError = (message: string) => {
        setSnackBarMessage(message);
        setVisibility(true);
    }

    useEffect(() => {
        ble.requestPermissions();
        ble.enableBLE();
        ble.start();
    }, []);

    return (
        <>
            <SystemBars hidden={{ navigationBar: true }}/>
            <SafeAreaView 
                className={styles.tabs.safeAreaViewStyle}
                style={{backgroundColor: dark ? "#222222" : "white"}}
            >
                <Image 
                    className={`${styles.tabs.headerImageStyle} -my-5`} 
                    source={dark ? backgrounds.darkHome : backgrounds.home}
                />
                <HomeLabel nickname={auth ? auth.value : "null"}/>
                <CustomDeviceCard
                    deviceName="Glasses"
                    sliderName="Glasses volume"
                    destination="/settings/glasses"
                    imageSource={images.glasses}
                    serviceUUID={SERVICE_UUID_GLASSES}
                    setErrorMessage={triggerError}
                />
                <CustomDeviceCard
                    deviceName="Stick"
                    sliderName="Blind stick vibration"
                    destination="/settings/stick"
                    imageSource={images.blindStick}
                    serviceUUID={SERVICE_UUID_STICK}
                    setErrorMessage={triggerError}
                /> 
            </SafeAreaView>
            <ThemedSnackbar
                message={message}
                isError={true}
                visible={visible}
                setVisibility={setVisibility}
            />
        </>
    )
}