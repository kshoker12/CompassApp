import { View, Text, TouchableOpacity } from 'react-native'
import React, { useContext, useMemo, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import DeleteConfirmationDialog from '../../../components/DeleteConfirmationDialog';
import * as beastmodeHelper from '../../../Helpers/beastmodeHelper';
import { AppContext } from '../../../context/AppContext';
import { taskModes, todoModes } from '../../../Constants/beastmodeConstants';
import { formatMinutes } from '../../../Helpers/HelperFunctions';
import PrimaryCheckBox from '../../../components/PrimaryCheckBox';
import TodoListScreen from '../TodoListScreen';

/**
 * @description Todo button
 * @param {Object} subtask Subtask to display
 * @param {Object} todoListContext Context for task
 * @returns {JSX.Element}
 */
const TodoButton = ({subtask, todoListContext}) => {
    /** Navigation object */
    const navigation = useNavigation();

    /** Context Variables */
    const { dispatch, password, beastmode} = useContext(AppContext);

    /** Responsibility Context Variables */
    const { setLoading, operationMode, setStatus, setOperationMode} = useContext(todoListContext);
    
    /** Indicator whether delete confirmation prompt is active */
    const [deleteIndicator, setDeleteIndicator] = useState(false);

    /** Responsibility and task associated with subtask */
    const {responsibilityName, taskName} = useMemo(()=>beastmodeHelper.findSubTaskDetails(beastmode.responsibilities, subtask.id), [subtask]);

    /** Render Subtask button displaying subtask name and duration */
    return (
        <TouchableOpacity
            className = 'border-primary-lightPurple border-[1px] mx-6 opacity-90 rounded-xl my-2 overflow-hidden mb-2'
            onPress={()=>operationMode === todoModes.DELETE_MODE && setDeleteIndicator(true)}
        >
            <DeleteConfirmationDialog 
                setDeleteIndicator = {setDeleteIndicator} 
                deleteIndicator = {deleteIndicator}
                setStatus = {setStatus}
                successAction = {async ()=>{
                    setLoading(true);
                    await beastmodeHelper.removeSubTaskFromTodoList(dispatch, subtask.id, setStatus);
                    setLoading(false);
                    setOperationMode(todoModes.IDLE_MODE);
                }}
            />
            <LinearGradient
                colors={operationMode !== todoModes.DELETE_MODE ? ['#2c2e45', (subtask.completed ? '#4f6962' : '#6b21a8'), 'black'] : ['#2c2e45', 'red', 'black']}
                start={{x: 0.1, y: 0}}
                end={{x: 1, y: 1}}
                className = 'py-1 px-4'
            >
                <View className = 'flex-row justify-between items-center'>
                    <Text className = 'text-slate-200 font-bold text-base'>{responsibilityName}</Text>
                    <Text className = 'text-slate-200 text-sm'>{taskName}</Text>
                </View>
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

export default TodoButton;