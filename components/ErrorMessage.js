import { View, Text } from 'react-native'
import React from 'react'

/**
 * @description Error message component displaying errors
 * @param {string} errorText Text describing error
 * @param {string} style Additional styling to apply to parent container
 * @param {string} textStyle Additional styling to apply to text
 * @param {boolean} error Indicator whether to show this error
 * @returns 
 */
const ErrorMessage = ({errorText = '', style = '', textStyle = '', error = false}) => error && (
    <View className = {`${style}`}>
        <Text className = {`text-red-700 text-[10px] ${textStyle}`}>Error: {errorText}</Text>
    </View>
);

export default ErrorMessage;