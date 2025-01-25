import React, { useContext, useEffect, useMemo, useState } from 'react'
import { Dialog } from 'react-native-elements';
import { BANKING_CARDS } from '../../../../Constants/financeConstants';
import { Image, TextInput, TouchableOpacity, View, Text } from 'react-native';
import { AppContext } from '../../../../context/AppContext';
import { dollarFormatter } from '../../../../Helpers/HelperFunctions';
import OperationButton from '../../../../components/OperationButton';
import ErrorMessage from '../../../../components/ErrorMessage';
import ComponentLoader from '../../../../components/ComponentLoader';
import { addSavingFunds, removeSavingFunds } from '../../../../Helpers/financesHelper';

/**
 * @description Dialog to allocate or deallocate funds to saving goal
 * @param {number} selectedIndex Index of saving goal being edited
 * @param {string} operationType Operation type (Add or Remove)
 * @param {Function} setOperationType Function to change value of operation type
 * @returns 
 */
const SavingGoalFunds = ({selectedIndex, operationType, setOperationType}) => {
    /** Context Variables */
    const { finances, password, dispatch } = useContext(AppContext);

    /** Index of selected card */
    const [selectedCard, setSelectedCard] = useState(0);

    /** Indicator whether there is an error with input */
    const [error, setError] = useState(false);

    /** State variable indicating user-requested action is being conducted */
    const [loading, setLoading] = useState(false);

    /** Memoized selected card */
    const card = useMemo(()=>finances.debitCards[selectedCard], [selectedCard, operationType]);
    
    /** Text including amount to pay */
    const [amountText, setAmountText] = useState('');

    /** Set amount text to default every time dialog opens and closes */
    useEffect(()=> setAmountText(''), [operationType])
    
    /** Check if the provided amount is within the available balance of selected card */
    useEffect(()=>{
        if (selectedIndex !== -1) setError(isNaN(parseFloat(amountText)) || parseFloat(amountText) <= 0 || operationType === 'add' ?  parseFloat(amountText) > card.available || parseFloat(amountText) + finances.savings[selectedIndex].saved_amount > finances.savings[selectedIndex].target_goal: parseFloat(amountText) > finances.savings[selectedIndex].saved_amount)
    }, [amountText, card, operationType]);

    /** Render list of cards to choose from and amount to pay */
    return (
        <Dialog
            isVisible = {['remove', 'add'].includes(operationType)}
            onBackdropPress = {()=> setOperationType(null)}
            overlayStyle = {{
                width: 340,
                backgroundColor: 'rgb(226, 232, 240)',
            }}
        >
            {['remove', 'add'].includes(operationType) && (
                <>
                    <View className = 'flex-row justify-between items-start bg-slate-200'>
                        <View className = 'flex-col justify-between  h-[180px]'>
                            <View className = 'space-y-2'>
                                <Text className = 'font-semibold'>{card.name}</Text>
                                <Text className = 'text-slate-500 text-xs'>{`${operationType === 'add' ? 'Balance' : 'Amount Saved'}: ${operationType === 'add' ? dollarFormatter.format(card.available) : dollarFormatter.format(finances.savings[selectedIndex].saved_amount)}`}</Text>
                            </View>
                            <View className = 'space-y-2 h-[80px]'>
                                <View className = 'bg-white w-36 shadow-black shadow-2xl'>
                                    <Text className = 'absolute self-start mt-0.5 ml-2 text-lg'>$</Text>
                                    <TextInput 
                                        value={amountText} 
                                        className = 'text-black pb-1 pl-6 pr-1 text-lg'
                                        placeholderTextColor={'gray'}
                                        onChangeText={(text)=>setAmountText(text)}
                                        keyboardType='numeric'
                                        returnKeyType='done'
                                        placeholder='0.00'
                                    />    
                                </View>
                                <ErrorMessage
                                    errorText = {parseFloat(amountText) && operationType === 'add' && parseFloat(amountText) + finances.savings[selectedIndex].saved_amount > finances.savings[selectedIndex].target_goal ? `Amount cannot be greater than target goal` : `Insufficient funds in ${operationType === 'Add' ? card.name : finances.savings[selectedIndex].name}`}
                                    error = {error}
                                    textStyle = 'absolute mt-1'
                                    style = 'w-24'
                                />    
                            </View>
                            <View className = 'flex-row items-center justify-start space-x-1 mb-5'>
                                <TouchableOpacity
                                    className = 'px-4 py-1 bg-red-700 rounded-lg border-[1px] border-black '
                                    onPress={()=>setOperationType(null)}
                                >
                                    <Text className = 'text-white shadow-xl font-semibold'>Back</Text>
                                </TouchableOpacity>
                                <OperationButton
                                    style = {`ml-1 ${error || isNaN(parseFloat(amountText)) ? 'opacity-30' : 'opacity-1'} `}
                                    clickAction = {async ()=>{
                                        setLoading(true);
                                        const fundsAction = operationType === 'add' ? addSavingFunds : removeSavingFunds;
                                        await fundsAction(dispatch, finances.savings[selectedIndex].id, card.id, parseFloat(amountText));
                                        setLoading(false);
                                        setOperationType(null);
                                    }}
                                    title = 'Transfer'
                                    disabled = {error || isNaN(parseFloat(amountText))}
                                /> 
                            </View>
                            <ComponentLoader
                                style = 'absolute -bottom-2 left-8'
                                textStyle = ''
                                title = 'Transferring'
                                loading = {loading}
                                indicatorStyling = ''
                            />
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
                </>
            )}
        </Dialog>
    );
};

export default SavingGoalFunds;