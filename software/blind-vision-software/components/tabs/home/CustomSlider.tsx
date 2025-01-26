import { Dispatch, SetStateAction, useRef } from 'react';
import { View, Text, AccessibilityInfo, findNodeHandle, Alert } from 'react-native'
import VerticalSlider from 'rn-vertical-slider'; 

interface CustomSliderProps {
    sliderName: string,
    value: number,
    setValue: Dispatch<SetStateAction<number>>
}

const CustomSlider: React.FC<CustomSliderProps> = ({ sliderName, value, setValue }) => {
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
          height={260}
          width={40}
          step={10}
          min={0}
          max={100}
          borderRadius={5}
          minimumTrackTintColor="#40A38E"
          maximumTrackTintColor="#EAEAEA"
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
                <Text style={{ color: '#ffffff' }}>{value}</Text>
            </View>
          )}
          containerStyle={{ borderRadius: 50 }}
          sliderStyle={{ borderRadius: 50 }}
      />
    </View>
  )
}

export default CustomSlider