import { useRouter } from 'expo-router'
import { View, Text } from 'react-native'
import { Button } from 'react-native-paper'

const CustomLabel: React.FC<{ text: string, includeBackButton?: boolean }> = ({ text, includeBackButton = false }) => {
  const router = useRouter()
  
  return (
    <View className="mx-auto w-11/12 flex flex-col-reverse justify-between items-start h-1/5 pb-5">
        <Text className="text-7xl text-white font-bold mb-0">
            {text}
        </Text>
        { includeBackButton && 
          <Button
            mode="elevated" 
            onPress={() => router.dismiss()} 
          >
            Back
          </Button>
        }
    </View>
  )
}

export default CustomLabel