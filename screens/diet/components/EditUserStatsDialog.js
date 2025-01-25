import { View, Text } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../../context/AppContext';
import { dietTrackerModes } from '../../../Constants/dietTrackerConstants';
import AddResourceDialog from '../../../components/AddResourceDialog';
import * as dietTrackerHelper from '../../../Helpers/dietTrackerHelper';
import PrimaryTextInput from '../../../components/PrimaryTextInput';

/**
 * @description Edit user stats dialog (Weight and calories goal)
 * @param {Object} dietTrackerContext Diet tracker context
 * @returns {JSX.Element}
 */
const EditUserStatsDialog = ({dietTrackerContext}) => {
    /** App Context Variables */
    const { dispatch, password, dietTracker } = useContext(AppContext);

    /** Diet Tracker Context Variables */
    const { operationMode, setOperationMode, setLoading, setStatus } = useContext(dietTrackerContext);

    /** State variable indicating input for weight */
    const [weight, setWeight] = useState(dietTracker.dailyTracker.weight);

    /** State variable indicating input for calories goal */
    const [caloriesGoal, setCaloriesGoal] = useState(dietTracker.dailyTracker.calories_goal);

    /** Reset weight and calories goals to value of daily tracker stats upon activating edit dialog */
    useEffect(()=>{
        if (operationMode === dietTrackerModes.EDIT_MODE) {
            setWeight(dietTracker.dailyTracker.weight);
            setCaloriesGoal(dietTracker.dailyTracker.calories_goal);
        };
    }, [operationMode]);

    /** Render dialog to edit user stats with primary input fields */
    return (
        <AddResourceDialog
            addIndicator = {operationMode === dietTrackerModes.EDIT_MODE}
            resetAddIndicator = {()=> setOperationMode(dietTrackerModes.IDLE_MODE)}
            disabled = {caloriesGoal.length === 0 || weight.length === 0}
            title = {'Edit Diet Tracker Stats'}
            successFunction = {async ()=> {
                setLoading(true);
                await dietTrackerHelper.updateDailyTrackerWeightAndGoal(dispatch, weight, caloriesGoal, setStatus);
                setLoading(false);
            }}
        >
            <View className = 'flex-col space-y-4'>
                <View className = 'flex-col space-y-1'>
                    <Text className = 'text-slate-200 absolute z-30 right-4 top-5'>Lbs</Text>
                    <PrimaryTextInput
                        text = {weight.toString()}
                        setText = {setWeight}
                        placeholder = 'Weight'
                        keyboardType = 'numeric'
                    />    
                </View>
                <View className = 'flex-col space-y-1'>
                    <Text className = 'text-slate-200 absolute z-30 right-4 top-5'>Cals</Text>
                    <PrimaryTextInput
                    text = {caloriesGoal.toString()}
                    setText = {setCaloriesGoal}
                    placeholder = 'Calories Goal'
                    keyboardType = 'numeric'
                />
                </View>
            </View>
        </AddResourceDialog>
    );
};

export default EditUserStatsDialog;