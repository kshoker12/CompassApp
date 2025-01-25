import { View, Text, TouchableOpacity } from 'react-native'
import React, { useContext, useState } from 'react'
import { AppContext } from '../../../context/AppContext';
import StatCard from '../../../components/StatCard';
import { Icon } from 'react-native-elements';
import DeleteConfirmationDialog from '../../../components/DeleteConfirmationDialog';
import { recipeModes } from '../../../Constants/dietTrackerConstants';
import * as dietTrackerHelper from '../../../Helpers/dietTrackerHelper';
import PrimaryItemCard from '../../../components/PrimaryItemCard';

/**
 * @description Recipe button to conduct operations on recipe
 * @param {Object} recipe Recipe for this button
 * @param {number} index Index of recipe
 * @param {Object} recipesContext Context of recipe
 * @returns {JSX.Element}
 */
const RecipeButton = ({recipe, index, recipesContext}) => {
    /** Context Variables */
    const { dispatch, password} = useContext(AppContext);

    /** Responsibility Context Variables */
    const { setLoading, operationMode, setStatus, setOperationMode, setActiveRecipeIndex, activeRecipeIndex} = useContext(recipesContext);
    
    /** Indicator whether delete confirmation prompt is active */
    const [deleteIndicator, setDeleteIndicator] = useState(false);

    /** Render Subtask button displaying subtask name and duration */
    return (
        <PrimaryItemCard
            active = {activeRecipeIndex === index}
            deleteMode = {operationMode === recipeModes.DELETE_MODE}
            clickAction = {()=>{
                if (operationMode === recipeModes.DELETE_MODE) {
                    setDeleteIndicator(true);
                } else setActiveRecipeIndex(activeRecipeIndex === index ? -1 : index)
            }}
        >
            <DeleteConfirmationDialog 
                setDeleteIndicator = {setDeleteIndicator} 
                deleteIndicator = {deleteIndicator}
                setStatus = {setStatus}
                successAction = {async ()=>{
                    setLoading(true);
                    await dietTrackerHelper.deleteRecipe(dispatch, recipe.id, setStatus);
                    setLoading(false);
                    setOperationMode(recipeModes.IDLE_MODE);
                }}
            />
            <View className = 'flex-col p-1'>
                <Text className = 'text-slate-200 text-xl'>{recipe.name}</Text>
                {index === activeRecipeIndex && (
                    <View className = 'flex-col '>
                        <View className = 'my-2 flex-row flex-wrap'>
                            <StatCard title = {'Protein'} value = {`${recipe.meal.protein}g`} style = 'my-0.5 mr-1 w-24' titleStyle = 'text-xs' valueStyle = 'text-xs'/>
                            <StatCard title = {'Fat'} value = {`${recipe.meal.fat}g`} style = 'my-0.5 mr-1 w-24' titleStyle = 'text-xs' valueStyle = 'text-xs'/>
                            <StatCard title = {'Carbs'} value = {`${recipe.meal.carbs}g`} style = 'my-0.5 mr-1 w-24' titleStyle = 'text-xs' valueStyle = 'text-xs'/>
                            <StatCard title = {'Sugar'} value = {`${recipe.meal.sugar}g`} style = 'my-0.5 mr-1 w-24' titleStyle = 'text-xs' valueStyle = 'text-xs'/>
                            <StatCard title = {'Fibre'} value = {`${recipe.meal.fibre}g`} style = 'my-0.5 mr-1 w-24' titleStyle = 'text-xs' valueStyle = 'text-xs'/>
                        </View>   
                        <View className = 'flex-col space-y-1 my-2'>
                            <Text className = 'text-slate-200'>Ingredients</Text>
                            {recipe.ingredients.map(ingredient => (
                                <View className = 'flex-row items-center space-x-1'>
                                    <Icon name='circle' size={5} color={'white'}/>
                                    <Text className = 'text-slate-200 font-thin'>{ingredient.name}</Text>
                                </View>
                            ))}
                        </View> 
                        <View className = 'flex-col space-y-1 my-2'>
                            <Text className = 'text-slate-200'>Steps</Text>
                            {recipe.steps.map((step, index) => (
                                <View className = 'flex-row items-center space-x-1'>
                                    <Text className = 'text-gray-400 font-semibold'>{index + 1}. </Text>
                                    <Text className = 'text-slate-200 font-thin'>{step.name}</Text>
                                </View>
                            ))}
                        </View> 
                        <TouchableOpacity className = 'self-end'>
                            <Icon name='edit' size={30} color={'white'}/>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </PrimaryItemCard> 
    )
};

export default RecipeButton;