import { Dispatch, SetStateAction } from 'react'
import { Button } from 'react-native-paper'

interface ThemedButtonProps {
    customNativeWind?: string
    icon?: string
    textColor?: string,
    text: string,
    trigger: () => void
}

const ThemedButton: React.FC<ThemedButtonProps> = ({ 
    customNativeWind = "", 
    icon = "", 
    textColor = "black", 
    text, 
    trigger,
    ...props }) => {

    return ( 
        <Button 
            className={`mb-6 ${customNativeWind}`} 
            mode="elevated" 
            onPress={trigger} 
            icon={icon || ""} 
            textColor={textColor}
            {...props}
        >
            {text}
        </Button>
    )
}

export default ThemedButton