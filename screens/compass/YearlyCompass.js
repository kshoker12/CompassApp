import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React, { createContext, useContext, useMemo, useRef, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import BackgroundImage from '../../components/BackgroundImage';
import { useNavigation } from '@react-navigation/native';
import AlertChip from '../../components/AlertChip';
import ScreenLoader from '../../components/ScreenLoader';
import DreamMeadowTitle from '../../components/DreamMeadowTitle';
import { compassModes, viewCompassModes } from '../../Constants/compassConstants';
import PrimarySpeedDial from '../../components/PrimarySpeedDial';
import StatCard from '../../components/StatCard';
import * as compassHelper from '../../Helpers/compassHelper';
import BackArrow from '../../components/BackArrow';
import YearlyCompassButton from './components/YearlyCompassButton';
import PrimaryItemCard from '../../components/PrimaryItemCard';
import MonthlyCompassButton from './components/MonthlyCompassButton';
import OperationButton from '../../components/OperationButton';

/** View yearly compass context */
const viewYearlyCompassContext = createContext();

/**
 * @description Render all Monthly compass's of given yearly compass 
 * @param {Object} route Route object
 * @returns {JSX.Element}
 */
const YearlyCompass = ({route}) => {
    /** Context Variables */
    const { compass, dispatch, password } = useContext(AppContext);

    /** Navigation object */
    const navigation = useNavigation();

    /** Extract yearly compass object */
    const yearlyCompass = useMemo(()=>compass.yearly_compasses.find(yearlyCompass => yearlyCompass.id === route.params.yearlyCompassId), []);

    /** Memoized yearly compass percentage */
    const percentage = useMemo(()=>compassHelper.computeYearlyCompassPercentage(yearlyCompass), [yearlyCompass]);

    /** Memoized status indicator */
    const status = useMemo(()=> compassHelper.computeYearlyCompassStatus(yearlyCompass.id, compass), [yearlyCompass]);

    /** Memoized mistakes */
    const mistakes = useMemo(()=>compassHelper.computeYearlyCompassMistakes(yearlyCompass), [yearlyCompass])

    /** Memoized completed hours */
    const hours = useMemo(()=> compassHelper.computeYearlyCompassHours(yearlyCompass), [yearlyCompass]);

    /** Render all destinations of active compass */
    return (
        <viewYearlyCompassContext.Provider
            value={{yearlyCompass}}
        >
            <SafeAreaView>
                <View className = 'w-full h-full flex-col'>
                    <BackArrow
                        style = 'absolute self-start m-2 z-30 '
                        colour = 'rgb(226, 232, 240)'
                    />
                    <BackgroundImage imagePath = {require('../../images/compassbg.heic')} shade = 'bg-violet-950'/>
                    <View className = 'bg-primary-purple border-primary-lightPurple border-[1px] rounded-lg px-4 py-1 mb-1 mt-5 mx-14'>
                        <Text className = 'text-slate-200 text-lg text-center'>{`${yearlyCompass.name} Compass`}</Text>
                    </View>
                    <View className = 'flex-row flex-wrap justify-between mx-9'>
                        <StatCard title = 'Status' value = {status} style = 'm-1 w-40' valueStyle = 'text-sm' titleStyle = 'text-sm'/>
                        <StatCard title = 'Percentage' value = {`${percentage.toFixed(2)}%`} style = 'm-1 w-40' valueStyle = 'text-sm' titleStyle = 'text-sm'/>
                        <StatCard title = 'Hours' value = {`${hours}`} style = 'm-1 w-40' valueStyle = 'text-sm' titleStyle = 'text-sm'/>
                        <StatCard title = 'Mistakes' value = {`${mistakes}`} style = 'm-1 w-40' valueStyle = 'text-sm' titleStyle = 'text-sm'/>
                    </View>
                    <ScrollView className = 'flex-grow flex-col mb-2 z-30'>
                       {yearlyCompass.monthly_compasses.map((monthlyCompass, index)=>(
                            <MonthlyCompassButton
                                monthlyCompass = {monthlyCompass}
                                yearlyCompassId = {yearlyCompass.id}
                            />
                       ))}
                    </ScrollView>
                    <OperationButton
                        title = 'View Destinations'
                        style = 'self-start bg-primary-purple ml-6 mb-4 z-30'
                        textStyle = 'text-lg'
                        clickAction = {()=>navigation.navigate('Destinations', {yearlyCompassId: yearlyCompass.id, type: 'yearly'})}
                    />
                </View>
            </SafeAreaView>    
        </viewYearlyCompassContext.Provider>
    );
};

export default YearlyCompass;