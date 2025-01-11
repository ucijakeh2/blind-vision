import React from 'react'
import { Button, TextInput } from 'react-native-paper'
import { type Dispatch, type SetStateAction } from 'react'

interface ThemedButtonProps {
    text: string
    trigger: Dispatch<SetStateAction<boolean>>
}

const ThemedButton: React.FC<ThemedButtonProps> = ({ text, trigger }) => {
    return ( 
        <Button mode="contained" onPress={() => trigger(true)}>
            {text}
        </Button>
    )
}

export default ThemedButton