import { View, Text } from 'react-native'

const ConnectBanner = () => {
  return (
    <View className='flex flex-row items-center gap-1'>
        <Text className='text-connectedGreen'>connected</Text>
        <View className='w-3 h-3 bg-connectedGreen rounded-full' />
    </View>
  )
}

export default ConnectBanner