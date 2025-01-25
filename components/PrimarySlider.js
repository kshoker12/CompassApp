import { View, Text } from 'react-native'
import React from 'react'
import { Icon, Slider } from 'react-native-elements';

/**
 * @description Primary slider component
 * @param {number} limit Maximum value of slider
 * @param {number} value Value of slider
 * @param {Function} SetValue Function to change value of slider
 * @param {string} icon Icon type
 * @param {Object} props Additional props for Slider
 * @returns {JSX.Element}
 */
const PrimarySlider = ({limit, value, setValue, icon, ...props}) => (
    <Slider
        value={value}
        onValueChange={setValue}
        minimumValue={0}
        maximumValue={limit}
        step={1}
        allowTouchTrack
        minimumTrackTintColor='#a855f7'
        maximumTrackTintColor='#e2e8f0'
        trackStyle={{ height: 8, backgroundColor: 'transparent' }}
        thumbStyle={{ height: 20, width: 20, backgroundColor: 'transparent' }}
        thumbProps={{
            children: (
            <Icon
                name={icon}
                type="font-awesome"
                size={15}
                reverse
                containerStyle={{ bottom: 15, right: 15 }}
                color={'#6c71a6'}
            />
            ),
        }}
    />    
);

export default PrimarySlider;