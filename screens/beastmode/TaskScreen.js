import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React, { createContext, useContext, useMemo, useState } from 'react'
import { AppContext } from '../../context/AppContext';
import { LinearGradient } from 'expo-linear-gradient';
import BackArrow from '../../components/BackArrow';
import CalgaryDemoTitle from '../../components/CalgaryDemoTitle';
import * as beastmodeHelper from '../../Helpers/beastmodeHelper';
import { taskModes } from '../../Constants/beastmodeConstants';
import AlertChip from '../../components/AlertChip';
import SubTaskButton from './components/SubTaskButton';
import AddSubTaskDialog from './components/AddSubTaskDialog';
import ScreenLoader from '../../components/ScreenLoader';
import PrimarySpeedDial from '../../components/PrimarySpeedDial';
import EditTaskDialog from './components/EditTaskDialog';
import { dateFormatter } from '../../Helpers/HelperFunctions';

/** Task context */
const taskContext = createContext();

/**
 * @description Responsibility screen where user can view responsibilities
 * @param {Object} route Route object
 * @returns {JSX.Element}
 */
const TaskScreen = ({route}) => {
    /** Context Variables */
    const { beastmode } = useContext(AppContext);

    /** Indicator whether an operation mode is active */
    const [operationMode, setOperationMode] = useState(taskModes.IDLE_MODE);

    /** Status of operations */
    const [status, setStatus] = useState(null);
    
    /** Indicator that user-requested action is being conducted */
    const [loading, setLoading] = useState(false);

    /** Extract active responsibility and task*/
    const {responsibility, task} = useMemo(()=>beastmodeHelper.extractResponsibilityAndTask(route, beastmode),[beastmode]);

    /** Memoized completed subtasks */
    const completedSubTasks = useMemo(()=>beastmodeHelper.computeCompletedSubTasks(task.subtasks), [beastmode]);

    /** Memoized duration of task */
    const duration = useMemo(()=>beastmodeHelper.computeTaskDuration(task.subtasks),[task]);

    /** Render all subtasks for given task as well as information about responsibility */
    return (
        <taskContext.Provider
            value={{status, setStatus, responsibility, task, operationMode, setOperationMode, loading, setLoading}}
        >
            <EditTaskDialog taskContext = {taskContext}/>
            <SafeAreaView>
                <LinearGradient
                    colors={['#2c2e45', '#6b21a8']}
                    className = 'w-full h-full flex-col'
                    start={{x:0.3, y: 0}}
                    end={{x: 1, y: 1}}
                >  
                    <AddSubTaskDialog taskContext = {taskContext}/>
                    <BackArrow 
                        colour = 'rgb(226, 232, 240)'
                        style = 'absolute m-2'
                    />
                    <AlertChip
                        status = {status}
                        setStatus = {setStatus}
                        style = 'absolute z-50 bg-slate-200'
                        textStyle = 'text-white'
                        iconColor = '#e2e8f0'
                    />
                    <CalgaryDemoTitle title = {task.name} style = 'self-center' textStyle = 'text-4xl pt-9 text-slate-200'/>
                    {task.deadline && (
                        <View className = 'flex-row justify-center -mt-3 mb-2'>
                            <Text className = 'text-red-400'>Due: {dateFormatter.format(new Date(task.deadline))}</Text>    
                        </View>
                    )}  
                    <View className = 'flex-row items-center justify-between mx-6'>
                        <View className = 'flex-row items-center justify-center'>
                            <Text className = 'font-semibold text-gray-400 text-lg'>Completed: </Text>
                            <Text className = 'text-slate-200 text-lg'>{`${completedSubTasks} / ${task.subtasks.length}`}</Text>    
                        </View>
                        <View className = 'flex-row items-center justify-center'>
                            <Text className = 'font-semibold text-gray-400 text-lg'>Duration: </Text>
                            <Text className = 'text-slate-200 text-lg'>{duration}</Text>    
                        </View>
                    </View>
                    <ScreenLoader
                        title = 'Loading...'
                        textStyle = 'text-slate-200'
                        style = 'absolute'
                        indicatorStyling = 'white'
                        loading = {loading}
                    />
                    <ScrollView className = 'flex-grow mb-20'>
                        {task.subtasks.map((subtask)=>(
                            <SubTaskButton
                                subtask = {subtask}
                                taskContext = {taskContext}
                            />
                        ))}
                    </ScrollView>
                    <PrimarySpeedDial
                        speedDialActions = {[{icon: 'edit', action: ()=>setOperationMode(taskModes.EDIT_MODE)}, { icon: 'add', action: ()=>setOperationMode(taskModes.ADD_MODE)}, { icon: 'delete', action: ()=>setOperationMode(operationMode === taskModes.DELETE_MODE ? taskModes.IDLE_MODE : taskModes.DELETE_MODE)}]}
                    /> 
                </LinearGradient>
            </SafeAreaView>     
        </taskContext.Provider>
    );
};

export default TaskScreen;