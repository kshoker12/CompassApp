import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Chip, Icon } from 'react-native-elements';

/** 
 * @description Styling based on type
 * @variation Neutral Neutral styling for neutral alert
 * @variation Danger Dangerous styling for failed operations
 * @variation Success Successful styling for successful operations
 */
const typeBasedStyling = {
    success: 'bg-success-green',
    neutral: 'bg-[#0070ba]',
    danger: 'bg-blood-500'
};

/** 
 * @description Alert chip indicating status
 * @param {string} status Status text for alert
 * @param {Function} setStatus Function to set status
 * @param {string} style Styling for this chip
 * @param {string} textStyle Styling for text
 * @param {string} iconColor Color of icon
 * @param {string} type Type of button (Success, Neutral, Danger)
 * @param {JSX.Element}
 */
const AlertChip = ({status, setStatus, style = '', textStyle, iconColor}) => status !== null ? (
    <View
        className = {`flex-row justify-center space-x-2 items-center w-fit self-center rounded-xl border-[1px] mt-2 px-4 py-1 ${style} ${typeBasedStyling[status.type]}`}
    >
        <Text className = {`${textStyle}`}>{status.text}</Text>
        <TouchableOpacity 
            onPress={()=>setStatus(null)}
        >
            <Icon name='close' type='font-awesome' color={iconColor}/>    
        </TouchableOpacity>
    </View>
   
) : (<></>);

export default AlertChip;