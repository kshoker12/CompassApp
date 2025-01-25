import { View, Text, TouchableOpacity } from 'react-native'
import React, { useContext, useMemo, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import DeleteConfirmationDialog from '../../../components/DeleteConfirmationDialog';
import * as beastmodeHelper from '../../../Helpers/beastmodeHelper';
import { AppContext } from '../../../context/AppContext';
import { taskModes } from '../../../Constants/beastmodeConstants';
import { formatMinutes } from '../../../Helpers/HelperFunctions';
import PrimaryCheckBox from '../../../components/PrimaryCheckBox';

/**
 * @description Task button
 * @param {Object} subtask Subtask to display
 * @param {Object} taskContext Context for task
 * @returns {JSX.Element}
 */
const SubTaskButton = ({subtask, taskContext}) => {
    /** Context Variables */
    const { dispatch, password } = useContext(AppContext);

    /** Responsibility Context Variables */
    const { setStatus, operationMode, task, setOperationMode, loading, setLoading } = useContext(taskContext);
    
    /** Indicator whether delete confirmation prompt is active */
    const [deleteIndicator, setDeleteIndicator] = useState(false);

    /** Render Subtask button displaying subtask name and duration */
    return (
        <TouchableOpacity
            className = 'border-primary-lightPurple border-[1px] mx-6 opacity-90 rounded-xl my-2 overflow-hidden mb-2'
            onPress={()=>operationMode === taskModes.DELETE_MODE ? setDeleteIndicator(true) : console.log('Navigating')}
        >
            <DeleteConfirmationDialog 
                setDeleteIndicator = {setDeleteIndicator} 
                deleteIndicator = {deleteIndicator}
                setStatus = {setStatus}
                successAction = {async ()=>{
                    setLoading(true);
                    await beastmodeHelper.removeSubTask(dispatch, task.id, subtask.id, setStatus);
                    setLoading(false);
                    setOperationMode(taskModes.IDLE_MODE);
                }}
            />
            <LinearGradient
                colors={operationMode !== taskModes.DELETE_MODE ? ['#2c2e45', (subtask.completed ? '#4f6962' : '#6b21a8'), 'black'] : ['#2c2e45', 'red', 'black']}
                start={{x: 0.1, y: 0}}
                end={{x: 1, y: 1}}
                className = 'py-1 px-4'
            >
                <Text className = 'text-slate-200 text-2xl font-thin'>{subtask.name}</Text> 
                <View className = 'flex-row justify-between items-center'>
                    <PrimaryCheckBox
                        title = 'Complete'
                        checked = {subtask.completed}
                        clickAction = {async ()=> {
                            if (!subtask.completed) {
                                setLoading(true);
                                await beastmodeHelper.completeSubTask(dispatch, subtask.id, setStatus);
                                setLoading(false);
                            }
                        }}
                    />     
                    <Text className = 'text-slate-200 font-semibold text-base'>{formatMinutes(subtask.duration)}</Text>   
                </View> 
            </LinearGradient>
        </TouchableOpacity>
    );
};

export default SubTaskButton;