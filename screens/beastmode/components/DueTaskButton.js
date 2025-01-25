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
 * @returns {JSX.Element}
 */
const DueTaskButton = ({task}) => {
    /** Navigation object */
    const navigation = useNavigation();

    /** Context Variables */
    const { beastmode } = useContext(AppContext);

    /** Memoized duration of task */
    const duration = useMemo(()=>beastmodeHelper.computeTaskDuration(task.subtasks),[task]);

    /** Indicator if task is completed */
    const completed = useMemo(()=>beastmodeHelper.computeCompletedSubTasks(task.subtasks) === task.subtasks.length && task.subtasks.length > 0, [task])

    /** Responsibility name for this given task */
    const responsibilityName = useMemo(()=>beastmodeHelper.getResponsibilityName(beastmode.responsibilities, task.id), [task]);

    /** Render Task button displaying task name and number of subtasks */
    return (
        <TouchableOpacity
            className = 'border-primary-lightPurple border-[1px] mx-2 opacity-90 rounded-xl my-2 overflow-hidden mb-2'
            onPress={()=> navigation.navigate('Task', {responsibilityId: beastmodeHelper.getResponsibilityId(beastmode.responsibilities, task.id), taskId: task.id})}
        >
            <LinearGradient
                colors={['#2c2e45', (completed ? '#4f6962' : '#6b21a8'), 'black']}
                start={{x: 0.1, y: 0}}
                end={{x: 1, y: 1}}
                className = 'py-1.5 px-4'
            >
                <Text className = 'text-slate-200 font-bold text-sm'>{responsibilityName}</Text>
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

export default DueTaskButton;