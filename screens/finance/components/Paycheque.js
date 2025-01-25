import { View, Text, TextInput, Platform, Button } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import OperationButton from '../../../components/OperationButton';
import ErrorMessage from '../../../components/ErrorMessage';
import ComponentLoader from '../../../components/ComponentLoader';
import { addPaycheque } from '../../../Helpers/financesHelper';
import { AppContext } from '../../../context/AppContext';

/**
 * @description Paycheque component where user creates new paycheque
 * @param {Object} route -> Route object
 * @returns {JSX.Element}
 */
const Paycheque = ({route}) => {
    /** Context Variables */
    const { finances, dispatch, password } = useContext(AppContext);

    /** State variable for paycheque amount */
    const [amount, setAmount] = useState('');

    /** State variable of person receiving paycheque */
    const [payTo, setPayTo] = useState('');

    /** State variable representing the written version of amount in paycheque */
    const [textAmount, setTextAmount] = useState('');

    /** State variable representing additional message as to what this cheque is for */
    const [memo, setMemo] = useState('');

    /** State variable representing current date */
    const [date, setDate] = useState('');

    /** State variable representing signature */
    const [signature, setSignature] = useState('');

    /** State variable indicating user-requested action is being conducted */
    const [loading, setLoading] = useState(false);

    /** Indicator whether there is an error with input */
    const [error, setError] = useState(false);

    /** Set all values of paycheque to default upon arriving at this screen */
    useEffect(()=>{
        if (!loading) {
            setAmount('');
            setPayTo('');
            setTextAmount('');
            setMemo('');
            setDate('');
            setSignature('');    
        };
    },[route.name, loading]);

    /** Throw error if any field is blank or invalid */
    useEffect(()=>{
        setError(
            isNaN(parseFloat(amount)) ||
            payTo.length === 0 ||
            textAmount.length === 0 ||
            date.length === 0 || 
            signature.length === 0
        );
    },[amount, payTo, textAmount, memo, date, signature]);

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
                        onChangeText={(text)=>setDate(text)}
                        returnKeyType='done'
                        blurOnSubmit
                    >
                    </TextInput>
                </View>
                <View className = 'flex-row justify-between items-end space-x-2'>
                    <View className = 'flex-row items-end justify-start w-3/4'>
                        <Text className = 'w-16 text-xs'>Pay to the Order of</Text>
                        <TextInput
                            className = 'border-b-[1px] border-black text-xs flex-grow'
                            value={payTo}
                            onChangeText={(text)=>setPayTo(text)}
                            returnKeyType='done'
                            blurOnSubmit
                        />                               
                    </View>
                    <View className = 'flex-row flex-grow items-end space-x-1'>
                        <Text className = 'text-xl'>$</Text>
                        <TextInput
                            className = 'border-[2px] text-md px-2 py-1 w-20'
                            value={amount}
                            onChangeText={(text)=>setAmount(text)}
                            returnKeyType='done'
                            blurOnSubmit
                        />
                    </View>
                </View>
                <View className = 'flex-row justify-between items-end space-x-2'>
                    <TextInput
                        className = 'text-xs flex-grow border-b-[1px]'
                        value={textAmount}
                        onChangeText={(text)=>setTextAmount(text)}
                        returnKeyType='done'
                        blurOnSubmit
                    />
                    <Text>Dollars</Text>
                </View>
                <View className = 'flex-row justify-between items-end'>
                    <View className = 'flex-row flex-grow items-end justify-start space-x-1 '>
                        <Text>Memo</Text>
                        <TextInput
                            className = 'border-b-[1px] text-xs w-[150px] pl-1'
                            value={memo}
                            onChangeText={(text)=>setMemo(text)}
                            blurOnSubmit
                            returnKeyType='done'
                        />    
                    </View>
                    <View className = 'flex-row flex-grow items-end justify-center space-x-1'>
                        <Text>Signature</Text>
                        <TextInput
                            className = 'border-b-[1px] text-xs pl-1 w-[80px]'
                            value={signature}
                            onChangeText={(text)=>setSignature(text)}
                            blurOnSubmit
                            returnKeyType='done'
                        />    
                    </View>
                </View>
            </View>    
            <OperationButton 
                title = 'Submit Paycheque'
                clickAction = {async ()=>{
                    setLoading(true);
                    await addPaycheque(dispatch, payTo, parseFloat(amount), date, textAmount, memo, signature, 2);
                    setLoading(false);
                }}
                style = {`self-start mx-2 -mt-2 ${error ? 'opacity-30' : 'opacity-1'}`}
                disabled = {error}
            />
            <ComponentLoader
                title = 'Processing'
                style = 'absolute -bottom-6 left-3 '
                textStyle = ''
                indicatorStyling = 'black'
                loading = {loading}
            />
        </View>
    );
};

export default Paycheque;