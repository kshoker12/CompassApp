import { Text, TouchableOpacity } from 'react-native'
import React from 'react'

/**
 * @description Operation button to finalize an action
 * @param {string} style -> Additional styling to apply to button
 * @param {string} title -> Title to display in operation
 * @param {Function} clickAction -> Click action to conduct upon clicking button
 * @param {string} textStyle -> Additional text styling to apply to text
 * @param {Object} props -> Additional props
 * @returns {JSX.Element}
 */
const OperationButton = ({style = '', title = 'Pick a title', clickAction, textStyle = '', ...props}) => (
    <TouchableOpacity 
        className = {` px-4 py-1 bg-[#0070ba] border-[1px] border-black rounded-lg ${style} `}
        onPress={clickAction}
        {...props}
    >
        <Text className = {`shadow-xl text-white font-semibold ${textStyle}`}>{title}</Text>
    </TouchableOpacity>
);

export default OperationButton;