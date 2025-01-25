import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import BackgroundImage from '../../components/BackgroundImage';
import { useNavigation } from '@react-navigation/native';
import AlertChip from '../../components/AlertChip';
import ScreenLoader from '../../components/ScreenLoader';
import DreamMeadowTitle from '../../components/DreamMeadowTitle';
import { compassModes } from '../../Constants/compassConstants';
import PrimarySpeedDial from '../../components/PrimarySpeedDial';
import StatCard from '../../components/StatCard';
import { decrementMistakes, extractActiveCompass, generateYearlyCompass } from '../../Helpers/compassHelper';
import PrimaryItemCard from '../../components/PrimaryItemCard';
import OperationButton from '../../components/OperationButton';
import IconButton from '../../components/IconButton';
import WeeklyDestinationEditDialog from './components/WeeklyDestinationEditDialog';
import FinishWeekDialog from './components/FinishWeekDialog';

/** Compass context */
const compassContext = createContext();

/**
 * @description Render Compass screen including all destinations of active compass
 * @returns {JSX.Element}
 */
const CompassScreen = () => {
    /** Context Variables */
    const { compass, dispatch, password } = useContext(AppContext);

    /** Navigation object */
    const navigation = useNavigation();

    /** Indicator of active tab */
    const [tabIndex, setTabIndex] = useState(0);

    /** Indicator whether an operation mode is active */
    const [operationMode, setOperationMode] = useState(compassModes.IDLE_MODE);

    /** Status of operations */
    const [status, setStatus] = useState(null);
    
    /** Indicator that user-requested action is being conducted */
    const [loading, setLoading] = useState(false);

    /** Active destination index */
    const [destinationIndex, setDestinationIndex] = useState(-1);

    /** Carousel ref */
    const carouselRef = useRef();

    /** Compute active weekly compass */
    const activeCompass = useMemo(()=>{
        const active = extractActiveCompass(compass);
        if (active !== null) return active; else {
            generateYearlyCompass(dispatch, parseInt(compass.yearly_compasses[compass.yearly_compasses.length - 1].name)+1, setStatus);
        };
    }, [compass]);

    /** Memoized speed dial actions */
    const speedDialActions = useMemo(()=>{
        /** Speed dial action data to finish week */
        const finish = {icon: 'checkmark-circle', type: 'ionicon', action: ()=> setOperationMode(compassModes.FINISH_MODE)};

        /** Speed dial action data to add mistake */
        const mistake = {icon: 'close-circle', type: 'ionicon', action: async ()=> {
            setLoading(true);
            await decrementMistakes(dispatch, activeCompass.id, setStatus);
            setLoading(false);
        }};

        /** Return computed speed dial actions */
        return [finish, mistake];
    }, [operationMode]);

    /** Render all destinations of active compass */
    return (
        <compassContext.Provider
            value={{loading, setLoading, setOperationMode, operationMode, status, setStatus, destinationIndex, setDestinationIndex, activeCompass, carouselRef}}
        >
            <SafeAreaView>
                <FinishWeekDialog compassContext = {compassContext} />
                <WeeklyDestinationEditDialog compassContext = {compassContext} />
                <View className = 'w-full h-full flex-col'>
                    <BackgroundImage imagePath = {require('../../images/compassbg.heic')} shade = 'bg-violet-950'/>
                    <DreamMeadowTitle title = 'Compass' style = 'self-center' textStyle = 'text-slate-200 text-7xl pt-6'/>
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
                    <View className = 'bg-primary-purple border-primary-lightPurple border-[1px] rounded-lg px-4 py-1 mb-1 mx-10'>
                        <Text className = 'text-slate-200 text-lg text-center'>{activeCompass.name}</Text>
                    </View>
                    <View className = 'flex-row flex-wrap justify-between mx-9'>
                        <StatCard title = 'Status' value = {'Active'} style = 'm-1 w-40' valueStyle = 'text-sm' titleStyle = 'text-sm'/>
                        <StatCard title = 'Percentage' value = {`${activeCompass.percentage}%`} style = 'm-1 w-40' valueStyle = 'text-sm' titleStyle = 'text-sm'/>
                        <StatCard title = 'Mistakes' value = {`${activeCompass.mistakes} Available`} style = 'm-1 w-40' valueStyle = 'text-sm' titleStyle = 'text-sm'/>
                        <StatCard title = 'Hours' value = {`${activeCompass.hours}`} style = 'm-1 w-40' valueStyle = 'text-sm' titleStyle = 'text-sm'/>
                    </View>
                    <ScrollView className = 'flex-grow flex-col mb-6 z-30'>
                        {activeCompass.weekly_destinations.map((destination, index)=>(
                            <PrimaryItemCard
                                active = {destinationIndex === index}
                                clickAction = {()=>setDestinationIndex(index === destinationIndex ? -1 : index)}
                            >
                                <View className = 'flex-col p-2'>
                                    <View className = 'flex-row justify-between items-center'>
                                        <Text className = 'text-slate-200 text-xl'>{destination.name}</Text>
                                        <Text className = 'text-slate-200 text-lg font-thin'>{`${destination.points} pts`}</Text>
                                    </View>
                                    {destinationIndex === index && (
                                        <View className = 'my-2 flex-col'>
                                            <View className = ''>
                                                <Text className = 'text-slate-200 font-thin'>{destination.notes}</Text>
                                            </View>    
                                            <View className = 'flex-col items-center justify-center w-12 m-2 self-end'>
                                                <IconButton
                                                    className = 'bg-primary-darkPurple border-primary-lightPurple p-2.5'
                                                    icon = 'pen'
                                                    type = 'font-awesome'
                                                    solid = {'true'}
                                                    color = '#e2e8f0'
                                                    onPress = {()=>setOperationMode(compassModes.EDIT_MODE)}
                                                />    
                                            </View>
                                        </View>
                                    )}
                                </View>
                            </PrimaryItemCard>
                        ))}
                    </ScrollView>
                    <OperationButton
                        title = 'View Compass'
                        style = 'bg-primary-purple border-primary-lightPurple self-start left-6 bottom-4 z-30'
                        textStyle = 'text-center text-lg w-32'
                        clickAction = {()=>navigation.navigate('ViewCompass')}
                    />
                    <PrimarySpeedDial
                        speedDialActions = {speedDialActions}
                    />
                </View>
            </SafeAreaView>    
        </compassContext.Provider>
    );
};

export default CompassScreen;