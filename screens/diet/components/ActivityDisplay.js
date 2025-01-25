import { View, Text } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../../context/AppContext';
import PrimaryItemCard from '../../../components/PrimaryItemCard';
import { Image } from 'expo-image';
import StatCard from '../../../components/StatCard';

/**
 * @description Activity view screen
 * @param {Object} dietTrackerContext Diet Tracker context
 * @returns {JSX.Element}
 */
const ActivityDisplay = ({dietTrackerContext}) => {
    /** App Context Variables */
    const { dietTracker } = useContext(AppContext);

    /** Render all activities */
    return dietTracker.dailyTracker.activities.map((activity, index)=>(
        <PrimaryItemCard
            active = {false}
            clickAction = {()=>{}}
        >
            <View className = 'p-1'>
                <View className = 'flex-col items-start'>
                    <Text className = 'text-slate-200 text-xl'>{activity.name}</Text>    
                    <Text className = 'text-slate-200 font-thin'>{`${activity.calories} Cals`}</Text>
                </View>
            </View>
        </PrimaryItemCard>
    ))
};

export default ActivityDisplay;