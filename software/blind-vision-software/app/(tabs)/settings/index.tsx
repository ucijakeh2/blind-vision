import { SafeAreaView } from "react-native-safe-area-context";
import { Image, View } from "react-native";

import CustomLabel from "@/components/tabs/settings/CustomLabel";
import CustomList from "@/components/tabs/settings/CustomList"
import backgrounds from "@/constants/backgrounds";
import utils from "@/constants/utils";

export default function Settings() {
    return (
        <SafeAreaView className={utils.styles.tabs.safeAreaViewStyle}> 
            <Image 
                className={utils.styles.tabs.headerImageStyle} 
                source={backgrounds.settings}
            />
            <CustomLabel text="Settings"/>
            <View className="h-4/5 w-11/12">
                <CustomList layout={utils.layout.settings}/>
            </View> 
        </SafeAreaView>
    )
}