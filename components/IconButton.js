import React from 'react'
import { TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

/**
 * @description Icon Button that conducts an operation
 * @param {string} className Additional styling for button
 * @param {string} icon Icon to display in button
 * @param {string} iconType Type of icon
 * @param {boolean} solid Indicator whether icon is solid or outline
 * @param {string} color Icon color
 * @param {Object} props Additional props for button
 * @returns 
 */
const IconButton = ({className = '', icon = '', iconType = 'font-awesome-5', solid = true, color = '#2c2e45', ...props}) => (
    <TouchableOpacity
        className = {`rounded-full border-[1px] ${className}`}
        {...props}
    >
        <Icon name={icon} type={iconType} color={color} solid = {solid}/>
    </TouchableOpacity>
);

export default IconButton