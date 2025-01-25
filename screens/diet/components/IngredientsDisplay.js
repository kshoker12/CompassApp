import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useContext, useState } from 'react'
import PrimarySpeedDial from '../../../components/PrimarySpeedDial';
import { Icon } from 'react-native-elements';
import { recipeAddModes } from '../../../Constants/dietTrackerConstants';

/**
 * @description View display of ingredients
 * @param {Object} recipesAddContext Recipes Add Context
 * @returns {JSX.Element}
 */
const IngredientsDisplay = ({recipesAddContext}) => {
    /** Recipes Add Context Variables */
    const { operationMode, setOperationMode, ingredientsList, setIngredientsList } = useContext(recipesAddContext);

    /** Render steps to create this recipe */
    return (
        <View className = 'flex-col bg-primary-darkPurple my-1 border-slate-200 h-52 mx-6 border-[1px] rounded-lg z-30'>
            <Text className = 'text-gray-400 text-lg mx-4 my-2'>Ingredients</Text>
            <ScrollView className = 'flex-grow mb-4 space-y-1'>
                {ingredientsList.map(({name}, index)=>(
                    <TouchableOpacity
                        className = {`mx-4 mr-16 ${operationMode === recipeAddModes.REMOVE_INGREDIENT && 'bg-blood-500'} border-primary-lightPurple border-b-[1px] px-2 py-1 flex-row items-center space-x-1`}
                        onPress={()=>{
                            if (operationMode === recipeAddModes.REMOVE_INGREDIENT) {
                                setIngredientsList((prevList)=>prevList.filter((_, prevIndex)=> prevIndex !== index));
                                setOperationMode(recipeAddModes.IDLE_MODE);
                            };
                        }}
                    >
                        <Icon name='circle' size={5} color={'white'}/>
                        <Text className = 'text-slate-200 text-xs'>{`${name}`}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            <PrimarySpeedDial
                speedDialActions = {[{icon: 'add', action: ()=>setOperationMode(recipeAddModes.ADD_INGREDIENT)}, {icon: 'remove', action: ()=>setOperationMode(operationMode === recipeAddModes.REMOVE_INGREDIENT ? recipeAddModes.IDLE_MODE : recipeAddModes.REMOVE_INGREDIENT)}]}
            />
        </View>
    );
};

export default IngredientsDisplay;