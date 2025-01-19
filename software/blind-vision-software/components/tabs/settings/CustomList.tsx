import { RelativePathString, useRouter } from 'expo-router'
import { Icon, List, Switch } from 'react-native-paper'
import { View } from 'react-native'

import LayoutObject from '@/constants/types/LayoutObject'
import icons from '@/constants/icons'
import CustomBanner from '../home/CustomBanner'

interface CustomListProps {
  layout: Array<LayoutObject>
}

const RightArrow = () => {
  return (
    <View className='my-auto'>
      <Icon source={icons.rightArrow} size={20}/>
    </View>
  )
}

const CustomList: React.FC<CustomListProps> = ({ layout }) => {
  const router = useRouter()

  const chooseRightIcon = ( destination: string | null, status: boolean ) => {
    if (destination) {
      return <RightArrow/>
    } else if (status) {
      return <CustomBanner connected/>
    } else { return <Switch/> }
  }

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
              <Icon source={obj.imageSource} size={25} color="black"/>
            </View>
          )}
          right={() => (chooseRightIcon(obj.destination, obj.showStatus))}
          style={{ borderBottomWidth: 1, borderBottomColor: "#BFBFBF", paddingLeft: 20, paddingVertical: 15 }}
          onPress={() => { if(obj.destination) { router.push(obj.destination as RelativePathString) }}}
        />
      ))}
    </List.Section>
  )
}

export default CustomList