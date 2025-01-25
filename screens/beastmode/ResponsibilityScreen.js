import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React, { createContext, useContext, useMemo, useState } from 'react'
import { AppContext } from '../../context/AppContext';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import BackArrow from '../../components/BackArrow';
import VinaryTitle from '../../components/VinaryTitle';
import CalgaryDemoTitle from '../../components/CalgaryDemoTitle';
import { computeCompletedTasks } from '../../Helpers/beastmodeHelper';
import { responsibilityModes } from '../../Constants/beastmodeConstants';
import { SpeedDial } from 'react-native-elements';
import TaskButton from './components/TaskButton';
import AlertChip from '../../components/AlertChip';
import AddResourceDialog from '../../components/AddResourceDialog';
import AddTaskDialog from './components/AddTaskDialog';

/** Responsibility context */
const responsibilityContext = createContext();

/**
 * @description Responsibility screen where user can view responsibilities
 * @param {Object} route Route object
 * @returns {JSX.Element}
 */
const ResponsibilityScreen = ({route}) => {
    /** Context Variables */
    const { beastmode } = useContext(AppContext);

    /** State variable indicating whether speed dial is open */
    const [speedDialOpen, setSpeedDialOpen] = useState(false);

    /** Indicator whether an operation mode is active */
    const [operationMode, setOperationMode] = useState(responsibilityModes.IDLE_MODE);

    /** Status of operations */
    const [status, setStatus] = useState(null);

    /** Extract active resposnibility */
    const responsibility = useMemo(()=>beastmode.responsibilities.find(({id})=>id === route.params.id),[beastmode]);

    /** Memoized completed tasks */
    const completedTasks = useMemo(()=>computeCompletedTasks(responsibility.tasks), [beastmode]);

    /** Render all tasks for given responsibility as well as information about responsibility */
    return (
        <responsibilityContext.Provider
            value={{status, setStatus, responsibility, operationMode, setOperationMode}}
        >
            <SafeAreaView>
                <LinearGradient
                    colors={['#2c2e45', '#6b21a8']}
                    className = 'w-full h-full flex-col'
                    start={{x:0.3, y: 0}}
                    end={{x: 1, y: 1}}
                >
                    <AddTaskDialog responsibilityContext = {responsibilityContext}/>
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
                    <CalgaryDemoTitle title = {responsibility.name} style = 'self-center' textStyle = 'text-5xl pt-9 text-slate-200'/>
                    <View className = 'flex-row items-center justify-between mx-16 -mt-4'>
                        <View className = 'flex-row items-center justify-center'>
                            <Text className = 'font-semibold text-gray-400 text-xl'>Completed: </Text>
                            <Text className = 'text-slate-200 text-xl'>{`${completedTasks} / ${responsibility.tasks.length}`}</Text>    
                        </View>
                        <View className = 'flex-row items-center justify-center'>
                            <Text className = 'font-semibold text-gray-400 text-xl'>{responsibility.hours === 1 ? 'Hour:' : 'Hours:'} </Text>
                            <Text className = 'text-slate-200 text-xl'>{responsibility.hours}</Text>    
                        </View>
                    </View>
                    <ScrollView className = 'flex-grow mb-20'>
                        {responsibility.tasks.map((task)=>(
                            <TaskButton
                                task = {task}
                                responsibilityContext = {responsibilityContext}
                            />
                        ))}
                    </ScrollView>
                    <SpeedDial
                        isOpen = {speedDialOpen}
                        icon = {{name: 'ellipsis-v', color: '#fff', type: 'font-awesome'}}
                        openIcon = {{name: 'close', color: '#fff'}}
                        onOpen={()=>setSpeedDialOpen(!speedDialOpen)}
                        onClose={()=>setSpeedDialOpen(!speedDialOpen)}
                        color='#2c2e45'
                        buttonStyle = {{borderColor: '#a855f7', borderWidth: 1, borderRadius: 50, width: 60, height: 60}}
                        style = {{bottom: -5, right: -5, zIndex: 100}}
                    >
                        {[{ icon: 'add', action: ()=>setOperationMode(responsibilityModes.ADD_MODE)}, { icon: 'delete', action: ()=>setOperationMode(operationMode === responsibilityModes.DELETE_MODE ? responsibilityModes.IDLE_MODE : responsibilityModes.DELETE_MODE)}].map(({icon, action})=>(
                            <SpeedDial.Action
                                icon = {{name: icon, color: 'white', type: 'material'}}
                                onPress={()=>{action(); setSpeedDialOpen(false);}}
                                color='#2c2e45'
                                buttonStyle = {{borderColor: '#a855f7', borderWidth: 1, borderRadius: 50, width: 45, height: 45}}
                                style = {{left: 0}}
                            />
                        ))}
                    </SpeedDial>   
                </LinearGradient>
            </SafeAreaView>     
        </responsibilityContext.Provider>
    );
};

export default ResponsibilityScreen;