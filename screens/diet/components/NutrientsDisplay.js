import { View, Text } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../../context/AppContext';
import PrimaryItemCard from '../../../components/PrimaryItemCard';
import { Image } from 'expo-image';

/**
 * @description Nutrients view screen
 * @param {Object} dietTrackerContext Diet Tracker context
 * @returns {JSX.Element}
 */
const NutrientsDisplay = ({dietTrackerContext}) => {
    /** Diet Tracker Context Variables */
    const { tabIndex } = useContext(dietTrackerContext);

    /** App Context Variables */
    const { dietTracker } = useContext(AppContext);

    /** Index of active nutrient */
    const [activeNutrientIndex, setActiveNutrientIndex] = useState(-1);

    /** Reset nutrient index upon change of tabs */
    useEffect(()=>{
        if (tabIndex === 2) setActiveNutrientIndex(-1);
    },[tabIndex]);

    /** Render all nutrients */
    return dietTracker.nutrients.map((nutrient, index)=>(
        <PrimaryItemCard
            active = {index === activeNutrientIndex}
            clickAction = {()=>setActiveNutrientIndex(activeNutrientIndex === index ? -1 : index)}
        >
            <View className = 'p-1'>
                <View className = 'flex-row items-center justify-between'>
                    <View className = 'flex-row items-center justify-center space-x-3'>
                        <Image source={{uri: nutrient.imageAddress}} className = 'h-12 w-12'/>
                        <Text className = 'text-slate-200 text-xl'>{nutrient.name}</Text>    
                    </View>
                    <Text className = 'text-slate-200 text-sm'>{`${nutrient.achieved}${nutrient.unit} / ${nutrient.limit}${nutrient.unit}`}</Text>
                </View>
                {index === activeNutrientIndex && (
                    <View className = 'my-2'>
                        <Text className = 'text-slate-200 font-thin'>{nutrient.purpose}</Text>
                    </View>
                )}
            </View>
        </PrimaryItemCard>
    ))
};

export default NutrientsDisplay;