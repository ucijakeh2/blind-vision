import icons from '@/constants/icons'
import { useRouter } from 'expo-router'
import { View, Text } from 'react-native'
import { Button, Icon } from 'react-native-paper'

const CustomLabel: React.FC<{ text: string, includeBackButton?: boolean }> = ({ text, includeBackButton = false }) => {
  const router = useRouter()
  
  return (
    <View className="mx-auto w-11/12 flex flex-col-reverse justify-between items-start h-1/5 pb-5">
        <Text className="text-7xl text-white font-bold mb-0">
            {text}
        </Text>
        { includeBackButton && 
          <Button
            className='border-2 border-white'
            mode="text" 
            icon={() => (
              <Icon
                source={icons.leftArrow}
                color='white'
                size={20}
              />
            )}
            onPress={() => router.dismiss()}
          >{""}
          </Button>
        }
    </View>
  )
}

export default CustomLabel