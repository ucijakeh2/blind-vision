import { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { Link, type LinkProps } from 'expo-router'
import { Button } from 'react-native-paper'
import { View, Image } from 'react-native'

import CustomStatusBanner from './CustomStatusBanner'
import CustomSlider from './CustomSlider'
import ble from '@/scripts/ble'
import { ThemeContext } from '@/app/_layout'

const STEP = 10;

interface CustomDeviceCardProps {
    deviceName: string,
    sliderName: string,
    destination: LinkProps["href"],
    connected: boolean,
    setConnection: Dispatch<SetStateAction<boolean>>,
    imageSource: object,
    bleId: string,
    serviceUUID: string
}

const CustomDeviceCard: React.FC<CustomDeviceCardProps> = ({
    deviceName,
    sliderName,
    destination,
    connected,
    setConnection,
    imageSource,
    bleId,
    serviceUUID
}) => {
  const [value, setValue] = useState(0);
  const [dark, _] = useContext(ThemeContext);

  useEffect(() => { ble.write(bleId, serviceUUID, [value / STEP]); }, [value])

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
        colors={[theme(connected, dark).gradientFrom, theme(connected, dark).gradientTo]} 
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        {connected ?
          <CustomSlider sliderName={sliderName} step={STEP} value={value} setValue={setValue} disabled={false}/>:
          <><CustomSlider sliderName={sliderName} step={STEP} value={value} setValue={setValue} disabled={true}/></>
        }
        <Image className='absolute -right-4 top-1/4 scale-90' source={imageSource}/>
        <View className='h-full flex-1 flex flex-col items-end justify-between ml-6'>
          <CustomStatusBanner connected={connected}/>
          <Link href={connected ? destination : "/(tabs)/home"} withAnchor asChild>
            <Button
              className="w-full"
              mode="outlined"
              textColor={theme(connected, dark).buttonColor}
              theme={{colors: { outline: theme(connected, dark).buttonColor }}}
              onPress={async () => { if (!connected) setConnection(await ble.connect(bleId)); }}
              >
                {connected ? `${deviceName} Settings` : `Connect ${deviceName}`}
            </Button>
          </Link>
        </View>
      </LinearGradient>
    </View>
  )
}

export default CustomDeviceCard