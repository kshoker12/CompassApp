import React, { useContext, useEffect, useMemo, useState } from 'react'
import { CheckBox, Dialog } from 'react-native-elements';
import { BANKING_CARDS, transactionModes } from '../../../../Constants/financeConstants';
import { Image, TextInput, TouchableOpacity, View, Text } from 'react-native';
import { AppContext } from '../../../../context/AppContext';
import { dollarFormatter } from '../../../../Helpers/HelperFunctions';
import OperationButton from '../../../../components/OperationButton';
import ComponentLoader from '../../../../components/ComponentLoader';
import ErrorMessage from '../../../../components/ErrorMessage';
import { addTransaction } from '../../../../Helpers/financesHelper';

/**
 * @description Dialog to allow user to add transactions for given expense
 * @param {Object} expense Expense to add transaction for
 * @param {number} operationMode Indicator of which operation is being conducted
 * @param {Function} setOperationMode Function to set value of operation mode
 * @returns {JSX.Element}
 */
const AddTransaction = ({expense, operationMode, setOperationMode}) => {
    /** Context Variables */
    const {finances, dispatch, password} = useContext(AppContext);

    /** Index of selected card */
    const [selectedCard, setSelectedCard] = useState(0);

    /** Indicator whether there is an error with input */
    const [error, setError] = useState(false);

    /** Text including transaction name */
    const [transactionName, setTransactionName] = useState('');
    
    /** Text including amount to pay */
    const [amountText, setAmountText] = useState('');

    /** State variable indicating user-requested action is being conducted */
    const [loading, setLoading] = useState(false);

    /** CheckBox to allow user to add this transaction to asset */
    const [isAsset, setIsAsset] = useState(false);

    /** Memoized selected card, recomputed upon change of user-selection */
    const card = useMemo(()=>{
        const chosenCard = BANKING_CARDS[selectedCard];
        const extractedCard = finances[chosenCard.type].find(({id})=>chosenCard.id === id);
        extractedCard.type = chosenCard.type;
        return extractedCard;
    }, [selectedCard]);

    /** Set amount text to default every time dialog opens and closes */
    useEffect(()=> {
        if (operationMode === transactionModes.ADD_TRANSACTION) {
            setAmountText('');
            setTransactionName('');
            setError(false);
            setSelectedCard(0);
            setLoading(false);
            setIsAsset(false);
        }
    }, [operationMode])
    
    /** Check if the provided amount is within the available balance of selected card */
    useEffect(()=>{
        setError(parseFloat(amountText) > expense.amount_allocated - expense.transactions.reduce((total, current)=>total + current.cost, 0) ||  parseFloat(amountText) > card[card.type === 'creditCards' ? 'available_credits' : 'available']);
    }, [amountText, card]);

    /** Render list of cards to choose from and cost and name of transactions */
    return (
        <Dialog
            isVisible = {operationMode === transactionModes.ADD_TRANSACTION}
            onBackdropPress = {()=> setOperationMode(transactionModes.IDLE_MODE)}
            overlayStyle = {{
                width: 330,
                backgroundColor: 'rgb(226, 232, 240)'
            }}
        >
            <View className = 'flex-row justify-between items-start bg-slate-200'>
                <View className = 'flex-col justify-between'>
                    <View className = 'space-y-1 mb-1'>
                        <Text className = 'font-semibold'>{card.name}</Text>
                        <Text className = 'text-slate-500 text-xs'>Balance: {dollarFormatter.format(card[card.type === 'creditCards' ? 'available_credits' : 'available'])}</Text>
                    </View>
                    <View className = 'space-y-2'>
                        <View>
                            <Text>Name</Text>
                            <View className = 'bg-white w-36 shadow-black shadow-2xl'>
                                <TextInput 
                                    value={transactionName} 
                                    className = 'text-black pb-1 pl-2 pr-1 text-lg'
                                    onChangeText={(text)=>setTransactionName(text)}
                                    returnKeyType='done'
                                    placeholder='Transaction'
                                    placeholderTextColor={'gray'}
                                />    
                            </View>     
                        </View>
                        <View>
                            <Text>Cost</Text>
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
                            <ErrorMessage
                                errorText = {`${parseFloat(amountText) > expense.amount_allocated - expense.transactions.reduce((total, current)=>total + current.cost, 0) ? `Transaction cost is more than allocated amount` : `Insufficient Funds in ${card.name}`}`}
                                style = 'absolute -bottom-[25px]'
                                textStyle = ''
                                error = {error}
                            />   
                        </View>
                        <View className = 'flex-row items-center justify-start pt-4'>
                            <CheckBox
                                checked = {isAsset}
                                onPress={()=>setIsAsset(!isAsset)}
                                className = ''
                                title='Asset'
                                checkedColor='#0070ba'
                                containerStyle = {{width: 144, marginLeft: -1}}
                            />
                        </View>
                    </View>
                </View>  
                <View className = 'space-y-1'> 
                    {BANKING_CARDS.map(({cardImage, type, id}, index)=> (
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
                title = 'Confirm'
                textStyle = ''
                style = {`self-start mb-4 ${error || isNaN(parseFloat(amountText)) ? 'opacity-30' : 'opacity-1'}`}
                disabled = {error || isNaN(parseFloat(amountText))}
                clickAction = {async ()=>{
                    setLoading(true);
                    await addTransaction(dispatch, expense.id, transactionName, parseFloat(amountText), isAsset, BANKING_CARDS[selectedCard].id, BANKING_CARDS[selectedCard].type)
                    setLoading(false);
                    setOperationMode(transactionModes.IDLE_MODE)    
                }}
            />
            <ComponentLoader
                title = 'Processing'
                style = 'absolute -bottom-3 left-1'
                textStyle = ''
                indicatorStyling = 'black'
                loading = {loading}
            />
        </Dialog>
    );
};

export default AddTransaction;