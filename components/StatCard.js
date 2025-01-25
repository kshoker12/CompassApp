import { View, Text } from 'react-native'
import React from 'react'

/**
 * @description Stat card displaying a stat
 * @param {string} title Title of stat
 * @param {string} value Value of stat
 * @param {string} style Additional styling 
 * @param {string} titleStyle Additional styling for title text
 * @param {string} valueStyle Additional styling for value text
 * @returns {JSX.Element}
 */
const StatCard = ({title, value, style = '', titleStyle = '', valueStyle = ''}) => (
    <View className = {`${style} flex-row items-center justify-center bg-primary-purple border-[1px] border-primary-lightPurple rounded-lg px-4 py-1`}>
        <Text className = {` ${titleStyle} font-semibold text-gray-200`}>{title}: </Text>
        <Text className = {`${valueStyle} text-slate-200`}>{value}</Text>    
    </View>  
);

export default StatCard;