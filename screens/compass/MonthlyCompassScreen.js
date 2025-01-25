import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React, { createContext, useContext, useMemo, useRef, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import BackgroundImage from '../../components/BackgroundImage';
import { useNavigation } from '@react-navigation/native';
import StatCard from '../../components/StatCard';
import * as compassHelper from '../../Helpers/compassHelper';
import BackArrow from '../../components/BackArrow';
import OperationButton from '../../components/OperationButton';
import WeeklyCompassButton from './components/WeeklyCompassButton';

/**
 * @description Render all weekly compass's of given monthly compass 
 * @param {Object} route Route object
 * @returns {JSX.Element}
 */
const MonthlyCompassScreen = ({route}) => {
    /** Context Variables */
    const { compass, dispatch, password } = useContext(AppContext);

    /** Navigation object */
    const navigation = useNavigation();

    /** Memoized monthly compass and yearly compass Ids */
    const { monthlyCompassId, yearlyCompassId } = useMemo(()=>route.params, []);

    /** Extract yearly compass object */
    const monthlyCompass = useMemo(()=>{
        /** Return computed monthly compass */
        return compass.yearly_compasses.find(yearlyCompass => yearlyCompass.id === yearlyCompassId).monthly_compasses.find(monthlyCompass => monthlyCompass.id === monthlyCompassId);
    }, []);

    /** Memoized monthly compass stats */
    const { mistakes, hours, percentage } = useMemo(()=> compassHelper.computeMonthlyCompassStats(monthlyCompass), [monthlyCompass]);

    /** Memoized status indicator */
    const status = useMemo(()=> compassHelper.computeMonthlyCompassStatus(yearlyCompassId, monthlyCompass.id, compass), [monthlyCompass]);

    /** Render all destinations of active compass */
    return (
        <SafeAreaView>
            <View className = 'w-full h-full flex-col'>
                <BackArrow
                    style = 'absolute self-start m-2 z-30 '
                    colour = 'rgb(226, 232, 240)'
                />
                <BackgroundImage imagePath = {require('../../images/compassbg.heic')} shade = 'bg-violet-950'/>
                <View className = 'bg-primary-purple border-primary-lightPurple border-[1px] rounded-lg px-4 py-1 mb-1 mt-5 mx-14'>
                    <Text className = 'text-slate-200 text-lg text-center'>{`${monthlyCompass.name} Compass`}</Text>
                </View>
                <View className = 'flex-row flex-wrap justify-between mx-9'>
                    <StatCard title = 'Status' value = {status} style = 'm-1 w-40' valueStyle = 'text-sm' titleStyle = 'text-sm'/>
                    <StatCard title = 'Percentage' value = {`${percentage.toFixed(2)}%`} style = 'm-1 w-40' valueStyle = 'text-sm' titleStyle = 'text-sm'/>
                    <StatCard title = 'Hours' value = {`${hours}`} style = 'm-1 w-40' valueStyle = 'text-sm' titleStyle = 'text-sm'/>
                    <StatCard title = 'Mistakes' value = {`${mistakes}`} style = 'm-1 w-40' valueStyle = 'text-sm' titleStyle = 'text-sm'/>
                </View>
                <ScrollView className = 'flex-grow flex-col mb-2 z-30'>
                    {monthlyCompass.weekly_compasses.map((weeklyCompass)=>(
                        <WeeklyCompassButton
                            weeklyCompass = {weeklyCompass}
                            monthlyCompassId = {monthlyCompassId}
                            yearlyCompassId = {yearlyCompassId}
                        />
                    ))}
                </ScrollView>
                <OperationButton
                    title = 'View Destinations'
                    style = 'self-start bg-primary-purple ml-6 mb-4 z-30'
                    textStyle = 'text-lg'
                    clickAction = {()=>navigation.navigate('Destinations', {monthlyCompassId, yearlyCompassId, type: 'monthly'})}
                />
            </View>
        </SafeAreaView>    
    );
};

export default MonthlyCompassScreen;