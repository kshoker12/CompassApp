import React from 'react'
import { Image, View } from 'react-native'

/**
 * @description Background Image for screens
 * @param {string} imagePath -> Path of image to display in background 
 * @param {string} shade -> Shade to overlay atop the image
 * @returns 
 */
const BackgroundImage = ({imagePath, shade}) => (
    <>
        <Image source = {imagePath} className = "h-full absolute w-full"/>
        <View className = {`w-full h-full absolute z-10 ${shade} opacity-20 `}/>
    </>    
)

export default BackgroundImage