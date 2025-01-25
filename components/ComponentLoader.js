import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'

/**
 * @description Activity loader which indicates user-requested action is being carried out
 * @param {string} title Title of loader
 * @param {string} textStyle Additional styling for text
 * @param {string} style Additional styling for component
 * @param {string} indicatorStyling Additional styling for activity indicator
 * @param {boolean} loading Indicator whether this component is showing
 * @returns {JSX.Element}
 */
const ComponentLoader = ({title = '', textStyle = '', style = '', indicatorStyling = 'gray', loading = false}) => loading && (
    <View className = {` ${style} flex-row items-center justify-center space-x-1 `}>
        <Text className = {`${textStyle}`}>{title}</Text>
        <ActivityIndicator color = {`${indicatorStyling}`}/>
    </View>
);

export default ComponentLoader;