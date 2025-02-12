import BleManager, { Peripheral } from 'react-native-ble-manager';
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { SystemBars } from 'react-native-edge-to-edge';
import { Button } from "react-native-paper";
import { Image } from "react-native";

import CustomDeviceCard from "@/components/tabs/home/CustomDeviceCard";
import HomeLabel from "@/components/tabs/home/HomeLabel";

import backgrounds from "@/constants/backgrounds";
import images from "@/constants/images";
import styles from "@/constants/styles";
import ble from "@/constants/ble";

import { ThemeContext } from '../_layout';

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
    const [device, setDevice] = useState<Peripheral | null>(null);
    const [isScanning, setScanning] = useState<boolean>(false);
    const [dark, _] = useContext(ThemeContext)

    useEffect(() => {
        ble.requestPermissions();
        ble.enableBLE();
        ble.start();
    }, []);

    useEffect(() => {
        // Listen to when ESP32 disconnect
        const onStopDisconnectListener = BleManager.onDisconnectPeripheral(() => { setDevice(null); })
        return () => { onStopDisconnectListener.remove(); }
    }, [])

    return (
        <>
            <SystemBars hidden={{ navigationBar: true }}/>
            <SafeAreaView 
                className={styles.tabs.safeAreaViewStyle}
                style={{backgroundColor: dark ? "#222222" : "white"}}
            >
                {!device ?
                    <BLEButton 
                    trigger={async () => {
                        // Only scan & connect if BLE is enabled
                        // Ask for it otherwise
                        if(await ble.enableBLE()) {
                            setScanning(true)
                            const connectedDevice: any = await ble.scanThenConnect();
                            console.log("Returned connected device: " + connectedDevice);
                            setDevice(connectedDevice);
                            setScanning(false);
                        }
                    }} 
                    isLoading={isScanning}
                    /> :
                    <>
                        <Image 
                            className={`${styles.tabs.headerImageStyle} -my-5`} 
                            source={dark ? backgrounds.darkHome : backgrounds.home}
                        />
                        <HomeLabel firstName="Huy"/>
                        <CustomDeviceCard
                            index={0}
                            deviceName="Glasses"
                            sliderName="Glasses volume"
                            destination="/settings/glasses"
                            connected={device !== null}
                            imageSource={images.glasses}
                            bleId={device.id}
                        />
                        <CustomDeviceCard
                            index={1}
                            deviceName="Stick"
                            sliderName="Blind stick vibration"
                            destination="/settings/stick"
                            connected={device !== null}
                            imageSource={images.blindStick}
                            bleId={device.id}
                        /> 
                    </>
                }
            </SafeAreaView>
        </>
    )
}