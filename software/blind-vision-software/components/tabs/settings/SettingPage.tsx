import { SafeAreaView } from "react-native-safe-area-context"
import { Image, View } from "react-native"

import CustomLabel from "./CustomLabel"
import CustomList from "./CustomList"

import LayoutObject from "@/constants/types/LayoutObject"
import styles from "@/constants/styles"

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
  return (
    <SafeAreaView className={styles.tabs.safeAreaViewStyle}> 
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