import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import AddResourceDialog from '../../../components/AddResourceDialog';
import { todoModes } from '../../../Constants/beastmodeConstants';
import * as beastmodeHelper from '../../../Helpers/beastmodeHelper';
import { AppContext } from '../../../context/AppContext';
import OperationButton from '../../../components/OperationButton';

/**
 * @description Dialog to add sub task to todolist
 * @param {Object} todoListContext Todo list context variables
 * @returns {JSX.Element}
 */
const AddTodoDialog = ({todoListContext}) => {
    /** Task Context Variables */
    const { operationMode, setOperationMode, setStatus, setLoading } = useContext(todoListContext);

    /** App Context Variables */
    const { dispatch, password, beastmode } = useContext(AppContext);

    /** State variable indicating selected responsibility */
    const [selectedResponsibility, setSelectedResponsibility] = useState(-1);

    /** State variable indicating selected task */
    const [selectedTask, setSelectedTask] = useState(-1);

    /** State variable indicating selected subtasks */
    const [selectedSubtasks, setSelectedSubtasks] = useState([]);

    /** Reset all selectors upon activation of dialog */
    useEffect(()=>{
        if (operationMode === todoModes.ADD_MODE) {
            setSelectedResponsibility(-1);
            setSelectedTask(-1);
            setSelectedSubtasks([]);
        };
    },[operationMode]);

    /** Render content of add task dialog */
    return (
        <AddResourceDialog
            addIndicator = {operationMode === todoModes.ADD_MODE}
            resetAddIndicator = {()=>setOperationMode(todoModes.IDLE_MODE)}
            disabled = {[selectedResponsibility, selectedTask].includes(-1) || selectedSubtasks.length === 0}
            title = 'Sub-task selection'
            successFunction = {async () => {
                setLoading(true);
                await beastmodeHelper.addSubtasksToTodoList(dispatch, beastmode.responsibilities[selectedResponsibility].tasks[selectedTask].subtasks, selectedSubtasks, setStatus);
                setLoading(false);
            }}
        >
            <ScrollView className = 'flex-col space-y-4 h-[400px] '>
                <View className = 'flex-col space-y-1'>
                    <Text className = 'text-slate-200 text-sm font-semibold'>Responsibility</Text>
                    <View className = 'flex-row flex-wrap'>
                        {beastmode.responsibilities.map((responsibility, index)=>(
                            <OperationButton
                                title = {responsibility.name}
                                style = {`${selectedResponsibility === index ? 'bg-primary-lightPurple' : 'bg-alt-purple'} mr-4 my-2 `}
                                textStyle = 'text-xs'
                                clickAction = {()=>{
                                    setSelectedTask(-1);
                                    setSelectedSubtasks([]);
                                    setSelectedResponsibility(selectedResponsibility === index ? -1 : index)
                                }}
                            />
                        ))}
                    </View>    
                </View>
                <View className = 'flex-col space-y-1'>
                    <Text className = 'text-slate-200 text-sm font-semibold'>Task</Text>
                    <View className = 'flex-row flex-wrap'>
                        {selectedResponsibility > -1 ? beastmode.responsibilities[selectedResponsibility].tasks.length > 0 ? beastmode.responsibilities[selectedResponsibility].tasks.map((task, index)=>(
                            <OperationButton
                                title = {task.name}
                                style = {`${beastmodeHelper.computeCompletedSubTasks(task.subtasks) === task.subtasks.length && 'opacity-30 bg-success-green'} ${selectedTask === index ? 'bg-primary-lightPurple' : 'bg-alt-purple'} mr-4 my-2 `}
                                textStyle = 'text-xs'
                                clickAction = {()=>{
                                    setSelectedSubtasks([]);
                                    setSelectedTask(selectedTask === index ? -1 : index);
                                }}
                                disabled = {beastmodeHelper.computeCompletedSubTasks(task.subtasks) === task.subtasks.length}
                            />
                        )) : (
                            <Text className = 'text-xs text-slate-200 font-thin'>No tasks available</Text>
                        ) : (
                            <Text className = 'text-xs text-slate-200 font-thin'>Select Responsibility</Text>
                        )}
                    </View>    
                </View>
                <View className = 'flex-col space-y-2'>
                    <Text className = 'text-slate-200 text-sm font-semibold'>Sub-task</Text>
                    <View className = 'flex-row flex-wrap'>
                        {selectedTask > -1 ? beastmode.responsibilities[selectedResponsibility].tasks[selectedTask].subtasks.length > 0 ? beastmode.responsibilities[selectedResponsibility].tasks[selectedTask].subtasks.map((subtask, index)=>(
                            <OperationButton
                                title = {subtask.name}
                                style = {`${beastmodeHelper.todoListIncludesSubtask(subtask.id, beastmode.todoList[0].subtasks) !== undefined || subtask.completed ? 'opacity-30' : 'opacity-1'} ${subtask.completed && 'bg-success-green'} ${selectedSubtasks.includes(index) ? 'bg-primary-lightPurple' : 'bg-alt-purple'} mr-4 my-2 `}
                                textStyle = 'text-xs'
                                disabled = {beastmodeHelper.todoListIncludesSubtask(subtask.id, beastmode.todoList[0].subtasks) !== undefined || subtask.completed}
                                clickAction = {()=> setSelectedSubtasks(selectedSubtasks.includes(index) ? prev => prev.filter(item => item !== index) : [...selectedSubtasks, index])}
                            />
                        )) : (
                            <Text className = 'text-xs text-slate-200 font-thin'>No subtasks available</Text>
                        ) : (
                            <Text className = 'text-xs text-slate-200 font-thin'>Select Task</Text>
                        )}
                    </View>    
                </View>
            </ScrollView>
        </AddResourceDialog>
    );
};

export default AddTodoDialog;