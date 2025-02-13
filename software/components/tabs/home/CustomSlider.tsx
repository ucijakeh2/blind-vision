import { ThemeContext } from '@/app/_layout';
import { Dispatch, SetStateAction, useContext } from 'react';
import { View, Text, AccessibilityInfo } from 'react-native'
import VerticalSlider from 'rn-vertical-slider'; 

interface CustomSliderProps {
    sliderName: string,
    step: number,
    value: number,
    setValue: Dispatch<SetStateAction<number>>,
    disabled: boolean
}

const CustomSlider: React.FC<CustomSliderProps> = ({ sliderName, step, value, setValue, disabled }) => {
  const [dark, _] = useContext(ThemeContext);
  
  const darkTheme = (dark: boolean) => {
    if (dark) {
      return {
        textColor: "#2A2A2A",
        backgroundSlider: "#333333",
        controlledSlider: "#0B705A"
      }
    } else {
      return {
        textColor: "white",
        backgroundSlider: "#EAEAEA",
        controlledSlider: "#40A38E"
      }
    }
  }

  return (
    <View
      accessible={true}
      accessibilityLabel={`${sliderName} slider`}
      accessibilityRole={"adjustable"}
      accessibilityHint={"Double tap to lock"}
      accessibilityValue={{
        now: value,
        min: 0,
        max: 100
      }}
    >
      <VerticalSlider
        value={value}
        onComplete={(value: number) => AccessibilityInfo.announceForAccessibility(`${sliderName} set to ${value}%`)}
        onChange={(value: number) => setValue(value)}
        disabled={disabled}
        height={255}
        width={40}
        step={step}
        min={0}
        max={100}
        borderRadius={5}
        minimumTrackTintColor={darkTheme(dark).controlledSlider}
        maximumTrackTintColor={darkTheme(dark).backgroundSlider}
        showIndicator
        renderIndicator={() => (
          <View
              style={{
              height: 40,
              width: 40,
              justifyContent: 'center',
              alignItems: 'center',
              }}
          >
              <Text style={{ color: darkTheme(dark).textColor }}>{value}</Text>
          </View>
        )}
        containerStyle={{ borderRadius: 50 }}
        sliderStyle={{ borderRadius: 50 }}
      />
    </View>
  )
}

export default CustomSlider