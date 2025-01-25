import { View, Text } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import AddResourceDialog from '../../../components/AddResourceDialog';
import { responsibilityModes } from '../../../Constants/beastmodeConstants';
import * as beastmodeHelper from '../../../Helpers/beastmodeHelper';
import { AppContext } from '../../../context/AppContext';
import PrimaryTextInput from '../../../components/PrimaryTextInput';
import PrimaryCheckBox from '../../../components/PrimaryCheckBox';
import DateTimePicker from '@react-native-community/datetimepicker';
import { CheckBox } from 'react-native-elements';
import { getDate } from '../../../Helpers/HelperFunctions';

/**
 * @description Dialog to add task to responsibility
 * @param {Object} responsibilityContext Responsibility context variables
 * @returns {JSX.Element}
 */
const AddTaskDialog = ({responsibilityContext}) => {
    /** Responsibility Context Variables */
    const { operationMode, setOperationMode, responsibility, setStatus } = useContext(responsibilityContext);

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
        if (operationMode === responsibilityModes.ADD_MODE) {
            setTaskName('');
            setRepeat(false);
            setIncludeDeadline(false);
            setDeadline(new Date());
        };
    },[operationMode]);

    /** Render content of add task dialog */
    return (
        <AddResourceDialog
            addIndicator = {operationMode === responsibilityModes.ADD_MODE}
            resetAddIndicator = {()=>setOperationMode(responsibilityModes.IDLE_MODE)}
            disabled = {taskName.length === 0}
            title = 'New Task Info'
            successFunction = {async () => {
                if (includeDeadline) {
                    await beastmodeHelper.createTask(dispatch, taskName, repeat, responsibility.id, setStatus, getDate(deadline)); 
                } else await beastmodeHelper.createTask(dispatch, taskName, repeat, responsibility.id, setStatus);    
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

export default AddTaskDialog;