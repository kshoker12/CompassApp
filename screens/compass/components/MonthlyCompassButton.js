import { useNavigation } from '@react-navigation/native';
import React, { useContext, useMemo } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { computeMonthlyCompassStats, isMonthlyCompassCompleted } from '../../../Helpers/compassHelper';
import { LinearGradient } from 'expo-linear-gradient';

/**
 * @description Monthly compass button
 * @param {Object} monthlyCompass Monthly compass object
 * @param {number} yearlyCompassId Id of yearly compass which the given monthly compass is located in
 * @returns {JSX.Element}
 */
const MonthlyCompassButton = ({monthlyCompass, yearlyCompassId}) => {
    /** Navigation object */
    const navigation = useNavigation();

    /** Compute memoized monthly compass status */
    const completed = useMemo(()=>isMonthlyCompassCompleted(monthlyCompass), [monthlyCompass]);

    /** Memoized monthly compass stats */
    const { hours, percentage } = useMemo(()=> computeMonthlyCompassStats(monthlyCompass), [monthlyCompass]);

    /** Render monthly compass button to navigate to monthly compass page */
    return (
        <TouchableOpacity
            className = 'border-primary-lightPurple border-[1px] mx-6 opacity-90 rounded-xl my-2 overflow-hidden mb-2'
            onPress={()=>navigation.navigate('MonthlyCompass', {monthlyCompassId: monthlyCompass.id, yearlyCompassId: yearlyCompassId})}
        >
            <LinearGradient
                colors={['#2c2e45', (completed ? '#4f6962' : '#6b21a8'), 'black']}
                start={{x: 0.1, y: 0}}
                end={{x: 1, y: 1}}
                className = 'py-1 px-4'
            >
                <Text className = 'text-slate-200 text-2xl font-thin'>{monthlyCompass.name}</Text>  
                <View className = 'flex-row justify-between items-center'>
                    <Text className = 'text-slate-200 font-semibold text-base'>{`${hours} ${hours === 1 ? 'Hour' : 'Hours'}`}</Text>
                    <Text className = 'text-slate-200 font-semibold text-base'>{`${percentage.toFixed(1)}%`}</Text>   
                </View>
            </LinearGradient>
        </TouchableOpacity>
    );
};

export default MonthlyCompassButton