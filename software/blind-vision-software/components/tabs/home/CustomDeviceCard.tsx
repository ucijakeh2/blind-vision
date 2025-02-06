import { LinearGradient } from 'expo-linear-gradient'
import { Link, type LinkProps } from 'expo-router'
import { Button } from 'react-native-paper'
import { View, Image } from 'react-native'
import { useState } from 'react'

import CustomStatusBanner from './CustomStatusBanner'
import CustomSlider from './CustomSlider'

interface CustomDeviceCardProps {
    deviceName: string,
    sliderName: string,
    destination: LinkProps["href"],
    connected: boolean,
    imageSource: object
}

const CustomDeviceCard: React.FC<CustomDeviceCardProps> = ({
    deviceName,
    sliderName,
    destination,
    connected,
    imageSource,
}) => {
  const [value, setValue] = useState(0);

  return (
    <View className='shadow shadow-neutral-400 h-2/5 w-11/12 rounded-3xl mb-6'>
      <LinearGradient
        className='h-full rounded-3xl flex flex-row items-center justify-start p-6'
        colors={['#40A2E3', '#CEE7F8']} 
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <CustomSlider sliderName={sliderName} value={value} setValue={setValue}/>
        <Image className='absolute -right-4 top-1/4 scale-90' source={imageSource}/>
        <View className='h-full flex-1 flex flex-col items-end justify-between ml-6'>
          <CustomStatusBanner connected={connected}/>
          <Link href={destination} withAnchor asChild>
            <Button
              className="w-full"
              mode="outlined"
              textColor="white"
              theme={{colors: { outline: "white" }}}
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