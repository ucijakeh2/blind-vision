import { RelativePathString, useRouter } from 'expo-router'
import { Icon, List, Switch } from 'react-native-paper'
import { View } from 'react-native'

import icons from '@/constants/icons'

interface LayoutObject {
  title: string,
  imageSource: object,
  destination: string | null
}

interface CustomListProps {
  layout: Array<LayoutObject>
}

const CustomList: React.FC<CustomListProps> = ({ layout }) => {
  const router = useRouter()
  // In-progess: Switch is not working
  return (
    <List.Section>
      {layout.map((obj, index) => (
        <List.Item 
          key={index}
          title={obj.title}
          titleStyle={{ color: "black", fontSize: 20, fontWeight: 500 }}
          left={() => (
            <View className='my-auto'>
              <Icon source={obj.imageSource} size={25} color="grey" />
            </View>
          )}
          right={() => (
            <> 
              { obj.destination ?
                <View className='my-auto'>
                  <Icon source={icons.rightArrow} size={20}/>
                </View>:
                <Switch />
              } 
            </>
          )}
          style={{ borderBottomWidth: 1, borderBottomColor: "#BFBFBF", paddingLeft: 20, paddingVertical: 15 }}
          onPress={() => { if(obj.destination) { router.push(obj.destination as RelativePathString) }}}
        />
      ))}
    </List.Section>
  )
}

export default CustomList