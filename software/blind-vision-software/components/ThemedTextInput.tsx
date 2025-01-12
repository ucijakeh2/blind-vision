import React from 'react'
import { TextInput } from 'react-native-paper'
import { type Dispatch, type SetStateAction } from 'react'

interface ThemedTextInputProps {
    style?: string
    label: string,
    text: string,
    setText: Dispatch<SetStateAction<string>>
}

const ThemedTextInput: React.FC<ThemedTextInputProps> = ({ style = "", label, text, setText }) => {
    // In-progess: background under label still has the wrong color
    return ( 
        <TextInput 
            className={`mb-6 bg-transparent ${style}`}
            mode="outlined" 
            label={label}
            value={text}
            onChangeText={text => setText(text)}
        />
    )
}

export default ThemedTextInput