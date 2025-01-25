import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Icon } from 'react-native-elements';

/**
 * @description Stat view card for home page
 * @param {string} className CSS for this component
 * @param {string} icon Icon for this component
 * @param {string} imageAddress Image address for this component
 * @param {string} title Title of image
 * @param {string} textStyle Additional text styling
 * @param {string} props Additional props to add for styling
 * @returns 
 */
const Stat = ({className, icon, imageAddress, title, textStyle = 'text-xl', ...props}) => {
    return (
        <TouchableOpacity 
            className = {`${className} bg-primary-purple p-[9.3px] border-purple-500 border-[1px] w-[133px] mb-1 flex-row items-center pl-5 space-x-4 opacity-90`}
            {...props}
        >
            <Icon name={icon} type='font-awesome' size={25} color={'#e2e8f0'}/>
            <Text className = {`text-slate-200 ${textStyle} `}>{title}</Text>
        </TouchableOpacity>
    );
};

export default Stat;