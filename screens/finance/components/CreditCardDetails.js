import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { dollarFormatter } from '../../../Helpers/HelperFunctions';
import PayCardDialog from './dialog/PayCardDialog';

/**
 * @description Display credit card available credits, limit, and amount owed
 * @param {Object} card -> Card to display details for
 * @returns {JSX.Element}
 */
const CreditCardDetails = ({card}) => {
    /**
     * @description State variable to display pay card dialog
     */
    const [payCardDialog, setPayCardDialog] = useState(false);

    /**
     * @description Render credit card details such as amount owed, limit, and available credits as well as the dialog to pay credit card
     */
    return (
        <View className = 'border-b-[1px] border-white py-2 space-y-1 mx-7'>
            <PayCardDialog payCardDialog = {payCardDialog} setPayCardDialog = {setPayCardDialog}/>
            <View className = 'flex-row justify-between items-center '>
                <Text className = 'text-white text-xl font-thin'>Limit</Text>
                <Text className = 'text-white text-lg'>{dollarFormatter.format(card.limit)}</Text>
            </View>
            <View className = 'flex-row justify-between items-center'>
                <Text className = 'text-white text-xl font-thin'>Available Credits</Text>
                <Text className = 'text-white text-lg'>{dollarFormatter.format(card.available_credits)}</Text>
            </View>
            <View className = 'flex-row justify-between items-center mb-1'>
                <Text className = 'text-white text-xl font-thin'>Amount Owed</Text>
                <Text className = 'text-white text-lg'>{dollarFormatter.format(card.amount_owed)}</Text>
            </View>
            <TouchableOpacity 
                className = 'self-end items-center bg-[#0070ba] px-4 py-1 border-white border-[1px] rounded-lg'
                onPress={()=>setPayCardDialog(!payCardDialog)}
            >
                <Text className = 'text-white'>Pay Credit Card</Text>
            </TouchableOpacity>
        </View>
    );
};

export default CreditCardDetails;