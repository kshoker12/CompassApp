import React, { useContext, useEffect, useMemo, useState } from 'react'
import { Dialog, Icon } from 'react-native-elements';
import { BANKING_CARDS, stockModes } from '../../../../Constants/financeConstants';
import { TextInput, TouchableOpacity, View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { AppContext } from '../../../../context/AppContext';
import { dollarFormatter } from '../../../../Helpers/HelperFunctions';
import OperationButton from '../../../../components/OperationButton';
import { Image } from 'expo-image';
import ComponentLoader from '../../../../components/ComponentLoader';
import { sellShares } from '../../../../Helpers/financesHelper';

/**
 * @description Dialog to allow user to sell stocks
 * @param {string} currentMode Indicator whether this dialog is active
 * @param {Function} setCurrentMode Function to set value of pay card dialog
 * @returns 
 */
const SellStockDialog = ({currentMode, setCurrentMode}) => {
    /** Context Variables */
    const {finances, dispatch, password} = useContext(AppContext);

    /** Memoized Wealth simple cash account */
    const card = useMemo(()=>finances.debitCards[0], []);

    /** Index of selected stock to sell */
    const [selectedStock, setSelectedStock] = useState(-1);

    /** State variable representing quantity of stock shares to sell */
    const [quantity, setQuantity] = useState(1);

    /** State variable indicating user-requested action is being conducted */
    const [loading, setLoading] = useState(false);

    /** Reset input fields upon opening of sell stock dialog */
    useEffect(()=>{
        if (currentMode === stockModes.SELL_STOCK) {
            setSelectedStock(-1);
            setQuantity(1);
        }
    },[currentMode]);

    /** Set quantity to 1 upon switching selected stock */
    useEffect(()=>{setQuantity(1)}, [selectedStock]);

    /** Render Stock purchase dialog with a search input and quantity input 
    as well as available amount in wealth simple cash */
    return (
        <Dialog
            isVisible = {stockModes.SELL_STOCK === currentMode}
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
                <ScrollView className = 'w-full h-[200px] space-y-2'>
                    {finances.stocks.map(({stock_name, stock_code, shares, id, icon}, index)=>(
                        <TouchableOpacity 
                            className = {`${selectedStock === index ? 'bg-[#0070ba]' : 'bg-slate-300'} flex-row justify-between items-center px-4 py-1 border-[1px] rounded-lg mr-4`}
                            onPress={()=>setSelectedStock(index)}
                        >
                            <View className = 'flex-row items-center justify-start space-x-2'>
                                <View className = 'w-10 h-10 rounded-full border-[0.5px] border-black overflow-hidden flex-row items-center justify-center bg-white'>
                                    {
                                        icon ? (
                                            <Image source={{uri: icon}} className = 'h-full w-full'/>     
                                        ) : (
                                            <Text>{stock_code}</Text>
                                        )
                                    }
                                </View>
                                <Text className = {`${selectedStock === index ? 'text-white' : 'text-black'} text-xl font-thin`}>{stock_code} {shares}x</Text>    
                            </View>
                            <Text className = {`${selectedStock === index ? 'text-white' : 'text-black'}`}>{dollarFormatter.format(finances.stockPrices[index])}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
                <View className = 'flex-row justify-start items-center space-x-1 h-[80px]'>
                    <Text className = 'text-xl w-16'>Qty: {quantity}</Text>
                    {selectedStock !== -1 && (
                        <View className = ''>
                            <TouchableOpacity 
                                className = ''
                                onPress={()=>{
                                    if (finances.stocks[selectedStock].shares >= quantity + 1) setQuantity(quantity + 1)
                                }}
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
                    )}
                </View>
            </View>
            <View className = 'flex-row justify-between items-center space-x-2 h-24'>
                <View className = 'flex-row items-center justify-start'>
                    <Text className = 'font-bold text-xl text-gray-600'>Total: </Text>
                    <Text className = 'text-xl font-thin'>{dollarFormatter.format(quantity * (selectedStock !== -1 ? finances.stockPrices[selectedStock] : 0))}</Text>
                </View>
                <ComponentLoader
                    title = 'Processing'
                    style = 'absolute self-end right-0 '
                    textStyle = ''
                    indicatorStyling = 'black'
                    loading = {loading}
                />
                <OperationButton
                    title = 'Sell'
                    style = {`${selectedStock === -1 ? 'opacity-30' : 'opacity-1'} `}
                    textStyle = ' px-6'
                    disabled = {selectedStock === -1}
                    clickAction = {async ()=>{
                        setLoading(true);
                        await sellShares(dispatch, finances.stocks[selectedStock].id, quantity, 1, finances.stockPrices[selectedStock])
                        setLoading(false);
                        setCurrentMode(stockModes.IDLE_MODE)
                    }}
                />
            </View>
        </Dialog>
    );
};

export default SellStockDialog;