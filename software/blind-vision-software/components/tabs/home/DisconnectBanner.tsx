import { View, Text } from 'react-native'

const DisconnectBanner = () => {
  return (
    <View className='flex flex-row gap-1 items-center'>
      <Text className='text-disconnectedRed'>disconnected</Text>
      <View className='w-3 h-3 bg-disconnectedRed rounded-full' />
    </View>
  )
}

export default DisconnectBanner