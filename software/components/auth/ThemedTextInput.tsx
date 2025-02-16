import { useState, type Dispatch, type SetStateAction } from 'react'
import { TextInput } from 'react-native-paper'

interface ThemedTextInputProps {
    style?: string,
    outlineColor?: string,
    isPassword?: boolean,
    label: string,
    text: string,
    setText: Dispatch<SetStateAction<string>>
}

const ThemedTextInput: React.FC<ThemedTextInputProps> = ({ style = "", outlineColor = "", isPassword = false, label, text, setText }) => {
    const [visible, setVisibility] = useState(isPassword)

    // In-progess: background under label still has the wrong color
    return ( 
        <TextInput 
            className={`mb-6 bg-white ${style}`}
            mode="outlined" 
            label={label}
            value={text}
            onChangeText={text => setText(text)}
            activeOutlineColor={outlineColor}
            textColor='black'
            secureTextEntry={visible}
            right={ 
                isPassword &&
                <TextInput.Icon 
                    icon={visible ? "eye" : "eye-off"}
                    onPress={() => {setVisibility(!visible)}}
                />
            }
        />
    )
}

export default ThemedTextInput