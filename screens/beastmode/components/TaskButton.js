import { View, Text, TouchableOpacity } from 'react-native'
import React, { useContext, useMemo, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { responsibilityModes } from '../../../Constants/beastmodeConstants';
import { LinearGradient } from 'expo-linear-gradient';
import DeleteConfirmationDialog from '../../../components/DeleteConfirmationDialog';
import * as beastmodeHelper from '../../../Helpers/beastmodeHelper';
import { AppContext } from '../../../context/AppContext';
import { dateFormatter } from '../../../Helpers/HelperFunctions';

/**
 * @description Task button
 * @param {Object} task Task to display
 * @param {Object} responsibilityContext Context for responsibilities
 * @returns {JSX.Element}
 */
const TaskButton = ({task, responsibilityContext}) => {
    /** Navigation object */
    const navigation = useNavigation();

    /** Context Variables */
    const { dispatch, password } = useContext(AppContext);

    /** Responsibility Context Variables */
    const { setStatus, operationMode, responsibility, setOperationMode } = useContext(responsibilityContext);
    
    /** Indicator whether delete confirmation prompt is active */
    const [deleteIndicator, setDeleteIndicator] = useState(false);

    /** Memoized duration of task */
    const duration = useMemo(()=>beastmodeHelper.computeTaskDuration(task.subtasks),[task]);

    /** Indicator if task is completed */
    const completed = useMemo(()=>beastmodeHelper.computeCompletedSubTasks(task.subtasks) === task.subtasks.length && task.subtasks.length > 0, [task])

    /** Render Task button displaying task name and number of subtasks */
    return (
        <TouchableOpacity
            className = 'border-primary-lightPurple border-[1px] mx-6 opacity-90 rounded-xl my-2 overflow-hidden mb-2'
            onPress={()=>operationMode === responsibilityModes.DELETE_MODE ? setDeleteIndicator(true) : navigation.navigate('Task', {responsibilityId: responsibility.id, taskId: task.id})}
        >
            <DeleteConfirmationDialog 
                setDeleteIndicator = {setDeleteIndicator} 
                deleteIndicator = {deleteIndicator}
                setStatus = {setStatus}
                successAction = {async ()=>{
                    await beastmodeHelper.removeTask(dispatch, responsibility.id, task.id, setStatus);
                    setOperationMode(responsibilityModes.IDLE_MODE);
                }}
            />
            <LinearGradient
                colors={operationMode !== responsibilityModes.DELETE_MODE ? ['#2c2e45', (completed ? '#4f6962' : '#6b21a8'), 'black'] : ['#2c2e45', 'red', 'black']}
                start={{x: 0.1, y: 0}}
                end={{x: 1, y: 1}}
                className = 'py-1 px-4'
            >
                <Text className = 'text-slate-200 text-2xl font-thin'>{task.name}</Text>
                {task.deadline && (<Text className = 'text-red-400'>Due: {dateFormatter.format(new Date(task.deadline))}</Text>)}  
                <View className = 'flex-row items-center justify-between'>
                    <Text className = 'text-slate-200 text-lg'>{`${task.subtasks.length} ${task.subtasks.length === 1 ? 'Sub-task' : 'Sub-tasks'}`}</Text>    
                    <Text className = 'text-slate-200 font-semibold text-base'>{duration}</Text>
                </View>
            </LinearGradient>
        </TouchableOpacity>
    );
};

export default TaskButton;