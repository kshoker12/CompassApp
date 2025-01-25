import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import React, { useContext, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import { useNavigation } from '@react-navigation/native';
import BackgroundImage from '../../components/BackgroundImage';
import { LinearGradient } from 'expo-linear-gradient';
import VinaryTitle from '../../components/VinaryTitle';
import AssetChart from './components/AssetChart';
import BackArrow from '../../components/BackArrow';
import { dollarFormatter } from '../../Helpers/HelperFunctions';
import AssetViewDialog from './components/dialog/AssetViewDialog';

/**
 * @description Asset Screen where user can view their assets which is a static page
 * @returns {JSX.Element}
 */
const AssetsScreen = () => {
    /**
     * @description Context Variables
     */
    const { finances } = useContext(AppContext);

    /**
     * @description Index of selected asset
     */
    const [selectedIndex, setSelectedIndex] = useState(-1);

    /**
     * @description Render a pie chart of assets and each asset card with value and allow user
     * to sell an asset
     */
    return (
        <SafeAreaView className = 'w-full h-full'>
            <AssetViewDialog selectedIndex = {selectedIndex} setSelectedIndex = {setSelectedIndex}/>
            <View className = 'w-full h-full flex-col'>
                <BackArrow colour = 'white' style = 'absolute'/>
                <BackgroundImage imagePath = {require('../../images/finances/assetsbackground.jpg')} shade = 'bg-yellow-200'/>  
                <VinaryTitle title = 'Assets' style = 'self-center' textStyle = 'text-6xl text-white pt-8'/>
                <AssetChart/>   
                <ScrollView className = 'flex-grow space-y-2 mt-4 mx-10 z-50'>
                    {finances.assets.map(({name, value}, index)=>(
                        <TouchableOpacity
                            className = 'bg-white rounded-xl p-8 border-[2px] border-[#d1d5db]'
                            onPress={()=>setSelectedIndex(index)}
                        >
                            <View className = 'space-y-1'>
                                <Text className = 'text-xl font-thin text-gray-700'>{name}</Text>    
                                <Text className = 'font-semibold text-lg text-gray-500'>{dollarFormatter.format(value)}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default AssetsScreen;