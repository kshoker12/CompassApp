import { View, Text, TextInput, ActivityIndicator } from 'react-native'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { Dialog } from 'react-native-elements'
import { transactionModes } from '../../../../Constants/financeConstants';
import OperationButton from '../../../../components/OperationButton';
import { AppContext } from '../../../../context/AppContext';
import { computeSpentPercentage, setExpenseAmountAllocated } from '../../../../Helpers/financesHelper';
import ErrorMessage from '../../../../components/ErrorMessage';
import ComponentLoader from '../../../../components/ComponentLoader';

/**
 * @description Dialog to allow user to edit allocated amount for given expense item
 * @param {Object} expense Expense to add transaction for
 * @param {number} operationMode Indicator of which operation is being conducted
 * @param {Function} setOperationMode Function to set value of operation mode
 * @returns {JSX.Element}
 */
const EditAllocatedAmount = ({expense, operationMode, setOperationMode}) => {
    /** Context Variables */
    const { password, dispatch } = useContext(AppContext);

    /** Indicator whether there is an error with input */
    const [error, setError] = useState(false);
    
    /** Text including amount to pay */
    const [amountText, setAmountText] = useState('');

    /** State variable indicating user-requested action is being conducted */
    const [loading, setLoading] = useState(false);

    /** Memoized amount spent */
    const amountSpent = useMemo(()=>computeSpentPercentage(expense.amount_allocated, expense.transactions), [expense]);

    /** Set amount text to allocated amount for expense */
    useEffect(()=>{
        if (operationMode === transactionModes.EDIT_AMOUNT_ALLOCATED) {
            setLoading(false);
            setError(false);
            setAmountText(expense.amount_allocated.toString());
        }
    }, [operationMode]);

    /** Throw error if amount allocated is less than amount spent */
    useEffect(()=>{
        setError(isNaN(parseFloat(amountText)) || parseFloat(amountText) < amountSpent * expense.amount_allocated / 100);
    }, [amountText]);

    /** Render Text Input and confirm button for amount allocated  */
    return (
        <Dialog
            isVisible = {operationMode === transactionModes.EDIT_AMOUNT_ALLOCATED}
            onBackdropPress = {()=> setOperationMode(transactionModes.IDLE_MODE)}
            overlayStyle = {{
                width: 330,
                backgroundColor: 'rgb(226, 232, 240)'
            }}
        >
            <View>
                <Text className = 'text-2xl font-thin'>Amount Allocated</Text>
                <Text className = 'absolute self-start bottom-1 left-2 text-xl z-10'>$</Text>
                <TextInput
                    className = 'text-black text-lg px-1 pb-1.5 pl-8 bg-white shadow-black shadow-2xl'
                    style = {{shadowRadius: 6, shadowOffset: 2, textShadowColor: 'black', textShadowRadius: 0.5}}
                    value={amountText}
                    onChangeText={(text)=> setAmountText(text)}
                    blurOnSubmit
                    returnKeyType='done'
                    keyboardType='numeric'
                />
                <ErrorMessage
                    errorText = "Amount allocated can't be smaller than amount spent"
                    textStyle = ''
                    style = 'absolute -bottom-4'
                    error = {error}
                />
            </View>  
            <OperationButton
                title = 'Confirm'
                style = {`self-start ${error || isNaN(amountText) ? 'opacity-30' : 'opacity-1'} mt-8 mb-2 `}
                disabled = {error || isNaN(amountText)}
                textStyle = ''
                clickAction = {async ()=>{
                    setLoading(true);
                    await setExpenseAmountAllocated(dispatch, expense.id, parseFloat(amountText));
                    setLoading(false);
                    setOperationMode(transactionModes.IDLE_MODE)
                }}
            />
            <ComponentLoader
                title = 'Processing'
                style = 'self-start absolute -bottom-4'
                textStyle = ''
                indicatorStyling = 'black'
                loading = {loading}
            />
        </Dialog>
    );
};

export default EditAllocatedAmount;

