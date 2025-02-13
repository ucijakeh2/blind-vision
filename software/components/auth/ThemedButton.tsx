import { Button } from 'react-native-paper'

interface ThemedButtonProps {
    customNativeWind?: string
    icon?: string
    textColor?: string,
    buttonColor?: string,
    text: string,
    trigger: () => void
}

const ThemedButton: React.FC<ThemedButtonProps> = ({ 
    customNativeWind = "", 
    icon = "", 
    textColor = "black",
    buttonColor = "black", 
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
            theme={{colors: { elevation: { level1: buttonColor }}}}
            {...props}
        >
            {text}
        </Button>
    )
}

export default ThemedButton