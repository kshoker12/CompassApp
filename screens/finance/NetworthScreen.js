import { View, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import React, { useContext, useEffect} from 'react'
import BackgroundImage from '../../components/BackgroundImage';
import CalgaryDemoTitle from '../../components/CalgaryDemoTitle';
import { AppContext } from '../../context/AppContext';
import NetworthChart from './components/NetworthChart';
import { useNavigation } from '@react-navigation/native';
import * as financesConstants from '../../Constants/financeConstants';

/**
 * @description Main screen for finance, displaying a breakdown of my networth, bank cards, and icon buttons to get to all features,
 * and an overall summary to my finances
 * @returns {JSX.Element}
 */
const NetworthScreen = () => {
    /**
     * @description Reference to navigation object to control navigation
     */
    const navigation = useNavigation();

    return (
        <SafeAreaView className = ''>
            <View className = 'w-full h-full flex flex-col '>
                <View className = 'h-[420px] w-full z-50'>
                    <CalgaryDemoTitle title={'Finances'} style='flex-row justify-center items-start z-20 ' textStyle = 'text-6xl pt-7 -mb-6 text-black'/>
                    <BackgroundImage imagePath = {require('../../images/networthbg.jpg')} shade = 'bg-orange-300'/>
                    <NetworthChart/>
                </View>
                <View className = 'p-0.5 flex-row space-x-0.5 justify-between w-full bg-primary-purple border-y-[1px] border-black'>
                    {financesConstants.BANKING_CARDS.map(({cardImage, screen, type, id})=>(
                        <TouchableOpacity 
                            className = 'w-[32.8%] h-20 rounded-md overflow-hidden shadow-lg shadow-black'
                            onPress={()=>navigation.navigate(screen, {cardId: id, cardImage, type})}
                        >
                            <Image source={cardImage} className = 'h-full w-full'/>
                        </TouchableOpacity>
                    ))}
                </View>    
                <View className = 'flex-grow'>
                    <BackgroundImage imagePath = {require('../../images/finances/networthbottombg.jpg')} shade = 'bg-amber-500'/>
                    <View className = 'z-50 flex-row flex-wrap flex-grow justify-between px-4'>
                        {financesConstants.FINANCE_FEATURES.map(({iconPath, screen})=>(
                            <TouchableOpacity 
                                className = 'overflow-hidden rounded-xl p-2 '
                                onPress={()=>navigation.navigate(screen)}
                            >
                                <Image source={iconPath} className = 'w-[96px] h-[100px]'/>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
};



export default NetworthScreen