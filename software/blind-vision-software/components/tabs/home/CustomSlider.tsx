import { Dispatch, SetStateAction } from 'react';
import { View, Text } from 'react-native'
import VerticalSlider from 'rn-vertical-slider';

interface CustomSliderProps {
    value: number,
    setValue: Dispatch<SetStateAction<number>>
}

const CustomSlider: React.FC<CustomSliderProps> = ({ value, setValue }) => {
  return (
    <VerticalSlider
        value={value}
        onChange={(value) => setValue(value)}
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
  )
}

export default CustomSlider