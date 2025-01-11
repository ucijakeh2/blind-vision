import { View, Text } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-paper'
import { type Dispatch, type SetStateAction } from 'react'

interface ThemedTextInputProps {
    label: string,
    text: string,
    setText: Dispatch<SetStateAction<string>>
}

const ThemedTextInput: React.FC<ThemedTextInputProps> = ({ label, text, setText}) => {
    return ( 
        <TextInput 
            mode="outlined"
            label={label}
            value={text}
            onChangeText={text => setText(text)}
        />
    )
}

export default ThemedTextInput