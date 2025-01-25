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
import WeeklyCompassButton from './components/WeeklyCompassButton';

/**
 * @description Render all destinations of weekly compass
 * @param {Object} route Route object
 * @returns {JSX.Element}
 */
const WeeklyCompassScreen = ({route}) => {
    /** Context Variables */
    const { compass, dispatch, password } = useContext(AppContext);

    /** Navigation object */
    const navigation = useNavigation();

    /** Memoized weekly compass, monthly compass, and yearly compass Ids */
    const { weeklyCompassId, monthlyCompassId, yearlyCompassId } = useMemo(()=>route.params, []);

    /** State variable indicating active destination index */
    const [destinationIndex, setDestinationIndex] = useState(-1);

    /** Extract weekly compass object */
    const weeklyCompass = useMemo(()=>{
        /** Return computed weekly compass */
        return compass.yearly_compasses.find(yearlyCompass => yearlyCompass.id === yearlyCompassId).monthly_compasses.find(monthlyCompass => monthlyCompass.id === monthlyCompassId).weekly_compasses.find(weeklyCompass => weeklyCompass.id === weeklyCompassId);
    }, []);

    /** Memoized status indicator */
    const status = useMemo(()=> compassHelper.computeWeeklyCompassStatus(yearlyCompassId, monthlyCompassId, weeklyCompassId, compass), [weeklyCompass]);

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
                    <Text className = 'text-slate-200 text-lg text-center'>{`${weeklyCompass.name} Compass`}</Text>
                </View>
                <View className = 'flex-row flex-wrap justify-between mx-9'>
                    <StatCard title = 'Status' value = {status} style = 'm-1 w-40' valueStyle = 'text-sm' titleStyle = 'text-sm'/>
                    <StatCard title = 'Percentage' value = {`${weeklyCompass.percentage.toFixed(2)}%`} style = 'm-1 w-40' valueStyle = 'text-sm' titleStyle = 'text-sm'/>
                    <StatCard title = 'Hours' value = {`${weeklyCompass.hours}`} style = 'm-1 w-40' valueStyle = 'text-sm' titleStyle = 'text-sm'/>
                    <StatCard title = 'Mistakes' value = {`${(3 - weeklyCompass.mistakes)}`} style = 'm-1 w-40' valueStyle = 'text-sm' titleStyle = 'text-sm'/>
                </View>
                <ScrollView className = 'flex-grow flex-col mb-2 z-30'>
                    {weeklyCompass.weekly_destinations.map((destination, index)=>(
                        <PrimaryItemCard
                            active = {destinationIndex === index}
                            clickAction = {()=>setDestinationIndex(index === destinationIndex ? -1 : index)}
                            complete = {destination.earned !== -1}
                        >
                            <View className = 'flex-col p-2'>
                                <View className = 'flex-row justify-between items-center'>
                                    <Text className = 'text-slate-200 text-xl'>{destination.name}</Text>
                                    <Text className = 'text-slate-200 text-lg font-thin'>{`${destination.earned !== -1 ? `${destination.earned} / ${destination.points}` : `${destination.points}`} Pts`}</Text>
                                </View>
                                {destinationIndex === index && (
                                    <View className = 'my-2 flex-col'>
                                        <View className = ''>
                                            <Text className = 'text-slate-200 font-thin'>{destination.notes}</Text>
                                        </View>    
                                    </View>
                                )}
                            </View>
                        </PrimaryItemCard>
                    ))}
                </ScrollView>
            </View>
        </SafeAreaView>    
    );
};

export default WeeklyCompassScreen;