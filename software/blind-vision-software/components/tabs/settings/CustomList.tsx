import { RelativePathString, useRouter } from 'expo-router'
import { Icon, List, Switch } from 'react-native-paper'
import { View, Text } from 'react-native'
import { useState } from 'react'

import LayoutObject from '@/constants/types/LayoutObject'
import icons from '@/constants/icons'

import CustomStatusBanner from '../home/CustomStatusBanner'

interface CustomListProps {
  layout: Array<LayoutObject>
}

const myTitleStyle: any = { color: "black", fontSize: 20, fontWeight: 500 }

const chooseRightIcon = ( 
  destination: string | undefined, 
  status: boolean | undefined,
) => {
  if (destination !== undefined) {
    return <RightArrow/>
  } else if (status !== undefined) {
    return <CustomStatusBanner connected={status}/>
  } else { return <Switch/> }
}

const RightArrow = () => {
  return (
    <View className='my-auto'>
      <Icon source={icons.rightArrow} size={20}/>
    </View>
  )
}

const ListItem: React.FC<{ obj: LayoutObject }> = ({ obj }) => {
  const router = useRouter()

  return (
    <List.Item 
      title={obj.title}
      titleStyle={myTitleStyle}
      left={() => (
        <View className='my-auto'>
          <Icon source={obj.imageSource} size={25} color="black"/>
        </View>
      )}
      right={() => (chooseRightIcon(obj.destination, obj.status))}
      style={{ borderBottomWidth: 1, borderBottomColor: "#BFBFBF", paddingLeft: 20, paddingVertical: 15 }}
      onPress={() => { if(obj.destination) { router.push(obj.destination as RelativePathString) }}}
    />
  )
}

const ListAccordion: React.FC<{ obj: LayoutObject }> = ({ obj }) => {
  const [choice, setChoice] = useState(0)
  const [isExpanded, setExpansion] = useState(false)

  return (
    <List.Accordion
      title={obj.title}
      titleStyle={myTitleStyle}
      left={props => <List.Icon {...props} icon={obj.imageSource} color='black'/>}
      right={() => (
        <View className='flex flex-row items-center'>
          <Text className='mr-1 text-gray-300'>{obj.dropdown[choice]}</Text>
          <Icon
            source={isExpanded ? 'chevron-up' : 'chevron-down'}
            size={24}
          />
        </View>
      )}
      style={{ backgroundColor: "white" }}
      onPress={() => setExpansion(!isExpanded)}
      >
      {obj.dropdown.map((item, index) => 
        <List.Item 
          key={index} 
          title={item} 
          titleStyle={{ color: "black" }}
          right={() => <>{(choice === index) && <Icon source="check" color='black' size={20}/>}</>}
          onPress={() => setChoice(index)}
          style={{ width: "80%", marginHorizontal: "auto" }}
        />
      )}
    </List.Accordion>
  )
}

const CustomList: React.FC<CustomListProps> = ({ layout }) => {
  // In-progess: Switch is not working
  return (
    <List.Section>
      {layout.map((obj, index) => {
        if (obj.dropdown !== undefined) { return <ListAccordion key={index} obj={obj}/> } 
        else { return <ListItem key={index} obj={obj}/>}
      })}
    </List.Section>
  )
}

export default CustomList