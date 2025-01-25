import { View, Text } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../../context/AppContext';
import PrimaryItemCard from '../../../components/PrimaryItemCard';
import { Image } from 'expo-image';
import StatCard from '../../../components/StatCard';

/**
 * @description Meal view screen
 * @param {Object} dietTrackerContext Diet Tracker context
 * @returns {JSX.Element}
 */
const MealDisplay = ({dietTrackerContext}) => {
    /** Diet Tracker Context Variables */
    const { tabIndex } = useContext(dietTrackerContext);

    /** App Context Variables */
    const { dietTracker } = useContext(AppContext);

    /** Index of active meal */
    const [activeMealIndex, setActiveMealIndex] = useState(-1);

    /** Reset meal index upon change of tabs */
    useEffect(()=>{
        if (tabIndex === 0) setActiveMealIndex(-1);
    },[tabIndex]);

    /** Render all nutrients */
    return dietTracker.dailyTracker.meals.map((meal, index)=>(
        <PrimaryItemCard
            active = {index === activeMealIndex}
            clickAction = {()=>setActiveMealIndex(activeMealIndex === index ? -1 : index)}
        >
            <View className = 'p-1'>
                <View className = 'flex-col items-start'>
                    <Text className = 'text-slate-200 text-xl'>{meal.name}</Text>    
                    <Text className = 'text-slate-200 text-sm font-thin'>{meal.calories * meal.quantity} Cals</Text>
                </View>
                {index === activeMealIndex && (
                    <View className = 'my-2 flex-row flex-wrap'>
                        <StatCard title = {'Protein'} value = {`${meal.protein * meal.quantity}g`} style = 'my-0.5 mr-1 w-24' titleStyle = 'text-xs' valueStyle = 'text-xs'/>
                        <StatCard title = {'Fat'} value = {`${meal.fat * meal.quantity}g`} style = 'my-0.5 mr-1 w-24' titleStyle = 'text-xs' valueStyle = 'text-xs'/>
                        <StatCard title = {'Carbs'} value = {`${meal.carbs * meal.quantity}g`} style = 'my-0.5 mr-1 w-24' titleStyle = 'text-xs' valueStyle = 'text-xs'/>
                        <StatCard title = {'Sugar'} value = {`${meal.sugar * meal.quantity}g`} style = 'my-0.5 mr-1 w-24' titleStyle = 'text-xs' valueStyle = 'text-xs'/>
                        <StatCard title = {'Fibre'} value = {`${meal.fibre * meal.quantity}g`} style = 'my-0.5 mr-1 w-24' titleStyle = 'text-xs' valueStyle = 'text-xs'/>
                    </View>
                )}
            </View>
        </PrimaryItemCard>
    ))
};

export default MealDisplay;