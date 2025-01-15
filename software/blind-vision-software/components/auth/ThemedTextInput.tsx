import { type Dispatch, type SetStateAction } from 'react'
import { TextInput } from 'react-native-paper'

interface ThemedTextInputProps {
    style?: string,
    outlineColor?: string,
    label: string,
    text: string,
    setText: Dispatch<SetStateAction<string>>
}

const ThemedTextInput: React.FC<ThemedTextInputProps> = ({ style = "", outlineColor = "", label, text, setText }) => {
    // In-progess: background under label still has the wrong color
    return ( 
        <TextInput 
            className={`mb-6 bg-white ${style}`}
            mode="outlined" 
            label={label}
            value={text}
            onChangeText={text => setText(text)}
            activeOutlineColor={outlineColor}
        />
    )
}

export default ThemedTextInput