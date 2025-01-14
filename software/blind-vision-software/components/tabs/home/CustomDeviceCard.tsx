import { View, Text, Image } from 'react-native'
import React, { useState } from 'react'
import { Button } from 'react-native-paper'
import { Link, type LinkProps } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'
import ConnectBanner from './ConnectBanner'
import DisconnectBanner from './DisconnectBanner'
import images from "@/constants/images"
import CustomSlider from './CustomSlider'


interface CustomDeviceCardProps {
    deviceName: string,
    destination: LinkProps["href"],
    connected: boolean,
    imageSource: object
}

const CustomDeviceCard: React.FC<CustomDeviceCardProps> = ({
    deviceName,
    destination,
    connected,
    imageSource,
}) => {
  const [value, setValue] = useState(0);

  return (
    <View className='shadow shadow-neutral-400 mt-8 h-2/5 w-11/12 rounded-3xl'>
      <LinearGradient
        className='h-full rounded-3xl flex flex-row items-center justify-between p-6'
        colors={['#40A2E3', '#CEE7F8']} 
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <CustomSlider value={value} setValue={setValue}/>
        <Image className='absolute right-0 top-1/4' source={imageSource}/>
        <View className='h-full flex-1 flex flex-col items-end justify-between ml-6'>
          {connected ? <ConnectBanner/> : <DisconnectBanner/>}
          <Link href="/(tabs)/settings" asChild>
            <Button
              className="border-white w-full"
              mode="outlined"
              textColor="white"
            >
                {`${deviceName} Settings`}
            </Button>
          </Link>
        </View>
      </LinearGradient>
    </View>
  )
}

export default CustomDeviceCard