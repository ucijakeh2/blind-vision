import React from 'react'
import { Button, TextInput } from 'react-native-paper'
import { type Dispatch, type SetStateAction } from 'react'
import utils from '@/constants/utils'

interface ThemedButtonProps {
    customNativeWind?: string
    icon?: string
    textColor?: string,
    text: string,
    trigger: Dispatch<SetStateAction<boolean>>
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
            onPress={() => trigger(true)} 
            icon={icon || ""} 
            textColor={textColor}
            {...props}
        >
            {text}
        </Button>
    )
}

export default ThemedButton