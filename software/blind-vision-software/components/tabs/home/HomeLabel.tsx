import { View, Text } from 'react-native'

const HomeLabel: React.FC<{ firstName: string }> = ({ firstName }) => {
  return (
    <View className="mx-auto w-11/12 flex flex-row items-end h-1/5">
        <Text className="text-5xl text-white font-bold mb-0">
            Hi, {firstName}! 👋
        </Text>
    </View>
  )
}

export default HomeLabel