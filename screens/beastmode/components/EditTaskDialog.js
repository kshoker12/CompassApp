import { View, Text } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import AddResourceDialog from '../../../components/AddResourceDialog';
import * as beastmodeHelper from '../../../Helpers/beastmodeHelper';
import { AppContext } from '../../../context/AppContext';
import PrimaryTextInput from '../../../components/PrimaryTextInput';
import PrimaryCheckBox from '../../../components/PrimaryCheckBox';
import DateTimePicker from '@react-native-community/datetimepicker';
import { CheckBox } from 'react-native-elements';
import { getDate } from '../../../Helpers/HelperFunctions';
import { taskModes } from '../../../Constants/beastmodeConstants';

/**
 * @description Dialog to edit task
 * @param {Object} taskContext Task context variables
 * @returns {JSX.Element}
 */
const EditTaskDialog = ({taskContext}) => {
    /** Responsibility Context Variables */
    const { operationMode, setOperationMode, setStatus, task } = useContext(taskContext);

    /** App Context Variables */
    const { dispatch, password } = useContext(AppContext);

    /** State variable indicating new task name */
    const [taskName, setTaskName] = useState('');

    /** State variable indicating whether new task is a repeatable task week-to-week */
    const [repeat, setRepeat] = useState(false);

    /** State variable indicating if deadline is included */
    const [includeDeadline, setIncludeDeadline] = useState(false);

    /** State variable indicating chosen date for deadline */
    const [deadline, setDeadline] = useState(new Date());

    /** Reset task name and repeat indicator upon re-opening of dialog */
    useEffect(()=>{
        if (operationMode === taskModes.EDIT_MODE) {
            setTaskName(task.name);
            setRepeat(task.repeat);
            setIncludeDeadline(task.deadline ? true : false);
            if (task.deadline) setDeadline(new Date(task.deadline));
        };
    },[operationMode]);

    /** Render content of add task dialog */
    return (
        <AddResourceDialog
            addIndicator = {operationMode === taskModes.EDIT_MODE}
            resetAddIndicator = {()=>setOperationMode(taskModes.IDLE_MODE)}
            disabled = {taskName.length === 0}
            title = 'Edit Task Info'
            successFunction = {async () => {
                if (includeDeadline) {
                    console.log(deadline);
                    await beastmodeHelper.updateTask(dispatch, task.id, {name: taskName, repeat, deadline: getDate(deadline)}, setStatus);
                } else await beastmodeHelper.updateTask(dispatch, task.id, {name: taskName, repeat}, setStatus);  
            }}
        >
            <PrimaryTextInput
                text = {taskName}
                setText = {setTaskName}
                placeholder = 'Task Name'
            />
            <View className = 'flex-row justify-between items-center'>
                <View className = 'flex-row items-center justify-center'>
                    <CheckBox
                        style = {{backgroundColor: 'blue'}}
                        containerStyle = {{borderColor: 'black', marginLeft: -10}}
                        checked = {includeDeadline}
                        checkedColor='#ece8f0'
                        onPress={()=>setIncludeDeadline(!includeDeadline)}
                    />    
                    <Text className = 'text-slate-200 text-lg -ml-3 mb-1'>Deadline</Text>   
                </View>
                {includeDeadline && (
                    <DateTimePicker 
                        value={deadline} 
                        mode = 'date'
                        timeZoneName='UTC'
                        onChange={(e, selectedDate)=>{
                            const currentDate = selectedDate || date;
                            setDeadline(currentDate);
                        }}
                    />    
                )}
            </View>
            <View className = '-mt-1'>
                <PrimaryCheckBox
                    title = 'Repeat'
                    checked = {repeat}
                    clickAction = {()=>setRepeat(!repeat)}
                />    
            </View>
        </AddResourceDialog>
    );
};

export default EditTaskDialog;