import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import React, { createContext, useContext, useMemo, useState } from 'react'
import BackgroundImage from '../../components/BackgroundImage';
import DreamMeadowTitle from '../../components/DreamMeadowTitle';
import ScreenLoader from '../../components/ScreenLoader';
import PrimarySpeedDial from '../../components/PrimarySpeedDial';
import StatCard from '../../components/StatCard';
import { AppContext } from '../../context/AppContext';
import OperationButton from '../../components/OperationButton';
import { useNavigation } from '@react-navigation/native';
import NutrientsDisplay from './components/NutrientsDisplay';
import MealDisplay from './components/MealDisplay';
import ActivityDisplay from './components/ActivityDisplay';
import AlertChip from '../../components/AlertChip';
import * as dietTrackerHelper from '../../Helpers/dietTrackerHelper';
import EditUserStatsDialog from './components/EditUserStatsDialog';
import AddMealActivityDialog from './components/AddMealActivityDialog';
import { recipeModes } from '../../Constants/dietTrackerConstants';
import BackArrow from '../../components/BackArrow';
import PrimaryItemCard from '../../components/PrimaryItemCard';
import { Icon } from 'react-native-elements';
import RecipeButton from './components/RecipeButton';

/** Recipes context */
const recipesContext = createContext();

/**
 * @description Recipes Screen where user can view recipes
 * @returns {JSX.Element}
 */
const RecipesScreen = () => {
    /** Context Variables */
    const { dietTracker, dispatch, password } = useContext(AppContext);

    /** Navigation object */
    const navigation = useNavigation();

    /** Indicator whether an operation mode is active */
    const [operationMode, setOperationMode] = useState(recipeModes.IDLE_MODE);

    /** Status of operations */
    const [status, setStatus] = useState(null);
    
    /** Indicator that user-requested action is being conducted */
    const [loading, setLoading] = useState(false);

    /** Active recipe index */
    const [activeRecipeIndex, setActiveRecipeIndex] = useState(-1);

    /** Memoized speed dial actions */
    const speedDialActions = useMemo(()=>{
        /** Speed dial action data to add new activity or meal */
        const add = {icon: 'add', action: ()=> {
            navigation.navigate('RecipesAdd');
        }};

        /** Speed dial action data to edit user stats */
        const remove = {icon: 'remove', action: ()=> setOperationMode(operationMode === recipeModes.DELETE_MODE ? recipeModes.IDLE_MODE : recipeModes.DELETE_MODE)};

        /** Return computed speed dial actions */
        return [add, remove];
    }, [operationMode]);

    /** Render diet tracker title, stats, daily activities, and meals, as well as speed dial */
    return (
        <recipesContext.Provider
            value={{loading, setLoading, status, setStatus, operationMode, setOperationMode, activeRecipeIndex, setActiveRecipeIndex}}
        >
            <SafeAreaView>
                <View className = 'w-full h-full flex-col'>
                    <BackgroundImage imagePath = {require('../../images/diettrackerbg.jpg')} shade = 'bg-violet-950'/>
                    <DreamMeadowTitle
                        title = 'Recipes'
                        style = 'self-center'
                        textStyle = 'text-7xl pt-6 text-slate-200'
                    />
                    <BackArrow
                        style = 'absolute self-start m-2 z-30 '
                        colour = 'rgb(226, 232, 240)'
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
                    <ScrollView className = 'flex-grow flex-col mb-14 z-30'>
                        {dietTracker.recipes.map((recipe, index)=>(
                            <RecipeButton recipe = {recipe} index = {index} recipesContext = {recipesContext}/>
                        ))}
                    </ScrollView>
                    <PrimarySpeedDial
                        speedDialActions = {speedDialActions}
                    />
                </View>
            </SafeAreaView>    
        </recipesContext.Provider>
    );
};

export default RecipesScreen;