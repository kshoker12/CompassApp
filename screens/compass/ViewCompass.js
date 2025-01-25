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
import PrimaryItemCard from '../../components/PrimaryItemCard';
import OperationButton from '../../components/OperationButton';
import IconButton from '../../components/IconButton';
import * as compassHelper from '../../Helpers/compassHelper';
import BackArrow from '../../components/BackArrow';
import YearlyCompassButton from './components/YearlyCompassButton';

/** View compass context */
const viewCompassContext = createContext();

/**
 * @description Render all yearly compass's 
 * @returns {JSX.Element}
 */
const ViewCompass = () => {
    /** Context Variables */
    const { compass, dispatch, password } = useContext(AppContext);

    /** Navigation object */
    const navigation = useNavigation();

    /** Indicator whether an operation mode is active */
    const [operationMode, setOperationMode] = useState(compassModes.IDLE_MODE);

    /** Status of operations */
    const [status, setStatus] = useState(null);
    
    /** Indicator that user-requested action is being conducted */
    const [loading, setLoading] = useState(false);

    /** Memoized total compass percentage */
    const compassPercentage = useMemo(()=>compassHelper.computeCompassPercentage(compass), [JSON.stringify(compass)]);
    
    /** Memoized compass mistakes and hours */
    const {mistakes, hours} = useMemo(()=>compassHelper.computeLifeTimeCompassStats(compass), [JSON.stringify(compass)]);

    /** Memoized speed dial actions */
    const speedDialActions = useMemo(()=>{
        /** Speed dial action data to finish week */
        const add = {icon: 'add', type: 'material', action: async ()=> {
            setLoading(true);
            const latestYear = compass.yearly_compasses[compass.yearly_compasses.length - 1].name;
            await compassHelper.generateYearlyCompass(dispatch, (parseFloat(latestYear) + 1).toString(), setStatus);
            setLoading(false);
        }};

        /** Speed dial action data to add mistake */
        const remove = {icon: 'remove', type: 'material', action: ()=> setOperationMode(viewCompassModes.REMOVE_MODE)};

        /** Return computed speed dial actions */
        return [add, remove];
    }, [operationMode]);

    /** Render all destinations of active compass */
    return (
        <viewCompassContext.Provider
            value={{loading, setLoading, setOperationMode, operationMode, status, setStatus}}
        >
            <SafeAreaView>
                <View className = 'w-full h-full flex-col'>
                    <BackArrow
                        style = 'absolute self-start m-2 z-30 '
                        colour = 'rgb(226, 232, 240)'
                    />
                    <BackgroundImage imagePath = {require('../../images/compassbg.heic')} shade = 'bg-violet-950'/>
                    <AlertChip
                        status = {status}
                        setStatus = {setStatus}
                        style = 'absolute z-50 bg-slate-200'
                        textStyle = 'text-white'
                        iconColor = '#e2e8f0'
                    />
                    <ScreenLoader
                        title = 'Loading...'
                        textStyle = 'text-white'
                        indicatorStyling = 'white'
                        style = 'absolute'
                        loading = {loading}
                    />
                    <View className = 'bg-primary-purple border-primary-lightPurple border-[1px] rounded-lg px-4 py-1 mb-1 mt-5 mx-14'>
                        <Text className = 'text-slate-200 text-lg text-center'>Karn's Compass</Text>
                    </View>
                    <View className = 'flex-row flex-wrap justify-between mx-9'>
                        <StatCard title = 'Defences' value = {compass.title_defences} style = 'm-1 w-40' valueStyle = 'text-sm' titleStyle = 'text-sm'/>
                        <StatCard title = 'Percentage' value = {`${compassPercentage.toFixed(2)}%`} style = 'm-1 w-40' valueStyle = 'text-sm' titleStyle = 'text-sm'/>
                        <StatCard title = 'Hours' value = {`${hours}`} style = 'm-1 w-40' valueStyle = 'text-sm' titleStyle = 'text-sm'/>
                        <StatCard title = 'Mistakes' value = {`${mistakes}`} style = 'm-1 w-40' valueStyle = 'text-sm' titleStyle = 'text-sm'/>
                    </View>
                    <ScrollView className = 'flex-grow flex-col mb-14 z-30'>
                        {compass.yearly_compasses.map(yearlyCompass => (
                            <YearlyCompassButton
                                yearlyCompass = {yearlyCompass}
                                viewCompassContext = {viewCompassContext}
                            />
                        ))}
                    </ScrollView>
                    <PrimarySpeedDial
                        speedDialActions = {speedDialActions}
                    />
                </View>
            </SafeAreaView>    
        </viewCompassContext.Provider>
    );
};

export default ViewCompass;