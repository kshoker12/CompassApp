import { View, Text } from 'react-native'
import React from 'react'
import { dollarFormatter } from '../../../Helpers/HelperFunctions';

/**
 * @description Display debit card details such as available balance
 * @param {Object} card -> Card to display details for
 * @returns {JSX.Element}
 */
const DebitCardDetails = ({card}) =>  (
    <View className = 'w-full '>
        <View className = 'flex-row justify-between items-center mx-7 py-4 border-b-[1px] border-white'>
            <Text className = 'text-white text-3xl font-thin'>Available Balance</Text>
            <Text className = 'text-white text-2xl'>{dollarFormatter.format(card.available)}</Text>
        </View>
    </View>
);

export default DebitCardDetails;