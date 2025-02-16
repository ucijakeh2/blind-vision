import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useContext, useState } from 'react';
import { View } from 'react-native';

import ThemedTextInput from '@/components/auth/ThemedTextInput';
import ThemedSnackbar from '@/components/auth/ThemedSnackbar';
import ThemedButton from '@/components/auth/ThemedButton';

import { ThemeContext } from '@/app/_layout';

const ProfilePages: React.FC<{
  inputLabel: string,
  buttonLabel: string,
  setValue: (input: string) => void,
  isPassword?: boolean,

  message?: string,
  isError?: boolean,
  visible?: boolean,
  setVisibility?: (visible: boolean) => void
}> = ({
  inputLabel,
  buttonLabel,
  setValue,
  isPassword = false,

  message = "",
  isError = false,
  visible = false,
  setVisibility = () => {}
}) => {
  const [dark, _] = useContext(ThemeContext);
  const [input, setInput] = useState<string>("");

  const darkTheme = (dark: boolean) => {
    if (dark) {
      return {
        outlineColor: "#135C8C",
        buttonColor: "#135C8C"
      }
    } else {
      return {
        outlineColor: "#2AB2DB",
        buttonColor: "#2AB2DB"
      }
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View
        className='h-full bg-white flex flex-col justify-center items-center'
      >
        <ThemedTextInput
          style='w-11/12'
          outlineColor={darkTheme(dark).outlineColor}
          label={inputLabel}
          text={input}
          setText={setInput}
          isPassword={isPassword}
        />
        <ThemedButton
          customNativeWind='rounded w-11/12'
          text={buttonLabel}
          textColor='white'
          buttonColor={darkTheme(dark).buttonColor}
          trigger={() => {setValue(input)}}
        />
        <ThemedSnackbar
          message={message}
          isError={isError}
          visible={visible}
          setVisibility={setVisibility}
        />
      </View>
    </TouchableWithoutFeedback>
  )
}

export default ProfilePages