import { SafeAreaView } from "react-native-safe-area-context"
import { Image, View } from "react-native"
import { useContext } from "react"

import CustomLabel from "./CustomLabel"
import CustomList from "./CustomList"

import LayoutObject from "@/constants/types/LayoutObject"
import styles from "@/constants/styles"

import { ThemeContext } from "@/app/_layout"

interface SettingPageProps {
  title: string,
  backgroundSource: object,
  layoutSource: Array<LayoutObject>,
  includeBackButton?: boolean
}

const SettingPage: React.FC<SettingPageProps> = ({ 
  title, 
  backgroundSource, 
  layoutSource, 
  includeBackButton = false 
}) => {
  const [dark, _] = useContext(ThemeContext)

  return (
    <SafeAreaView 
      className={styles.tabs.safeAreaViewStyle}
      style={{backgroundColor: dark ? "#222222" : "white"}}
    > 
        <Image  
            className={styles.tabs.headerImageStyle}
            source={backgroundSource}
        />
        <CustomLabel  
            text={title}
            includeBackButton={includeBackButton}
        />
        <View className="h-4/5 w-11/12">
            <CustomList layout={layoutSource}/>
        </View> 
    </SafeAreaView>
  )
}

export default SettingPage