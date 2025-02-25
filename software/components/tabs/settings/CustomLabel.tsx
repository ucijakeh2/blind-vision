import { Button, Icon } from 'react-native-paper'
import { View, Text } from 'react-native'
import { useRouter } from 'expo-router'

import icons from '@/constants/icons'

const CustomLabel: React.FC<{ text: string, includeBackButton?: boolean }> = ({ text, includeBackButton = false }) => {
  const router = useRouter()
  
  return (
    <View className={`mx-auto w-11/12 flex flex-col-reverse items-start h-1/4 ${includeBackButton? "justify-around" : "justify-start pb-5"}`}>
        <Text className="text-7xl text-white font-bold mb-0">
            {text}
        </Text>
        { includeBackButton && 
          <Button
            className='border-2'
            mode='outlined'
            icon={() => (
              <Icon
                source={icons.leftArrow}
                color='white'
                size={15}
              />
            )}
            labelStyle={{color: "white"}}
            theme={{ colors: { outline: "white" }}}
            onPress={() => router.dismissTo("/settings")}
          >{"Back"}
          </Button>
        }
    </View>
  )
}

export default CustomLabel