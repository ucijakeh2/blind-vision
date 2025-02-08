import BleManager, { Peripheral } from 'react-native-ble-manager';
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import { Button } from "react-native-paper";
import { Image } from "react-native";
import { SystemBars } from 'react-native-edge-to-edge';

import CustomDeviceCard from "@/components/tabs/home/CustomDeviceCard";
import HomeLabel from "@/components/tabs/home/HomeLabel";

import backgrounds from "@/constants/backgrounds";
import images from "@/constants/images";
import styles from "@/constants/styles";
import ble from "@/constants/ble";

const BLEButton: React.FC<{
    isLoading: boolean,
    trigger: () => void 
}> = ({
    isLoading,
    trigger 
}) => {
    return (
        <Button
            className="w-11/12 mx-auto my-56"
            mode="elevated"
            textColor="white"
            buttonColor="#0059FF"
            rippleColor="white"
            onPress={trigger}
            loading={isLoading}
            disabled={isLoading}
            labelStyle={{ fontSize: 16 }}
        >
            Connect Glasses & Stick
        </Button>
    )
}

export default function Home() {
    const [device, setDevice] = useState<Peripheral | null>(null);
    const [isScanning, setScanning] = useState<boolean>(false);
     
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
            <Image 
                className={styles.tabs.headerImageStyle} 
                source={backgrounds.home}
            />
            {!device && 
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
                />
            }
            <SafeAreaView className={styles.tabs.safeAreaViewStyle}>
                {device &&
                <> 
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
                </>}
            </SafeAreaView>
        </>
    )
}