import { View, Text, SafeAreaView, TextInput, ActivityIndicator, Image } from 'react-native'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import DropDownPicker from 'react-native-dropdown-picker';
import VinaryTitle from '../../components/VinaryTitle';
import BackArrow from '../../components/BackArrow';
import OperationButton from '../../components/OperationButton';
import { AppContext } from '../../context/AppContext';
import { debitCardToDropDown, transferCash } from '../../Helpers/financesHelper';
import { useNavigation } from '@react-navigation/native';
import { BANKING_CARDS } from '../../Constants/financeConstants';
import { Icon } from 'react-native-elements';
import { dollarFormatter } from '../../Helpers/HelperFunctions';
import ErrorMessage from '../../components/ErrorMessage';
import ComponentLoader from '../../components/ComponentLoader';

/**
 * @description Screen where user can transfer money between accounts
 * @param {Object} route Route object
 * @returns {JSX.Element}
 */
const TransferScreen = ({route}) => {
    /** Context Variables */
    const { finances, password, dispatch } = useContext(AppContext);

    /** State variable tracking whether from dropdown is open */
    const [fromOpen, setFromOpen] = useState(false);

    /** Navigation object */
    const navigation = useNavigation();

    /** State variable tracking whether the to dropdown is open */
    const [toOpen, setToOpen] = useState(false);

    /** State variable determining which card is selected as the source card */
    const [selectedSourceCard, setSelectedSourceCard] = useState(null);

    /** State variable determining which card is selected as the target card */
    const [selectedTargetCard, setSelectedTargetCard] = useState(null);

    /** Extract options for banking selections in correct format for dropdown */
    const bankingOptions = useMemo(()=>debitCardToDropDown(finances.debitCards),[route.name]);

    /** From options */
    const [fromOptions, setFromOptions] = useState(bankingOptions);

    /** To options */
    const [toOptions, setToOptions] = useState(bankingOptions);

    /** State variable representing amount to transfer */
    const [amountText, setAmountText] = useState('');

    /** Error thrown if amount to transfer is greater than the balance */
    const [error, setError] = useState(false);

    /** State variable indicating user-requested action is being conducted */
    const [loading, setLoading] = useState(false);

    /** Reset all values to default upon change of route */
    useEffect(()=>{
        setFromOpen(false);
        setToOpen(false);
        setSelectedSourceCard(null);
        setSelectedTargetCard(null);
        setError(false);
        setAmountText('');
        setToOptions(bankingOptions);
        setFromOptions(bankingOptions);
    },[route.name]);

    /** Adjust to options upon change of source card */
    useEffect(()=>{
        if (selectedSourceCard !== null) {
            setToOptions(bankingOptions.filter(({value})=>value !== selectedSourceCard))   
            setSelectedTargetCard(null); 
        }
    },[selectedSourceCard]);

    /** Check for Errors if user inputs amount exceeding available funds */
    useEffect(()=>{
        // Extract source card and amount as a float
        const amount = parseFloat(amountText);
        const card = finances.debitCards.find(({id})=>id===selectedSourceCard);
        setError((isNaN(amount) ? 0 : amount) > (card ? card.available : Infinity));
    },[amountText]);

    /** Render from, to, and amount drop downs and text input to allow user to transfer funds */
    return (
        <SafeAreaView>
            <View className = 'h-full w-full'>
                <LinearGradient
                    colors={['#222222', '#141414','#6082B6']}
                    className = 'w-full h-full flex-col'
                >
                    <BackArrow
                        colour = 'white'
                        style = 'absolute'
                    />
                    <VinaryTitle 
                        title = 'Transfer Funds' 
                        style = 'self-center' 
                        textStyle = 'text-4xl text-white pt-8'
                    />    
                    <View className = 'p-8 z-50 mb-4'>
                        <Text className = 'text-gray-400 text-xl'>From</Text>
                        <DropDownPicker
                            items={fromOptions}
                            onPress={()=>toOpen && setToOpen(false)}
                            placeholder='Select a card'
                            value = {selectedSourceCard}
                            open = {fromOpen}
                            setValue={setSelectedSourceCard}
                            setOpen={setFromOpen}
                            theme='DARK'
                        />
                    </View>
                    <View className = 'p-8 z-40 mb-4'>
                        <Text className = 'text-gray-400 text-xl'>To</Text>
                        <DropDownPicker
                            items={toOptions}
                            onPress={()=>fromOpen && setFromOpen(false)}
                            placeholder='Select a card'
                            value = {selectedTargetCard}
                            open = {toOpen}
                            setValue={setSelectedTargetCard}
                            setOpen={setToOpen}
                            theme='DARK'
                            zIndex={50}
                        />
                    </View>
                    <View className = 'p-8'>
                        <Text className = 'text-gray-400 text-xl'>Amount</Text>
                        <Text className = 'text-gray-400 absolute top-16 left-10 mt-1.5 z-50 text-xl'>$</Text>
                        <TextInput
                            value={amountText}
                            onChangeText={(text)=>setAmountText(text)}
                            className = 'rounded-lg border-[1px] border-black py-2.5 text-gray-200 text-base pl-7 bg-[#2c2e45]'
                            blurOnSubmit
                            returnKeyType='done'
                            keyboardType='numeric'
                            placeholder='0.00'
                            editable = {selectedSourceCard !== null}
                            placeholderTextColor={'rgb(156, 163, 175)'}
                        />
                        <ErrorMessage
                            errorText = 'Requested amount exceeds available funds'
                            style = 'absolute bottom-4 left-8'
                            textStyle = ''
                            error = {error}
                        />
                    </View>
                    <View className = 'flex-row items-center justify-center space-x-4'>
                        <View className = 'w-[150px] h-24 overflow-hidden rounded-lg border-[1px] border-white'>
                            {selectedSourceCard !== null ? (
                                <Image 
                                    source = {BANKING_CARDS.filter(({type})=>type === 'debitCards').find(({id})=> id === selectedSourceCard).cardImage}
                                    className = 'w-full h-full'
                                />
                            ) : (
                                <Text className = 'text-white self-center mt-8'>Choose Card</Text>
                            )}
                        </View>
                        <View className = 'flex-col items-center justify-center w-16'>
                            <Text className = 'text-white font-thin text-sm'>
                                {
                                isNaN(parseFloat(amountText)) ? 
                                    dollarFormatter.format(0) 
                                : 
                                    dollarFormatter.format(parseFloat(amountText))
                                }
                            </Text>
                            <Icon name='arrow-right' type='font-awesome' color={'white'}/>
                        </View>
                        <View className = 'w-[150px] h-24 overflow-hidden rounded-lg border-[1px] border-white'>
                            {selectedTargetCard !== null ? (
                                <Image 
                                    source = {BANKING_CARDS.filter(({type})=>type === 'debitCards').find(({id})=> id === selectedTargetCard).cardImage}
                                    className = 'w-full h-full'
                                />
                            ) : (
                                <Text className = 'text-white self-center mt-8'>Choose Card</Text>
                            )}
                        </View>
                    </View>
                    <View className = 'justify-end items-end mb-8 flex-grow'>
                        <ComponentLoader
                            title = 'Transferring'
                            style = 'self-start absolute -bottom-6 left-9'
                            textStyle = 'text-white'
                            indicatorStyling = 'white'
                            loading = {loading}
                        />
                        <OperationButton
                            title = 'Transfer'
                            style = {`self-start mx-8 ${(selectedSourceCard === null || selectedTargetCard === null || isNaN(parseFloat(amountText)) || error) ? 'opacity-30' : 'opacity-1'}`}
                            textStyle = 'text-lg'
                            clickAction = {async ()=>{
                                setLoading(true);
                                await transferCash(dispatch, selectedSourceCard, selectedTargetCard, parseFloat(amountText))
                                setLoading(false);
                                navigation.goBack()
                            }}
                            disabled = {selectedSourceCard === null || selectedTargetCard === null || isNaN(parseFloat(amountText)) || error}
                        />    
                    </View>
                </LinearGradient>
            </View>
        </SafeAreaView>
    );
};

export default TransferScreen;