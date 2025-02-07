import { View, Text } from 'react-native'

const CustomStatusBanner: React.FC<{ connected?: boolean }> = ({ connected = false }) => {
  return (
    <View className='flex flex-row items-center gap-1'>
        <Text className={`${connected? "text-connectedGreen" : "text-disconnectedRed"}`}>
            {!connected && "dis"}connected
        </Text>
        <View className={`w-3 h-3 rounded-full ${connected? "bg-connectedGreen" : "bg-disconnectedRed"}`} />
    </View>
  )
}

export default CustomStatusBanner