import { View, Text, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native'
import { Image } from 'expo-image';
import React, { useContext, useState } from 'react'
import BackArrow from '../../components/BackArrow';
import { LinearGradient } from 'expo-linear-gradient';
import CalgaryTitle from '../../components/CalgaryDemoTitle';
import StockChart from './components/StockChart';
import { AppContext } from '../../context/AppContext';
import { dollarFormatter } from '../../Helpers/HelperFunctions';
import { stockModes } from '../../Constants/financeConstants';
import BuyStockDialog from './components/dialog/BuyStockDialog';
import SellStockDialog from './components/dialog/SellStockDialog';

/**
 * @description Stock screen where user can view portfolio and buy and sell stocks
 * @returns {JSX.Element}
 */
const StocksScreen = () => {
    /** Context Variables */
    const { finances } = useContext(AppContext);

    /** State variable determining operation mode of stocks screen */
    const [currentMode, setCurrentMode] = useState(stockModes.IDLE_MODE);

    /** Render pie chart of breakdown of stocks, button to buy or sell stocks and list of
    owned stocks */
    return (
        <SafeAreaView className = 'w-full h-full'>
            <View className = 'w-full h-full'>
                <LinearGradient
                    colors={['#50C878', '#AFE1AF', '#478778']}
                    start={{x: 0.8, y: 0}}
                    end={{x: 0.4, y: 0.7}}
                    className = 'w-full h-full flex-col z-50'
                >
                    <SellStockDialog currentMode = {currentMode} setCurrentMode = {setCurrentMode}/>
                    <BuyStockDialog currentMode = {currentMode} setCurrentMode = {setCurrentMode}/>
                    <BackArrow colour = 'rgb(22, 101, 52)' style = 'absolute'/>
                    <CalgaryTitle title = 'Stocks' style = 'self-center' textStyle = 'text-5xl pt-6 text-green-800'/>
                    <StockChart/>
                    <View className = 'flex-row justify-start items-center mx-6 -mt-8 z-50 space-x-4'>
                        <TouchableOpacity 
                            className = 'rounded-xl border-[1px] border-white shadow-2xl shadow-blue-950 w-20'
                            onPress={()=>setCurrentMode(stockModes.BUY_STOCK)}
                        >
                            <LinearGradient
                                colors={['rgb(103, 232, 249)', '#00A36C', 'rgb(22, 101, 52)']}
                                className = 'rounded-xl px-4 py-1'
                            >
                                <Text className = 'text-white text-xl text-center'>Buy</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            className = 'rounded-xl w-20 border-[1px] border-white shadow-2xl shadow-blue-950'
                            onPress={()=>setCurrentMode(stockModes.SELL_STOCK)}
                        >
                            <LinearGradient
                                colors = {['#90EE90', 'rgb(239, 68, 68)', 'rgb(153, 27, 27)']}
                                className = 'rounded-xl px-4 py-1'
                            >
                                <Text className = 'text-white text-xl text-center'>Sell</Text>  
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                    <ScrollView className = 'flex-grow w-full mt-4 z-50 space-y-2'>
                        {finances.stocks.map(({stock_code, stock_name, shares, id, icon}, index)=>(
                            <TouchableOpacity 
                                className = 'bg-green-800 p-4 mx-6 rounded-xl border-[1px] border-white'
                            >
                                <View className = 'flex-row space-x-4 justify-start items-center'>
                                    <View className = 'rounded-full w-20 h-20 overflow-hidden flex-row items-center justify-center border-[0.5px] border-white'>
                                        {icon ? (
                                            <Image source={{uri: icon }} className = 'w-full h-full'/>
                                        ) : (
                                            <View className = 'bg-white w-full h-full items-center justify-center'>
                                                <Text className = 'text-xl bg-white text-center'>{stock_code}</Text>
                                            </View>
                                        )}
                                    </View>
                                    <View className = 'space-y-1 flex-col'>
                                        <Text className = 'text-white text-base font-thin w-[200px]'>{stock_name}</Text>
                                        <Text className = 'text-white text-xl'>{stock_code} {shares}x</Text>    
                                        <Text className = 'font-semibold text-sm text-slate-200'>{dollarFormatter.format(finances.stockPrices[index])}</Text>
                                    </View>    
                                </View>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </LinearGradient>
            </View>
        </SafeAreaView>
    )
}

export default StocksScreen;