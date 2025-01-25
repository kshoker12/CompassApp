import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { AppContext } from '../../context/AppContext';
import BackgroundImage from '../../components/BackgroundImage';
import DreamMeadowTitle from '../../components/DreamMeadowTitle';
import BackArrow from '../../components/BackArrow';
import { SpeedDial } from 'react-native-elements';
import * as beastmodeHelper from '../../Helpers/beastmodeHelper';
import { todoModes } from '../../Constants/beastmodeConstants';
import PrimarySpeedDial from '../../components/PrimarySpeedDial';
import ScreenLoader from '../../components/ScreenLoader';
import TodoButton from './components/TodoButton';
import OperationButton from '../../components/OperationButton';
import AlertChip from '../../components/AlertChip';
import AddTodoDialog from './components/AddTodoDialog';

/** Todo List context */
const todoListContext = createContext();

/**
 * @description Todo List screen including pending tasks to be completed
 * @returns {JSX.Element}
 */
const TodoListScreen = () => {
    /** Context Variables */
    const { beastmode, dispatch } = useContext(AppContext);

    /** Indicator whether an operation mode is active */
    const [operationMode, setOperationMode] = useState(todoModes.IDLE_MODE);

    /** State variable indicating active todo list subtasks */
    const [activeSubtasks, setActiveSubtasks] = useState([]);
   
    /** Status of operations */
    const [status, setStatus] = useState(null);

    /** Indicator that user-requested action is being conducted */
    const [loading, setLoading] = useState(false);

    /** Memoized completed tasks in todo list */
    const completedTodo = useMemo(()=> beastmodeHelper.computeCompletedSubTasks(beastmode.todoList[0].subtasks), [beastmode]);

    /** Memoized speed dial */
    const speedDialActions = useMemo(()=>{
        /** Reset responsibility speed dial action data */
        const repeat = {icon: 'repeat', action: async () => {
            setLoading(true);
            await beastmodeHelper.resetTodoList(dispatch, setStatus);
            setLoading(false);
            setOperationMode(todoModes.IDLE_MODE);
        }};

        /** Add responsibility speed dial action data */
        const addResponsibility = {icon: 'add', action: ()=>setOperationMode(todoModes.ADD_MODE)};

        /** Remove responsibility speed dial action data */
        const removeResponsibility = {icon: 'delete', action: ()=> operationMode === todoModes.DELETE_MODE ? setOperationMode( todoModes.IDLE_MODE) : setOperationMode(todoModes.DELETE_MODE)};

        /** Return computed speed dial actions */
        return [repeat, addResponsibility, removeResponsibility];
    },[operationMode]);

    /** Compute active subtasks upon starting hour */
    useEffect(()=>{
        if (operationMode === todoModes.START_HOUR) setActiveSubtasks(beastmodeHelper.computeActiveSubtasks(beastmode.todoList[0].subtasks));
    },[operationMode]);

    /** Upon change of beastmode, update active subtasks */
    useEffect(()=>{
        if (operationMode === todoModes.START_HOUR) {
            setActiveSubtasks(beastmode.todoList[0].subtasks.filter((subtask)=>activeSubtasks.map(subtask => subtask.id).includes(subtask.id)));
        }
    },[beastmode]);

    /** Render todo list title, back arrow, and list of pending subtasks */
    return (
        <todoListContext.Provider
            value={{status, setStatus, operationMode, setOperationMode, loading, setLoading, activeSubtasks, setActiveSubtasks}}
        >
            <SafeAreaView>
                <AddTodoDialog
                    todoListContext = {todoListContext}
                />
                <View className = 'w-full h-full flex-col text-slate-200'>
                    <BackgroundImage imagePath = {require('../../images/todolist.jpg')} shade = 'bg-purple-950'/>
                    <AlertChip
                        status = {status}
                        setStatus = {setStatus}
                        style = 'absolute z-50 bg-slate-200'
                        textStyle = 'text-white'
                        iconColor = '#e2e8f0'
                    />
                    <DreamMeadowTitle title = 'Todo List' style = 'self-center' textStyle = 'text-7xl pt-8 text-slate-200'/>
                    <View className = 'flex-row items-center justify-between mx-6 -mt-4'>
                        <View className = 'flex-row items-center justify-center bg-primary-purple border-[1px] border-primary-lightPurple rounded-lg px-4 py-1'>
                            <Text className = 'font-semibold text-gray-200 text-lg'>Completed: </Text>
                            <Text className = 'text-slate-200 text-lg'>{`${completedTodo} / ${beastmode.todoList[0].subtasks.length}`}</Text>    
                        </View>
                        <View className = 'flex-row items-center justify-center bg-primary-purple border-primary-lightPurple border-[1px] rounded-lg px-4 py-1'>
                            <Text className = 'font-semibold text-gray-200 text-lg'>Hours: </Text>
                            <Text className = 'text-slate-200 text-lg'>{beastmode.todoList[0].hours}</Text>    
                        </View>
                    </View>
                    <ScreenLoader
                        title = 'Loading...'
                        textStyle = 'text-slate-200'
                        style = 'absolute'
                        indicatorStyling = 'white'
                        loading = {loading}
                    />
                    <ScrollView className = 'flex-grow mb-10 mt-2 z-50'>
                        {operationMode === todoModes.START_HOUR ? activeSubtasks.map((subtask)=>(
                            <TodoButton
                                subtask = {subtask}
                                todoListContext = {todoListContext}
                            />
                        )) : beastmode.todoList[0].subtasks.map((subtask)=>(
                            <TodoButton
                                subtask = {subtask}
                                todoListContext = {todoListContext}
                            />
                        ))}
                    </ScrollView>
                    <View className = 'flex-row justify-between items-center z-50'>
                        {operationMode === todoModes.START_HOUR ? (
                            <OperationButton
                                title = {`Cancel`}
                                style = {`${beastmode.todoList[0].subtasks.length === 0 && 'opacity-50'} self-start bg-primary-purple border-[1px] border-primary-lightPurple w-36 ml-6 bottom-4`}
                                textStyle = 'text-lg text-center'
                                disabled = {beastmode.todoList[0].subtasks.length === 0}
                                clickAction = {()=>setOperationMode(todoModes.IDLE_MODE)}
                            />  
                        ) : (
                            <OperationButton
                                title = {`Start Hour`}
                                style = {`${completedTodo === beastmode.todoList[0].subtasks.length && 'opacity-50'} self-start bg-primary-purple border-[1px] border-primary-lightPurple w-36 ml-6 bottom-4`}
                                textStyle = 'text-lg text-center'
                                disabled = {completedTodo === beastmode.todoList[0].subtasks.length}
                                clickAction = {()=>setOperationMode(todoModes.START_HOUR)}
                            />  
                        )}
                          
                        {operationMode === todoModes.START_HOUR && (
                            <OperationButton
                                title = {`Finish Hour`}
                                style = {`self-start bg-primary-purple border-[1px] border-primary-lightPurple w-36 mr-6 bottom-4`}
                                textStyle = 'text-lg text-center'
                                clickAction = {async ()=>{
                                    setLoading(true);
                                    await beastmodeHelper.finishHourInTodoList(dispatch, activeSubtasks[0].id, setStatus);
                                    setLoading(false);
                                    setActiveSubtasks([]);
                                    setOperationMode(todoModes.IDLE_MODE);
                                }}
                            />
                        )}    
                    </View>
                    {operationMode !== todoModes.START_HOUR && (<PrimarySpeedDial speedDialActions = {speedDialActions}/>)}
                </View>
            </SafeAreaView>    
        </todoListContext.Provider>
    );
};

export default TodoListScreen;