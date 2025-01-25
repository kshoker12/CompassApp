import React, { useContext, useEffect, useMemo, useState } from 'react'
import { Dialog } from 'react-native-elements';
import { BANKING_CARDS } from '../../../../Constants/financeConstants';
import { Image, TextInput, TouchableOpacity, View, Text, ActivityIndicator } from 'react-native';
import { AppContext } from '../../../../context/AppContext';
import { dollarFormatter } from '../../../../Helpers/HelperFunctions';
import OperationButton from '../../../../components/OperationButton';
import { payCreditCard } from '../../../../Helpers/financesHelper';

/**
 * @description Dialog to allow user to pay credit card amount owedd
 * @param {boolean} payCardDialog -> Indicator whether this dialog is active
 * @param {Function} setPayCardDialog -> Function to set value of pay card dialog
 * @returns 
 */
const PayCardDialog = ({payCardDialog, setPayCardDialog}) => {
    /**
     * @description Context Variables
     */
    const {finances, dispatch, password} = useContext(AppContext);

    /**
     * @description Index of selected card
     */
    const [selectedCard, setSelectedCard] = useState(0);

    /**
     * @description Indicator whether there is an error with input
     */
    const [error, setError] = useState(false);

    /**
     * @description Memoized selected card
     */
    const card = useMemo(()=>finances.debitCards[selectedCard], [selectedCard]);
    
    /**
     * @description Text including amount to pay
     */
    const [amountText, setAmountText] = useState('0.00');

    /**
     * @description State variable indicating user-requested action is being conducted
     */
    const [loading, setLoading] = useState(false);

    /**
     * @description Set amount text to default every time dialog opens and closes
     */
    useEffect(()=> setAmountText(''), [payCardDialog])
    
    /**
     * @description Check if the provided amount is within the available balance of selected card
     */
    useEffect(()=>{
        setError(parseFloat(amountText) > card.available)
    }, [amountText, card, payCardDialog]);

    /**
     * @description Render list of cards to choose from and amount to pay
     */
    return (
        <Dialog
            isVisible = {payCardDialog}
            onBackdropPress = {()=> setPayCardDialog(!payCardDialog)}
            overlayStyle = {{
                width: 330,
                backgroundColor: 'rgb(226, 232, 240)'
            }}
        >
            <View className = 'flex-row justify-between items-start bg-slate-200'>
                <View className = 'flex-col justify-between  h-[140px]'>
                    <View className = 'space-y-2'>
                        <Text className = 'font-semibold'>{card.name}</Text>
                        <Text className = 'text-slate-500 text-xs'>Balance: {dollarFormatter.format(card.available)}</Text>
                    </View>
                    <View className = 'space-y-2 h-[80px]'>
                        <TouchableOpacity 
                            className = 'bg-[#0070ba] px-4 py-1 rounded-lg border-[1px] border-black'
                            onPress={()=>setAmountText(finances.creditCards[0].amount_owed.toString())}
                        >
                            <Text className = ' text-white text-xs'>Pay owed: {dollarFormatter.format(finances.creditCards[0].amount_owed)}</Text>
                        </TouchableOpacity>
                        <View className = 'bg-white w-36 shadow-black shadow-2xl'>
                            <Text className = 'absolute self-start mt-0.5 ml-2 text-lg'>$</Text>
                            <TextInput 
                                value={amountText} 
                                className = 'text-black pb-1 pl-6 pr-1 text-lg'
                                onChangeText={(text)=>setAmountText(text)}
                                keyboardType='numeric'
                                returnKeyType='done'
                                placeholder='0.00'
                                placeholderTextColor={'gray'}
                            />    
                        </View>    
                        {error && (
                            <Text className = 'w-36 text-[8px] text-red-600'>Error: Insufficient Funds in {card.name}</Text>
                        )}
                    </View>
                </View>  
                <View className = 'space-y-1'> 
                    {BANKING_CARDS.map(({cardImage, type, id}, index)=> type !== 'creditCards' && (
                        <TouchableOpacity 
                            className = {`overflow-hidden w-[128px] rounded-lg  ${selectedCard === index ? 'border-green-700 border-4' : ''}`}
                            onPress={()=>setSelectedCard(index)}
                        >
                            <Image source={cardImage} className = {`w-[130px] h-[75px] ${selectedCard === index ? '-ml-0.5' : ''}`}/>
                        </TouchableOpacity>
                    ))}    
                </View>
            </View>
            <OperationButton
                title = 'Pay Amount'
                style = {`self-start mb-2 ${isNaN(parseFloat(amountText)) || error ? 'opacity-30' : 'opacity-1'}`}
                textStyle = 'font-semibold'
                disabled = {isNaN(parseFloat(amountText)) || error}
                clickAction = {async ()=>{
                    setLoading(true);
                    await payCreditCard(dispatch, finances.creditCards[0].id, card.id, parseFloat(amountText));
                    setLoading(false);
                    setPayCardDialog(false);
                }}
            />
            {loading && (
                <View className = 'absolute self-start -bottom-4 left-2 space-x-2 flex-row items-center'>
                    <Text>Processing</Text>
                    <ActivityIndicator color={'black'}/>
                </View>
            )}
        </Dialog>
    );
};

export default PayCardDialog