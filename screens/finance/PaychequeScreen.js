import { View, Text, SafeAreaView, TextInput, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext';
import { LinearGradient } from 'expo-linear-gradient';
import Paycheque from './components/Paycheque';
import BackArrow from '../../components/BackArrow';
import VinaryTitle from '../../components/VinaryTitle';
import PaychequeStatic from './components/PaychequeStatic';

/**
 * @description Paycheque screen to add paycheques 
 * @param {Object} route -> Route object
 * @returns {JSX.Element}
 */
const PaychequeScreen = ({route}) => {
    /**
     * @description Context Variables
     */
    const { finances } = useContext(AppContext);

    /**
     * @description Render Paycheque and list of previous paycheque
     */
    return (
        <SafeAreaView>
            <View className = 'w-full h-full'>
                <LinearGradient
                    // colors={['#DAA06D', '#E97451']}
                    colors={['#B2BEB5', 'grey']}
                    className = 'w-full h-full flex-col'
                    start={{x: 0.2, y: 0.3}}
                    end={{x: 0.4, y: 0.5}}
                >
                    <BackArrow colour = {'black'} style = 'absolute'/>
                    <VinaryTitle title = 'Pay-cheque' style = 'my-2 self-center' textStyle = 'text-5xl pt-4 text-black'/>
                    <Paycheque route = {route}/>
                    <View className = 'mt-4 self-center'>
                        <Text className = 'text-4xl text-black font-thin'>History</Text>    
                    </View>
                    <ScrollView className = 'w-full flex-grow'>
                        {[...finances.paycheques].reverse().map((paycheque)=>(
                            <PaychequeStatic paycheque = {paycheque}/>
                        ))}
                    </ScrollView>
                </LinearGradient>
            </View>
        </SafeAreaView>
    );
};

export default PaychequeScreen;