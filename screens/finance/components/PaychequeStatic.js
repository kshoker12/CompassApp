import { View, Text, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'

/**
 * @description Paycheque component where user views previous paycheque
 * @param {Object} paycheque -> Paycheque object to render
 * @returns {JSX.Element}
 */
const PaychequeStatic = ({paycheque}) => {
    /**
     * @description Unpack paycheque properties
     */
    const { date, memo, signature, amount, text, name} = paycheque;
 
    /**
     * @description Render paycheque with its properties
     */
    return (
        <View className = 'flex-col w-full justify-center'>
            <View className = 'bg-slate-100 space-y-3 h-[200px] border-[2px] p-6 m-4 self-center flex-grow'>
                <View className = 'self-end flex-row items-end'>
                    <Text className = 'text-xs'>Date</Text>
                    <TextInput 
                        className = 'border-b-[1px] w-36 text-xs pl-1'
                        value={date}
                        editable = {false}
                    />
                </View>
                <View className = 'flex-row justify-between items-end space-x-2'>
                    <View className = 'flex-row items-end justify-start w-3/4'>
                        <Text className = 'w-16 text-xs'>Pay to the Order of</Text>
                        <TextInput 
                            className = 'border-b-[1px] border-black text-xs flex-grow'
                            value={name}
                            editable = {false}
                        />                              
                    </View>
                    <View className = 'flex-row flex-grow items-end space-x-1'>
                        <Text className = 'text-xl'>$</Text>
                        <TextInput 
                            className = 'border-[2px] text-md px-2 py-1 w-20'
                            value={amount.toString()}
                            editable = {false}
                        />
                    </View>
                </View>
                <View className = 'flex-row justify-between items-end space-x-2'>
                    <TextInput 
                        className = 'text-xs flex-grow border-b-[1px]'
                        value={text}
                        editable = {false}
                    />
                    <Text>Dollars</Text>
                </View>
                <View className = 'flex-row justify-between items-end'>
                    <View className = 'flex-row flex-grow items-end justify-start space-x-1 '>
                        <Text>Memo</Text>
                        <TextInput 
                            className = 'border-b-[1px] text-xs w-[150px] pl-1'
                            value={memo}
                            editable = {false}
                        /> 
                    </View>
                    <View className = 'flex-row flex-grow items-end justify-center space-x-1'>
                        <Text>Signature</Text>
                        <TextInput
                            className = 'border-b-[1px] text-xs pl-1 w-[80px]'
                            value={signature}
                            editable = {false}
                        />
                    </View>
                </View>
            </View>    
        </View>
    );
};

export default PaychequeStatic;