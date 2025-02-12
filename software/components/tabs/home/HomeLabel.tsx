import { View, Text } from 'react-native'

const HomeLabel: React.FC<{ nickname: string }> = ({ nickname }) => {
  return (
    <View className="w-11/12 flex flex-row items-end">
        <Text className="text-5xl text-white font-bold mb-0">
            Hi, {nickname}! 👋
        </Text>
    </View>
  )
}

export default HomeLabel