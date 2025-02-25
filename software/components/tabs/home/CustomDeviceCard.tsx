import { useContext, useEffect, useRef, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { Link, type LinkProps } from 'expo-router'
import BleManager from 'react-native-ble-manager'
import { Button } from 'react-native-paper'
import { View, Image } from 'react-native'

import CustomStatusBanner from './CustomStatusBanner'
import CustomSlider from './CustomSlider'

import { GlassesConnectionContext, StickConnectionContext } from '@/app/(tabs)/_layout'
import { ThemeContext } from '@/app/_layout'

import ble, { SERVICE_UUID_GLASSES } from '@/scripts/ble'

const MAX_VALUE = 255;
const STEP = 10;
const UNIT = MAX_VALUE / STEP;

interface CustomDeviceCardProps {
    deviceName: string,
    sliderName: string,
    destination: LinkProps["href"],
    imageSource: object,
    serviceUUID: string,
    setErrorMessage: (message: string) => void,
}

const CustomDeviceCard: React.FC<CustomDeviceCardProps> = ({
    deviceName,
    sliderName,
    destination,
    imageSource,
    serviceUUID,
    setErrorMessage
}) => {
  const [bleId, setBleId] = useState<string>("");
  const [value, setValue] = useState<number>(-1);
  const [dark, _] = useContext(ThemeContext);
  const [isDeviceConnected, setDeviceConnection] = (serviceUUID === SERVICE_UUID_GLASSES) ? 
                                                   useContext(GlassesConnectionContext) :
                                                   useContext(StickConnectionContext)

  const updatedDeviceId = useRef<string | null>(null);

  const valueToByte = (value: number) => (Math.round((value / STEP) * UNIT));
  const byteToValue = (byte: any) => (Math.round(byte / UNIT) * STEP);

  const handleConnection = async () => {
    const deviceName = (serviceUUID === SERVICE_UUID_GLASSES) ? "Glasses" : "Stick"
    const scannedDeviceId = await ble.scan(serviceUUID)

    if (scannedDeviceId) {
      const bleConnected = await ble.connect(scannedDeviceId);
      
      if (bleConnected) {
        setBleId(scannedDeviceId);
        setDeviceConnection(bleConnected); 

        const configBytes = await ble.read(scannedDeviceId, serviceUUID);
        if (configBytes && configBytes.length === 1) { setValue(byteToValue(configBytes[0])); }
        else { setValue(0); }
      }
      else { setErrorMessage(`${deviceName} found but cannot be connected`) }
    } else { setErrorMessage(`${deviceName} cannot be found`) }
  }

  useEffect(() => { if (value >= 0) ble.write(bleId, serviceUUID, [valueToByte(value)]); }, [value])
  useEffect(() => { updatedDeviceId.current = bleId }, [bleId])

  useEffect(() => {
    // Listen to when ESP32 disconnect
    const onStopDisconnectListener = BleManager.onDisconnectPeripheral((peripheral: any) => { 
        const deviceId = updatedDeviceId.current;

        if (deviceId && deviceId === peripheral.peripheral) {
            const deviceName = (serviceUUID === SERVICE_UUID_GLASSES) ? "Glasses" : "Stick"
            console.log(`Blind Vision ${deviceName} disconnected`);
            setErrorMessage(`Blind Vision ${deviceName} disconnected`);
            setDeviceConnection(false);
          }
        }
    )

    return () => { onStopDisconnectListener.remove(); }
  }, [])

  const theme = (connected: boolean, dark: boolean) => {
    if (!connected) {
      if (dark) {
        return {
          gradientFrom: "#444444",
          gradientTo: "#AAAAAA",
          buttonColor: "#2D2D2D"
        }
      }

      return {
        gradientFrom: "#777777",
        gradientTo: "#DDDDDD",
        buttonColor: "#2D2D2D"
      }
    }

    if (dark) {
      return {
        gradientFrom: "#173A51",
        gradientTo: "#2473A8",
        buttonColor: "#2D2D2D"
      }
    } 

    return {
      gradientFrom: "#40A2E3",
      gradientTo: "#CEE7F8",
      buttonColor: "white"
    }
  }

  return (
    <View className='shadow shadow-neutral-400 h-2/5 w-11/12 rounded-3xl'>
      <LinearGradient
        className='h-full rounded-3xl flex flex-row items-center justify-start p-6'
        colors={[theme(isDeviceConnected, dark).gradientFrom, theme(isDeviceConnected, dark).gradientTo]} 
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        {isDeviceConnected ?
          <CustomSlider sliderName={sliderName} step={STEP} value={value} setValue={setValue} disabled={false}/>:
          <><CustomSlider sliderName={sliderName} step={STEP} value={0} setValue={setValue} disabled={true}/></>
        }
        <Image className='absolute -right-4 top-1/4 scale-90' source={imageSource}/>
        <View className='h-full flex-1 flex flex-col items-end justify-between ml-6'>
          <CustomStatusBanner connected={isDeviceConnected}/>
          <Link href={isDeviceConnected ? destination : "/(tabs)/home"} withAnchor asChild>
            <Button
              className="w-full"
              mode="outlined"
              textColor={theme(isDeviceConnected, dark).buttonColor}
              theme={{colors: { outline: theme(isDeviceConnected, dark).buttonColor }}}
              onPress={ !isDeviceConnected ? handleConnection : () => {} }
              >
                {isDeviceConnected ? `${deviceName} Settings` : `Connect ${deviceName}`}
            </Button>
          </Link>
        </View>
      </LinearGradient>
    </View>
  )
}

export default CustomDeviceCard