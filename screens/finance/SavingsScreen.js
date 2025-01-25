import React, { useContext, useEffect, useState } from 'react'
import { Image, SafeAreaView, Text, TouchableOpacity, View, ScrollView } from 'react-native'
import { AppContext } from '../../context/AppContext';
import { useNavigation } from '@react-navigation/native';
import VinaryTitle from '../../components/VinaryTitle';
import { LinearGradient } from 'expo-linear-gradient';
import { Icon } from 'react-native-elements';
import {savingsModes} from '../../Constants/financeConstants';
import { dollarFormatter, dollarFormatterNoCents } from '../../Helpers/HelperFunctions';
import AddSavingGoalDialog from './components/dialog/AddSavingGoalDialog';
import EditSavingGoalDialog from './components/dialog/EditSavingGoalDialog';
import DeleteSavingDialog from './components/dialog/DeleteSavingGoalDialog';
import BackArrow from '../../components/BackArrow';

/**
 * @description Savings Screen where saving goals are displayed
 * @returns {JSX.Element}
 */
const SavingsScreen = () => {
    /**
     * @description Context Variables 
     */
    const { finances } = useContext(AppContext);

    /**
     * @description State variable dictating the current mode (Idle, Add, Remove, Edit)
     */
    const [currentMode, setCurrentMode] = useState(savingsModes.IDLE_MODE);

    /**
     * @description State variable to determine if an saving goal has been clicked in which case value is index of 
     * clicked goal
     */
    const [selectedIndex, setSelectedIndex] = useState(-1);

    /**
     * @description Set selected index to -1 upon switch back to idle mode
     */
    useEffect(()=>{
        if (currentMode === savingsModes.IDLE_MODE) setSelectedIndex(-1);
    },[currentMode]);

    /**
     * @description Render Saving title, piggy bank icon, add and remove button, and saving goals card
     */
    return (
        <SafeAreaView>
            <LinearGradient
                colors={['rgb(236, 254, 255)', 'rgb(165, 243, 252)', 'rgb(103, 232, 249)']}
                // colors={['#fff0cc','#f7e2ad', '#ffdc73', '#ffbf00']}
                dither
                end={{x: 0.05, y: 0.8}}
                className = 'w-full h-full flex-col'
            >
                <AddSavingGoalDialog currentMode = {currentMode} setCurrentMode = {setCurrentMode}/>
                <EditSavingGoalDialog currentMode = {currentMode} setCurrentMode = {setCurrentMode} selectedIndex = {selectedIndex}/>
                <DeleteSavingDialog currentMode = {currentMode} setCurrentMode = {setCurrentMode} selectedIndex = {selectedIndex} />
                <BackArrow colour = {'rgb(14, 116, 144)'} style = 'absolute'/>
                <VinaryTitle title = {'Savings'} style = 'flex-row justify-center items-center' textStyle = 'text-6xl pt-7 text-cyan-700'/>  
                <View className = 'self-center w-[300px] h-[300px]'>
                    <Image source = {require('../../images/finances/piggybank.jpg')} className = 'w-full h-full drop-shadow-xl'/>
                </View>
                <View className = 'flex-row justify-between items-center mx-14 -mt-6'>
                    <TouchableOpacity 
                        className = 'rounded-full border-[1px] border-white shadow-2xl shadow-blue-950'
                        onPress={()=>setCurrentMode(savingsModes.ADD_MODE)}
                    >
                        <LinearGradient
                            colors={['rgb(103, 232, 249)', '#0070ba', 'rgb(29, 78, 216)']}
                            className = 'rounded-full'
                        >
                            <Icon name = 'add' color='white' size={40}/>
                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        className = 'rounded-full border-[1px] border-white shadow-2xl shadow-blue-950'
                        onPress={()=>setCurrentMode(currentMode !== savingsModes.REMOVE_MODE ? savingsModes.REMOVE_MODE : savingsModes.IDLE_MODE)}
                    >
                        <LinearGradient
                            colors = {['rgb(103, 232, 249)', 'rgb(239, 68, 68)', 'rgb(153, 27, 27)']}
                            className = 'rounded-full'
                        >
                            <Icon name = 'remove' color='white' size={40}/>    
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
                <ScrollView className = 'flex-grow flex-col space-y-4 px-8 my-4'>
                    {finances.savings.map(({name, saved_amount, target_goal}, index)=>{
                        const percentage = Math.round((saved_amount / target_goal * 100));
                        return (
                            <TouchableOpacity 
                                className = {`rounded-xl border-white border-2 p-4 ${currentMode === savingsModes.REMOVE_MODE? 'bg-red-500' :'bg-[#0e7490]' }`}
                                onPress={()=>{
                                    if (currentMode === savingsModes.REMOVE_MODE) {
                                        setSelectedIndex(index);
                                    } else {
                                        setSelectedIndex(index);
                                        setCurrentMode(savingsModes.EDIT_MODE);
                                    };
                                }}
                            >
                                <View className = 'flex-row items-center justify-between'>
                                    <View>
                                        <Text className = 'font-bold text-lg text-white'>{name}</Text>
                                        <Text className = 'text-xl text-[#cffafe]'>{dollarFormatter.format(saved_amount)}</Text>   
                                    </View>
                                    <View className = 'flex-row items-center justify-start space-x-1'> 
                                        <Image source={require('../../images/finances/bullseye.jpg')} className = 'h-10 w-10'/>
                                        <Text className = 'text-2xl text-[#cffafe] mt-1'>{dollarFormatterNoCents.format(target_goal)}</Text>  
                                    </View>
                                </View>
                                <View className = 'flex-row items-center justify-start space-x-2'>
                                    <View className = 'flex-row items-center justify-center w-4/5 border-[1px] border-white rounded-lg h-[18px]' style = {{overflow: 'hidden'}}>
                                        <View className = {`bg-cyan-500 h-full`} style = {{width: percentage.toString() + '%'}}/>
                                        <View className = {`bg-[#fca5a5] h-full`} style = {{width: (100 - percentage).toString() + '%'}}/>
                                    </View>    
                                    <Text className = 'text-end text-xl text-white'>{percentage}%</Text>
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>
            </LinearGradient>
        </SafeAreaView>
    );
};

export default SavingsScreen;