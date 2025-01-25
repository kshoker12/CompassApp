import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import React, { createContext, useContext, useMemo, useState } from 'react'
import BackgroundImage from '../../components/BackgroundImage';
import DreamMeadowTitle from '../../components/DreamMeadowTitle';
import ScreenLoader from '../../components/ScreenLoader';
import { dietTrackerModes } from '../../Constants/dietTrackerConstants';
import PrimarySpeedDial from '../../components/PrimarySpeedDial';
import StatCard from '../../components/StatCard';
import { AppContext } from '../../context/AppContext';
import OperationButton from '../../components/OperationButton';
import { useNavigation } from '@react-navigation/native';
import PrimaryItemCard from '../../components/PrimaryItemCard';
import { Image } from 'expo-image';
import NutrientsDisplay from './components/NutrientsDisplay';
import MealDisplay from './components/MealDisplay';
import ActivityDisplay from './components/ActivityDisplay';
import AlertChip from '../../components/AlertChip';
import * as dietTrackerHelper from '../../Helpers/dietTrackerHelper';
import EditUserStatsDialog from './components/EditUserStatsDialog';
import AddMealActivityDialog from './components/AddMealActivityDialog';

/** Diet tracker context */
const dietTrackerContext = createContext();

/**
 * @description Diet tracker screen including meals, activities, nutrient, and personal stats
 * @returns {JSX.Element}
 */
const DietTrackerScreen = () => {
    /** Context Variables */
    const { dietTracker, dispatch, password } = useContext(AppContext);

    /** Navigation object */
    const navigation = useNavigation();
  
    /** Indicator of active tab */
    const [tabIndex, setTabIndex] = useState(0);

    /** Indicator whether an operation mode is active */
    const [operationMode, setOperationMode] = useState(dietTrackerModes.IDLE_MODE);

    /** Status of operations */
    const [status, setStatus] = useState(null);
    
    /** Indicator that user-requested action is being conducted */
    const [loading, setLoading] = useState(false);

    /** Memoized calories stats */
    const { caloriesIntake, caloriesBurned } = useMemo(()=>dietTrackerHelper.computeCaloriesStats(dietTracker.dailyTracker), [dietTracker]);

    /** Memoized speed dial actions */
    const speedDialActions = useMemo(()=>{
        /** Speed dial action data to add new activity or meal */
        const add = {icon: 'add', action: ()=> setOperationMode(dietTrackerModes.ADD_MODE)};

        /** Speed dial action data to edit user stats */
        const edit = {icon: 'edit', action: ()=> setOperationMode(dietTrackerModes.EDIT_MODE)};

        /** Speed diala ction data to reset diet tracker */
        const reset = {icon: 'repeat', action: async ()=>{
            setLoading(true);
            await dietTrackerHelper.resetDailyTracker(dispatch, setStatus);
            setLoading(false);
        }};

        /** Return computed speed dial actions */
        return [reset, add, edit];
    }, [operationMode]);

    /** Render diet tracker title, stats, daily activities, and meals, as well as speed dial */
    return (
        <dietTrackerContext.Provider
            value={{loading, setLoading, status, setStatus, operationMode, setOperationMode, tabIndex, setTabIndex}}
        >
            <SafeAreaView>
                <EditUserStatsDialog dietTrackerContext = {dietTrackerContext}/>
                <AddMealActivityDialog dietTrackerContext = {dietTrackerContext}/>
                <View className = 'w-full h-full flex-col'>
                    <BackgroundImage imagePath = {require('../../images/diettrackerbg.jpg')} shade = 'bg-violet-950'/>
                    <DreamMeadowTitle
                        title = 'Diet Tracker'
                        style = 'self-center'
                        textStyle = 'text-7xl pt-6 text-slate-200'
                    />
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
                    <View className = 'flex-row flex-wrap justify-center -mt-4'>
                        <StatCard title = 'Weight' value = {`${dietTracker.dailyTracker.weight}lbs`} style = 'm-1 w-40' valueStyle = 'text-sm' titleStyle = 'text-sm'/>
                        <StatCard title = 'Goal' value = {`${dietTracker.dailyTracker.calories_goal} Cals`} style = 'm-1 w-40' valueStyle = 'text-sm' titleStyle = 'text-sm'/>
                        <StatCard title = 'Intake' value = {`${caloriesIntake} Cals`} style = 'm-1 w-40' valueStyle = 'text-sm' titleStyle = 'text-sm'/>
                        <StatCard title = 'Burned' value = {`${caloriesBurned} Cals`} style = 'm-1 w-40' valueStyle = 'text-sm' titleStyle = 'text-sm'/>
                    </View>
                    <View className = 'flex-row items-center justify-between mx-8 my-2 z-30'>
                        {['Meals', 'Activities', 'Nutrients'].map((tab, index)=>(
                            <TouchableOpacity
                                className = {`${tabIndex === index ? 'bg-primary-lightPurple' : 'bg-alt-purple'} rounded-lg px-4 py-1 border-primary-purple border-[1px] w-28`}
                                onPress={()=>setTabIndex(index)}
                            >   
                                <Text className = 'text-slate-200 text-base text-center'>{tab}</Text>
                            </TouchableOpacity>
                        ))}   
                    </View>
                    <ScrollView className = 'flex-grow mb-2 z-50'>
                        {tabIndex === 0 ? (
                            <MealDisplay dietTrackerContext = {dietTrackerContext}/>
                        ) : tabIndex === 1 ? (
                            <ActivityDisplay dietTrackerContext = {dietTrackerContext}/>
                        ) : (
                            <NutrientsDisplay dietTrackerContext = {dietTrackerContext}/>
                        )}
                    </ScrollView>
                    <OperationButton
                        title = 'Recipes'
                        style = 'self-start ml-6 mb-4 bg-primary-purple border-primary-lightPurple w-40 z-50'
                        textStyle = 'text-lg text-center'
                        clickAction = {()=>navigation.navigate('Recipes')}
                    />
                    <PrimarySpeedDial
                        speedDialActions = {speedDialActions}
                    />
                </View>
            </SafeAreaView>    
        </dietTrackerContext.Provider>
    );
};

export default DietTrackerScreen;