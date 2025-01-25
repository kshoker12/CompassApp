import { useNavigation } from '@react-navigation/native';
import React, { useContext, useMemo } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { computeMonthlyCompassStats, isMonthlyCompassCompleted } from '../../../Helpers/compassHelper';
import { LinearGradient } from 'expo-linear-gradient';

/**
 * @description Weekly compass button
 * @param {Object} weeklyCompass Weekly compass object
 * @param {number} monthlyCompassId Id of Monthly compass
 * @param {number} yearlyCompassId Id of yearly compass which the given monthly compass is located in
 * @returns {JSX.Element}
 */
const WeeklyCompassButton = ({weeklyCompass, monthlyCompassId, yearlyCompassId}) => {
    /** Navigation object */
    const navigation = useNavigation();

    /** Render weekly compass button to navigate to monthly compass page */
    return (
        <TouchableOpacity
            className = 'border-primary-lightPurple border-[1px] mx-6 opacity-90 rounded-xl my-2 overflow-hidden mb-2'
            onPress={()=>navigation.navigate('WeeklyCompass', {weeklyCompassId: weeklyCompass.id, monthlyCompassId, yearlyCompassId})}
        >
            <LinearGradient
                colors={['#2c2e45', (weeklyCompass.completed ? '#4f6962' : '#6b21a8'), 'black']}
                start={{x: 0.1, y: 0}}
                end={{x: 1, y: 1}}
                className = 'py-1 px-4'
            >
                <Text className = 'text-slate-200 text-2xl font-thin'>{weeklyCompass.name}</Text>  
                <View className = 'flex-row justify-between items-center'>
                    <Text className = 'text-slate-200 font-semibold text-base'>{`${weeklyCompass.hours} ${weeklyCompass.hours === 1 ? 'Hour' : 'Hours'}`}</Text>
                    <Text className = 'text-slate-200 font-semibold text-base'>{`${weeklyCompass.percentage.toFixed(1)}%`}</Text>   
                </View>
            </LinearGradient>
        </TouchableOpacity>
    );
};

export default WeeklyCompassButton