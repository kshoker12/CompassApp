import React, { useContext, useMemo } from 'react'
import { ScrollView, Text, View } from 'react-native';
import { AppContext } from '../../../context/AppContext';
import { dateFormatter, dollarFormatter } from '../../../Helpers/HelperFunctions';

/**
 * @description List of transactions made on this card
 * @param {Array<Object>} transactions List of transactions made by this card 
 * @param {string} type Type of card transactions being viewed
 * @returns {JSX.Element}
 */
const CardTransactions = ({transactions, type}) => {
    /** Memoized reversed transactions to display latest transactions first */
    const transactionsReverse = useMemo(()=> [...transactions].reverse(), [transactions]);

    /** Render the list of transactions including name, cost, and date */
    return (
        <View className = 'flex-col flex-grow my-4'>
            <View className = 'self-start shadow-xl mx-7'>
                <Text className = ' text-[#94a3b8] text-xl font-semibold'>Transactions</Text>    
            </View>
            <ScrollView className = {`w-full space-y-3 ${type === 'creditCards' ? 'h-[310px]' : 'h-[390px]'}`}>
                {transactionsReverse.map((transaction)=>{
                    return (
                        <View className = 'justify-between flex-row items-end border-b-[1px] border-white py-2 mx-7'>
                            <View className = ''>
                                <Text className = 'text-white text-xl'>{transaction.name}</Text>
                                <Text className = 'text-lg text-white'>{dollarFormatter.format(transaction.cost)}</Text>    
                            </View>
                            <Text className = 'absolute right-0 bottom-1 text-white text-base'>{dateFormatter.format(new Date(transaction.date))}</Text>
                        </View>
                    );
                })}
            </ScrollView>    
        </View>
    );
};

export default CardTransactions;