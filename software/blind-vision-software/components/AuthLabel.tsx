import { View, Text, Image } from "react-native"
import logo from "@/constants/logo"

interface AuthLabelProps {
    text: string
}

const AuthLabel: React.FC<AuthLabelProps> = ({ text }) => {
  return (
    <View className="mx-auto w-11/12 flex flex-row items-end h-1/5 pb-4">
        <View className="w-full flex flex-row justify-between">
            <Text className="text-5xl text-white font-bold mb-0">{text}</Text>
            <Image source={logo.authLogo}/>
        </View>
    </View>
  )
}

export default AuthLabel