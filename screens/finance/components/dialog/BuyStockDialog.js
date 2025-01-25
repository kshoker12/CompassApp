import React, { useContext, useEffect, useMemo, useState } from 'react'
import { Dialog, Icon } from 'react-native-elements';
import { BANKING_CARDS, stockModes } from '../../../../Constants/financeConstants';
import { Image, TextInput, TouchableOpacity, View, Text, ActivityIndicator } from 'react-native';
import { AppContext } from '../../../../context/AppContext';
import { dollarFormatter } from '../../../../Helpers/HelperFunctions';
import OperationButton from '../../../../components/OperationButton';
import ComponentLoader from '../../../../components/ComponentLoader';
import ErrorMessage from '../../../../components/ErrorMessage';
import { buyShares, findStock } from '../../../../Helpers/financesHelper';

/**
 * @description Dialog to allow user to purchase stocks
 * @param {string} currentMode Indicator whether this dialog is active
 * @param {Function} setCurrentMode Function to set value of pay card dialog
 * @returns 
 */
const BuyStockDialog = ({currentMode, setCurrentMode}) => {
    /** Context Variables */
    const {finances, password, dispatch} = useContext(AppContext);

    /** Indicator whether there is an error with input */
    const [error, setError] = useState(false);

    /** Memoized Wealth simple cash account */
    const card = useMemo(()=>finances.debitCards[0], []);
    
    /** Text including stock code to buy */
    const [stockCodeText, setStockCodeText] = useState('');

    /** State variable representing quantity of stock to purchase */
    const [quantity, setQuantity] = useState(1);

    /** State variable representing stock price of inputted stock */
    const [stockPrice, setStockPrice] = useState(0);

    /** State variable indicating user-requested action is being conducted */
    const [loading, setLoading] = useState(false);

    /** Long name of stock */
    const [longName, setLongName] = useState('');

    /** Reset input fields upon opening of buy stock dialog */
    useEffect(()=>{
        if (currentMode === stockModes.BUY_STOCK) {
            setStockCodeText('');
            setQuantity(1);
            setStockPrice(0);
            setError(false);
            setLongName('');
        }
    },[currentMode]);

    /** Throw error if the total cost of stock purchase is greater than
    the available amount in wealth-simple cash card amount  */
    useEffect(()=>{
        setError(isNaN(stockPrice) || quantity * stockPrice > card.available);
    }, [quantity, stockPrice]);

    /** Check for stock price for given stock code text */
    useEffect(()=>{
        const tempFunc = async () => {
            if (stockCodeText.length > 0) {
                setLoading(true);
                await findStock(stockCodeText, setStockPrice, setLongName, setError);
                setLoading(false);
            } else {
                setLongName('');
                setStockPrice(0);
                setError(false);
            }  
        }
        tempFunc();
    },[stockCodeText]);

    /** Render Stock purchase dialog with a search input and quantity input 
    as well as available amount in wealth simple cash */
    return (
        <Dialog
            isVisible = {stockModes.BUY_STOCK === currentMode}
            onBackdropPress = {()=> setCurrentMode(stockModes.IDLE_MODE)}
            overlayStyle = {{
                width: 330,
                backgroundColor: 'rgb(226, 232, 240)'
            }}
        >
            <View className = 'flex-col justify-between space-y-2'>
                <View className = 'space-y-1'>
                    <Text className = 'font-semibold'>{card.name}</Text>
                    <Text className = 'text-slate-500 text-xs'>Balance: {dollarFormatter.format(card.available)}</Text>
                </View>
                <View className = 'flex-row items-center overflow-hidden justify-start shadow-black shadow-2xl w-[250px] border-[1px] border-black rounded-lg '>
                    <TouchableOpacity
                        className = 'p-1 bg-gray-400 border-r-[1px]'
                    >
                        <Icon name='search' size={30}/>
                    </TouchableOpacity>
                    <TextInput
                        className = 'text-xl flex-grow py-1 px-1'  
                        value={stockCodeText}
                        onChangeText={(text)=>setStockCodeText(text)}
                        returnKeyType='done'
                        blurOnSubmit
                    />
                    <ComponentLoader
                        title = ''
                        style = 'p-1 '
                        textStyle = ''
                        indicatorStyling = 'black'
                        loading = {loading}
                    />
                </View>    
                <ErrorMessage   
                    errorText = {quantity * stockPrice > card.available ? `Insufficient Funds in ${card.name}` : 'Stock not found'}
                    style = 'absolute bottom-[70px] '
                    textStyle = ''
                    error = {error}
                />
                <View className = 'flex-row justify-start items-center space-x-1 h-[80px]'>
                    <Text className = 'text-xl w-16'>Qty: {quantity}</Text>
                    <View className = ''>
                        <TouchableOpacity 
                            className = ''
                            onPress={()=>setQuantity(quantity + 1)}
                        >
                            <Icon name='caret-up' size={30} type='font-awesome'/>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            className = ''
                            onPress={()=>quantity - 1 > 0 && setQuantity(quantity - 1)}
                        >
                            <Icon name='caret-down' size={30} type='font-awesome'/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View className = 'flex-row justify-between items-center space-x-2 mt-10'>
                <View className = 'w-2/3'>
                    <View className = 'absolute -top-8 mr-2'>
                        <Text className = ''>{longName}</Text>    
                    </View>
                    <View className = 'flex-row items-center justify-start'>
                        <Text className = 'font-bold text-xl text-gray-600'>Total: </Text>
                        <Text className = 'text-xl font-thin'>{dollarFormatter.format(isNaN(stockPrice) ? 0 : quantity * stockPrice)}</Text>
                    </View>    
                </View>
                
                <OperationButton
                    title = 'Purchase'
                    style = {`${error || stockCodeText.length === 0 || isNaN(stockPrice) ? 'opacity-30' : 'opacity-1'} `}
                    disabled = {error || stockCodeText.length === 0 || isNaN(stockPrice)}
                    clickAction = {async ()=>{
                        setLoading(true);
                        await buyShares(dispatch, stockCodeText, quantity, card.id, longName, stockPrice);
                        setLoading(false);
                        setCurrentMode(stockModes.IDLE_MODE)
                    }}
                />
            </View>
        </Dialog>
    );
};

export default BuyStockDialog;