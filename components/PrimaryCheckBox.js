import { View, Text, TextInput } from 'react-native'
import React from 'react'
import { CheckBox } from 'react-native-elements';

/**
 * @description Primary Check Box
 * @param {string} checked Indicator whether checkbox is selected
 * @param {Function} clickAction Action to be conducted upon clicking check box
 * @param {string} title Title for checkbox
 * @param {Object} style Additional styling for checkbox
 * @returns {JSX.Element}
 */
const PrimaryCheckBox = ({checked, clickAction, title, style}) => (
    <View className = 'self-start'>
        <CheckBox
            style = {{backgroundColor: 'blue'}}
            title={title}
            containerStyle = {{backgroundColor: '#6c71a6', borderColor: 'black', padding: 6.5, paddingHorizontal: 14, borderRadius: 10, marginLeft: -2,...style}}
            titleProps={{style: {color: 'white', fontWeight: 700, fontSize: 18, marginLeft: 8 }}}
            checked = {checked}
            checkedColor='#2c2e45'
            onPress={()=>clickAction()}
        />    
    </View>
);

export default PrimaryCheckBox;

