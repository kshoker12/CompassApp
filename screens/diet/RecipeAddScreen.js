import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import React, { createContext, useContext, useMemo, useState } from 'react'
import BackgroundImage from '../../components/BackgroundImage';
import DreamMeadowTitle from '../../components/DreamMeadowTitle';
import ScreenLoader from '../../components/ScreenLoader';
import PrimarySpeedDial from '../../components/PrimarySpeedDial';
import { AppContext } from '../../context/AppContext';
import AlertChip from '../../components/AlertChip';
import { recipeModes } from '../../Constants/dietTrackerConstants';
import BackArrow from '../../components/BackArrow';
import PrimaryTextInput from '../../components/PrimaryTextInput';
import OperationButton from '../../components/OperationButton';
import StepsDisplay from './components/StepsDisplay';
import IngredientsDisplay from './components/IngredientsDisplay';
import StepsAddDialog from './components/StepAddDialog';
import IngredientsAddDialog from './components/IngredientAddDialog';
import { useNavigation } from '@react-navigation/native';
import * as dietTrackerHelper from '../../Helpers/dietTrackerHelper';

/** Recipes Add Context */
const recipesAddContext = createContext();

/**
 * @description Screen where user adds recipe
 * @param {Object} recipesContext Recipes context
 * @returns {JSX.Element}
 */
const RecipesAddScreen = () => {
    /** App Context Variables */
    const { dispatch, password, dietTracker } = useContext(AppContext);

    /** Navigation object */
    const navigation = useNavigation();
 
    /** Status of operations */
    const [status, setStatus] = useState(null);

    /** Indicator that user-requested action is being conducted */
    const [loading, setLoading] = useState(false);

    /** Indicator whether an operation mode is active */
    const [operationMode, setOperationMode] = useState(recipeModes.IDLE_MODE);

    /** Calories for new item */
    const [calories, setCalories] = useState('');

    /** Name for new item */
    const [name, setName] = useState('');

    /** Protein for new item */
    const [protein, setProtein] = useState('');

    /** Fat for new item */
    const [fat, setFat] = useState('');

    /** Fibre for new item */
    const [fibre, setFibre] = useState('');

    /** Sugar for new item */
    const [sugar, setSugar] = useState('');

    /** Carbs for new item */
    const [carbs, setCarbs] = useState('');

    /** Ingredients List */
    const [ingredientsList, setIngredientsList] = useState([]);

    /** Steps List */
    const [stepsList, setStepsList] = useState([]);

    /** Render add recipe title, back arrow and form for adding recipe */
    return (
        <recipesAddContext.Provider
            value={{setStepsList, setIngredientsList, setLoading, loading, operationMode, setOperationMode, setStatus, status, ingredientsList, stepsList}}
        >
            <SafeAreaView>
                <StepsAddDialog recipesAddContext = {recipesAddContext}/>
                <IngredientsAddDialog recipesAddContext = {recipesAddContext}/>
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
                    <View className = 'flex-col mx-6 space-y-2 z-30'>
                        <PrimaryTextInput
                            text = {name} 
                            setText = {setName}
                            placeholder = 'Name'
                        />
                        <View className = 'flex-row flex-wrap justify-between'>
                            <PrimaryTextInput
                                text = {calories}
                                setText = {setCalories}
                                placeholder = 'Cals'
                                keyboardType = 'numeric'
                                style = 'w-40 text-sm my-1 '
                            />   
                            <PrimaryTextInput
                                text = {carbs}
                                setText = {setCarbs}
                                placeholder = 'Carbs (g)'
                                keyboardType = 'numeric'
                                style = 'w-40 text-sm my-1 '
                            /> 
                            <PrimaryTextInput
                                text = {fat}
                                setText = {setFat}
                                placeholder = 'Fat (g)'
                                keyboardType = 'numeric'
                                style = 'w-40 text-sm my-1 '
                            /> 
                            <PrimaryTextInput
                                text = {protein}
                                setText = {setProtein}
                                placeholder = 'Protein (g)'
                                keyboardType = 'numeric'
                                style = 'w-40 text-sm my-1 '
                            /> 
                            <PrimaryTextInput
                                text = {fibre}
                                setText = {setFibre}
                                placeholder = 'Fibre (g)'
                                keyboardType = 'numeric'
                                style = 'w-40 text-sm my-1 '
                            /> 
                            <PrimaryTextInput
                                text = {sugar}
                                setText = {setSugar}
                                placeholder = 'Sugar (g)'
                                keyboardType = 'numeric'
                                style = 'w-40 text-sm my-1 '
                            /> 
                        </View>    
                    </View>
                    <IngredientsDisplay recipesAddContext = {recipesAddContext}/>
                    <StepsDisplay recipesAddContext = {recipesAddContext}/>
                    <OperationButton
                        title = 'Submit'
                        style = {`${([name.length, calories.length, fat.length, fibre.length, protein.length, sugar.length, carbs.length].includes(0) || stepsList.length === 0 || ingredientsList.length === 0) ? 'opacity-70' : 'opacity-1'} bg-primary-purple self-end mx-6 my-2 w-36 border-slate-200 z-30 disabled:opacity-30 `}
                        textStyle = 'text-center text-lg'
                        disabled = {[name.length, calories.length, fat.length, fibre.length, protein.length, sugar.length, carbs.length].includes(0) || stepsList.length === 0 || ingredientsList.length === 0}
                        clickAction = {async ()=>{
                            setLoading(true);
                            await dietTrackerHelper.createRecipe(
                                dispatch,
                                {
                                    name: name,
                                    meal: {
                                        name,
                                        calories,
                                        protein,
                                        fat,
                                        carbs,
                                        sugar,
                                        fibre
                                    },
                                    ingredients: ingredientsList,
                                    steps: stepsList
                                },
                                setStatus
                            );
                            setLoading(false);
                            navigation.goBack();
                        }}
                    />
                </View>
            </SafeAreaView>     
        </recipesAddContext.Provider>
    );
};

export default RecipesAddScreen;