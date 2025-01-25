import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

/**
 * @description Back Arrow which navigates user back to previous page
 * @param {string} colour -> Colour of the arrow
 * @param {string} style -> Additional styling to apply to back arrow
 * @returns {JSX.Element}
 */
const BackArrow = ({colour = 'black', style = ''}) => {
    /**
     * @description Navigation Object
     */
    const navigation = useNavigation();

    /**
     * @description Back Button arrow which returns user back to previous screen
     */
    return (
        <TouchableOpacity
            className = {`self-start p-2 z-50 ${style}`}
            onPress={()=>navigation.goBack()}
        >
            <Icon name='arrow-back' color={colour} size={40}/>    
        </TouchableOpacity>
    );
};

export default BackArrow;