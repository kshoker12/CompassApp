import { View, Text } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../../context/AppContext';
import AddResourceDialog from '../../../components/AddResourceDialog';
import * as dietTrackerHelper from '../../../Helpers/dietTrackerHelper';
import PrimaryTextInput from '../../../components/PrimaryTextInput';
import { recipeAddModes } from '../../../Constants/dietTrackerConstants';

/**
 * @description Dialog where user adds step
 * @param {Object} recipesAddContext Diet tracker context
 * @returns {JSX.Element}
 */
const StepsAddDialog = ({recipesAddContext}) => {
    /** Diet Tracker Context Variables */
    const { operationMode, setOperationMode, setLoading, setStatus, setStepsList, stepsList } = useContext(recipesAddContext);

    /** State variable indicating input for weight */
    const [stepName, setStepName] = useState('');

    /** Reset weight and calories goals to value of daily tracker stats upon activating edit dialog */
    useEffect(()=>{
        if (operationMode === recipeAddModes.ADD_STEP) {
            setStepName('');
        };
    }, [operationMode]);

    /** Render dialog to edit user stats with primary input fields */
    return (
        <AddResourceDialog
            addIndicator = {operationMode === recipeAddModes.ADD_STEP}
            resetAddIndicator = {()=> setOperationMode(recipeAddModes.IDLE_MODE)}
            disabled = {stepName.length === 0}
            title = {'Add new step'}
            successFunction = {()=> {
                setStepsList([...stepsList, {name: stepName}]);
            }}
        >
            <View className = 'flex-col space-y-4'>
                <PrimaryTextInput
                    text = {stepName}
                    setText = {setStepName}
                    placeholder = 'Name'
                />    
            </View>
        </AddResourceDialog>
    );
};

export default StepsAddDialog;