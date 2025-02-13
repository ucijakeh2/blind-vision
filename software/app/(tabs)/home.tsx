import React, { useContext, useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { SystemBars } from 'react-native-edge-to-edge';
import BleManager, { Peripheral } from 'react-native-ble-manager';
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
import { GlassesConnectionContext, StickConnectionContext } from "./_layout";

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
    const [glasses, setGlasses] = useState<Peripheral | null>(null);
    const [stick, setStick] = useState<Peripheral | null>(null);
    const [message, setSnackBarMessage] = useState<string>("");
    const [isScanning, setScanning] = useState<boolean>(false);
    const [visible, setVisibility] = useState<boolean>(false);

    const [isGlassesConnected, setGlassesConnection] = useContext(GlassesConnectionContext);
    const [isStickConnected, setStickConnection] = useContext(StickConnectionContext);
    const [dark, _1] = useContext(ThemeContext);
    const [auth, _2] = useContext(AuthContext);

    const updatedGlasses = useRef<Peripheral | null>(null);
    const updatedStick = useRef<Peripheral | null>(null);


    useEffect(() => {
        ble.requestPermissions();
        ble.enableBLE();
        ble.start();
    }, []);

    useEffect(() => { updatedGlasses.current = glasses }, [glasses])
    useEffect(() => { updatedStick.current = stick }, [stick])

    useEffect(() => {
        // Listen to when ESP32 disconnect
        const onStopDisconnectListener = BleManager.onDisconnectPeripheral((peripheral: any) => { 
            const glasses = updatedGlasses.current;
            const stick = updatedStick.current;

            if (glasses) {
                if (glasses.id === peripheral.peripheral) {
                    console.log("Blind Vision Glasses disconnected");
                    setGlassesConnection(false); return;
                }
            }

            if (stick) {
                console.log(stick.id, peripheral.peripheral)
                if (stick.id === peripheral.peripheral) {
                    console.log("Blind Vision Stick disconnected");
                    setStickConnection(false); return;
                }
            }
        })

        return () => { onStopDisconnectListener.remove(); }
    }, [])

    return (
        <>
            <SystemBars hidden={{ navigationBar: true }}/>
            <SafeAreaView 
                className={styles.tabs.safeAreaViewStyle}
                style={{backgroundColor: dark ? "#222222" : "white"}}
            >
                {!(glasses || stick) ?
                    <>
                        <ThemedSnackbar
                            message={message}
                            isError={true}
                            visible={visible}
                            setVisibility={setVisibility}
                        />
                        <BLEButton 
                            trigger={async () => {
                                // Only scan & connect if BLE is enabled
                                // Ask for it otherwise
                                if(await ble.enableBLE()) {
                                    setScanning(true)
                                    const connectedDevices: Peripheral[] | null = await ble.scan();
                                    console.log("Returned connected device: ", connectedDevices);

                                    if (!connectedDevices) {
                                        setVisibility(true);
                                        setSnackBarMessage("Cannot find devices.");
                                    }

                                    const filteredGlasses = connectedDevices?.filter((value) => value.name?.includes("Glasses"))[0]
                                    const filteredStick = connectedDevices?.filter((value) => value.name?.includes("Stick"))[0]
                                    console.log(filteredGlasses, filteredStick)
                                    
                                    if (filteredGlasses) setGlasses(filteredGlasses);
                                    if (filteredStick) setStick(filteredStick);

                                    setScanning(false);
                                }
                            }} 
                            isLoading={isScanning}
                        />
                    </> :
                    <>
                        <Image 
                            className={`${styles.tabs.headerImageStyle} -my-5`} 
                            source={dark ? backgrounds.darkHome : backgrounds.home}
                        />
                        <HomeLabel nickname={auth ? auth.value : "null"}/>
                        <CustomDeviceCard
                            deviceName="Glasses"
                            sliderName="Glasses volume"
                            destination="/settings/glasses"
                            connected={isGlassesConnected}
                            setConnection={setGlassesConnection}
                            imageSource={images.glasses}
                            bleId={glasses ? glasses.id : ""}
                            serviceUUID={SERVICE_UUID_GLASSES}
                        />
                        <CustomDeviceCard
                            deviceName="Stick"
                            sliderName="Blind stick vibration"
                            destination="/settings/stick"
                            connected={isStickConnected}
                            setConnection={setStickConnection}
                            imageSource={images.blindStick}
                            bleId={stick ? stick.id : ""}
                            serviceUUID={SERVICE_UUID_STICK}
                        /> 
                    </>
                }
            </SafeAreaView>
        </>
    )
}