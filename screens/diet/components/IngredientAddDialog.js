import { View, Text } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../../context/AppContext';
import AddResourceDialog from '../../../components/AddResourceDialog';
import * as dietTrackerHelper from '../../../Helpers/dietTrackerHelper';
import PrimaryTextInput from '../../../components/PrimaryTextInput';
import { recipeAddModes } from '../../../Constants/dietTrackerConstants';

/**
 * @description Dialog where user adds ingredient
 * @param {Object} recipesAddContext Diet tracker context
 * @returns {JSX.Element}
 */
const IngredientsAddDialog = ({recipesAddContext}) => {
    /** Diet Tracker Context Variables */
    const { operationMode, setOperationMode, setLoading, setStatus, ingredientsList, setIngredientsList } = useContext(recipesAddContext);

    /** State variable indicating input for weight */
    const [ingredientName, setIngredientName] = useState('');

    /** Reset weight and calories goals to value of daily tracker stats upon activating edit dialog */
    useEffect(()=>{
        if (operationMode === recipeAddModes.ADD_INGREDIENT) {
            setIngredientName('');
        };
    }, [operationMode]);

    /** Render dialog to edit user stats with primary input fields */
    return (
        <AddResourceDialog
            addIndicator = {operationMode === recipeAddModes.ADD_INGREDIENT}
            resetAddIndicator = {()=> setOperationMode(recipeAddModes.IDLE_MODE)}
            disabled = {ingredientName.length === 0}
            title = {'Add new ingredient'}
            successFunction = {()=> setIngredientsList([...ingredientsList, {name: ingredientName}])}
        >
            <View className = 'flex-col space-y-4'>
                <PrimaryTextInput
                    text = {ingredientName}
                    setText = {setIngredientName}
                    placeholder = 'Name'
                />    
            </View>
        </AddResourceDialog>
    );
};

export default IngredientsAddDialog;