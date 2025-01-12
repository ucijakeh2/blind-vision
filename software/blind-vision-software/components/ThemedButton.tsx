import React from 'react'
import { Button, TextInput } from 'react-native-paper'
import { type Dispatch, type SetStateAction } from 'react'
import utils from '@/constants/utils'

interface ThemedButtonProps {
    style?: string
    icon?: string
    textColor?: string,
    text: string,
    trigger: Dispatch<SetStateAction<boolean>>
}

const ThemedButton: React.FC<ThemedButtonProps> = ({ style = "", icon = "", text, textColor = "black", trigger }) => {
    return ( 
        <Button 
            className={`mb-6 ${style}`} 
            mode="elevated" 
            onPress={() => trigger(true)} 
            icon={icon || ""} 
            textColor={textColor}
        >
            {text}
        </Button>
    )
}

export default ThemedButton