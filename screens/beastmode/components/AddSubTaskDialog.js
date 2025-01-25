import { View, Text } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import AddResourceDialog from '../../../components/AddResourceDialog';
import { taskModes } from '../../../Constants/beastmodeConstants';
import * as beastmodeHelper from '../../../Helpers/beastmodeHelper';
import { AppContext } from '../../../context/AppContext';
import PrimaryTextInput from '../../../components/PrimaryTextInput';
import PrimaryCheckBox from '../../../components/PrimaryCheckBox';

/**
 * @description Dialog to add task to responsibility
 * @param {Object} taskContext Task context variables
 * @returns {JSX.Element}
 */
const AddSubTaskDialog = ({taskContext}) => {
    /** Task Context Variables */
    const { operationMode, setOperationMode, responsibility, task, setStatus } = useContext(taskContext);

    /** App Context Variables */
    const { dispatch, password } = useContext(AppContext);

    /** State variable indicating new subtask name */
    const [subtaskName, setSubtaskName] = useState('');

    /** State variable indicating duration of subtask */
    const [duration, setDuration] = useState('');

    /** Reset task name and repeat indicator upon re-opening of dialog */
    useEffect(()=>{
        if (operationMode === taskModes.ADD_MODE) {
            setSubtaskName('');
            setDuration('');
        };
    },[operationMode]);

    /** Render content of add task dialog */
    return (
        <AddResourceDialog
            addIndicator = {operationMode === taskModes.ADD_MODE}
            resetAddIndicator = {()=>setOperationMode(taskModes.IDLE_MODE)}
            disabled = {subtaskName.length === 0 || duration.length === 0}
            title = 'New Sub-task Info'
            successFunction = {async () => await beastmodeHelper.addSubTask(dispatch, subtaskName, parseFloat(duration), task.id, setStatus)}
        >
            <View className = 'flex-col space-y-4'>
                <PrimaryTextInput
                    text = {subtaskName}
                    setText = {setSubtaskName}
                    placeholder = 'Sub-task Name'
                    style = 'mb-4'
                />
                <PrimaryTextInput
                    text = {duration}
                    setText = {setDuration}
                    placeholder = 'Duration'
                    keyboardType = 'numeric'
                />    
            </View>
        </AddResourceDialog>
    );
};

export default AddSubTaskDialog;