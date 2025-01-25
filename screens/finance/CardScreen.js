import React, { useContext, useMemo } from 'react'
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import {Image} from 'expo-image'
import CreditCardDetails from './components/CreditCardDetails';
import DebitCardDetails from './components/DebitCardDetails';
import CardTransactions from './components/CardTransactions';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import BackArrow from '../../components/BackArrow';
import { AppContext } from '../../context/AppContext';

/**
 * @description Screen where user sees card information such as available balance, 
 * transactions, and display of card itself. Conditionally rendered based off card type
 * - Case: Credit Card -> Render available credits, limit, and amount owed
 * - Case: Debit Card -> Render available balance
 * @param {Object} props -> Props for the screen including cardImage, card object, and card type
 * @returns {JSX.Element}
 */
const CardScreen = (props) => {
    /**
     * @description Memoized parameters card image, card object, and card type to use in this screen
     */
    const { cardImage, cardId, type } = useMemo(()=>props.route.params,[]);

    /** Context Variables */
    const { finances } = useContext(AppContext);

    /** Active Card */
    const card = finances[type].find(({id})=>id === cardId);
    
    /**
     * @description Render the available balance in the debit card
     */
    return (
        <SafeAreaView>
            <LinearGradient
                colors={['#222222', '#141414','#6082B6']}
                className = 'h-full w-full flex-col'
            >
                <BackArrow colour = 'white'/>
                <View className = 'w-full h-fit self-center py-3'>
                    <Image source={cardImage} className = 'self-center w-[360px] h-[230px] border-white border-[1px] rounded-xl'/>
                </View>
                {type === 'creditCards' ? (
                    <CreditCardDetails card = {card}/>
                ) : (
                    <DebitCardDetails card = {card}/>
                )}
                <CardTransactions transactions = {card.transactions} type = {type}/>
            </LinearGradient>
        </SafeAreaView>
    );
};

export default CardScreen;