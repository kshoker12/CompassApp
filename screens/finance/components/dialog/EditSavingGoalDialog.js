import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { Dialog } from 'react-native-elements'
import { BANKING_CARDS, savingsModes } from '../../../../Constants/financeConstants'
import OperationButton from '../../../../components/OperationButton';
import { AppContext } from '../../../../context/AppContext';
import { dollarRegex } from '../../../../Helpers/HelperFunctions';
import { LinearGradient } from 'expo-linear-gradient';
import SavingGoalFunds from './SavingGoalFunds';
import ComponentLoader from '../../../../components/ComponentLoader';
import { editSavingGoal } from '../../../../Helpers/financesHelper';

/**
 * @description Dialog to view and edit saving goal properties such as 
 * amount saved, target, and name
 * @param {number} currentMode -> Current Mode of savings screen
 * @param {Function} setCurrentMode -> Function to switch modes of saving screen
 * @param {number} selectedIndex -> Index of clicked saving goal
 * @returns {JSX.Element}
 */
const EditSavingGoalDialog = ({currentMode, setCurrentMode, selectedIndex}) => {
    /** Context Variables */
    const { finances, password, dispatch } = useContext(AppContext);

    /** State variable determining operation type */
    const [operationType, setOperationType] = useState(null);

    /** Text input for new savings goal name */
    const [goalName, setGoalName] = useState('');

    /** Number input for new saving target */
    const [target, setTarget] = useState('');

    /** Indicator whether there is an error with input */
    const [error, setError] = useState(false);

    /** State variable indicating user-requested action is being conducted */
    const [loading, setLoading] = useState(false);

    /** Memoized saving goal being edited */
    const savingGoal = useMemo(()=>{
        if (selectedIndex !== -1) {
            const goal = finances.savings[selectedIndex];
            setGoalName(goal.name);
            setTarget(goal.target_goal.toString());
            setOperationType(null);
            return goal;  
        }
    }, [selectedIndex]);

    /** Throw error if new target amount is less than saved amount of current saving goal */
    useEffect(()=>{
        if (selectedIndex !== -1) setError(isNaN(parseFloat(target)) || parseFloat(target) <= 0 || finances.savings[selectedIndex].saved_amount > parseFloat(target));
    },[target]);

    
    /**
     * @description Render Edit dialog including options to edit saving name, target, and saved amount
     */
    return (
        <>
            <SavingGoalFunds operationType = {operationType} setOperationType = {setOperationType} selectedIndex = {selectedIndex}/>
            <Dialog
                isVisible = {currentMode === savingsModes.EDIT_MODE && selectedIndex >= 0 && operationType === null}
                onBackdropPress = {()=> setCurrentMode(savingsModes.IDLE_MODE)}
                overlayStyle = {{
                    width: 330,
                    backgroundColor: 'rgb(226, 232, 240)'
                }}
            >
                <View className = 'flex-col space-y-3'>
                    <View className = 'space-y-1 flex-col'>
                        <Text className = 'text-2xl font-thin'>Goal Name</Text>
                        <TextInput 
                            className = 'text-black text-lg p-1 bg-white shadow-black shadow-2xl' 
                            style = {{shadowRadius: 6, shadowOffset: 2, textShadowColor: 'black', textShadowRadius: 0.5}}
                            value={goalName} 
                            onChangeText={(text)=>setGoalName(text)}
                            blurOnSubmit
                            returnKeyType ='done'
                        />
                    </View>
                    <View>
                        <Text className = 'text-2xl font-thin'>Target Amount</Text>
                        <Text className = 'absolute self-start bottom-1 left-2 text-xl z-10'>$</Text>
                        <TextInput
                            className = 'text-black text-lg px-1 pb-1.5 pl-8 bg-white shadow-black shadow-2xl'
                            style = {{shadowRadius: 6, shadowOffset: 2, textShadowColor: 'black', textShadowRadius: 0.5}}
                            value={target}
                            onChangeText={(text)=> setTarget(text.replace(dollarRegex, '$1'))}
                            blurOnSubmit
                            returnKeyType='done'
                            keyboardType='numeric'
                        />
                        {error && (
                            <View className = 'absolute -bottom-4'>
                                <Text className = 'text-red-700 text-[10px]'>Error: Invalid target amount</Text>
                            </View>
                        )}
                    </View>  
                    <View>
                        <Text className = 'text-2xl font-thin'>Amount Saved</Text>
                        <View className = 'flex-row items-center justify-start space-x-2'>
                            <Text className = 'self-start text-xl z-10'>$ {savingGoal && savingGoal.savedAmount}</Text>
                            <View className = 'flex-row items-center justify-center space-x-2'>
                                <TouchableOpacity 
                                    className = 'rounded-lg overflow-hidden'
                                    onPress={()=>setOperationType('add')}
                                >
                                    <LinearGradient
                                        colors={['rgb(103, 232, 249)', '#0070ba', 'rgb(29, 78, 216)']}
                                        className = 'px-2 py-1.5'
                                    >
                                        <Text className = 'text-center text-white'>Add Funds</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    className = 'rounded-lg overflow-hidden'
                                    onPress={()=>setOperationType('remove')}
                                >
                                    <LinearGradient
                                        colors = {['rgb(103, 232, 249)', 'rgb(239, 68, 68)', 'rgb(153, 27, 27)']}
                                        className = 'px-2 py-1.5'
                                    >
                                        <Text className = 'text-center text-white'>Remove Funds</Text>
                                    </LinearGradient>
                                </TouchableOpacity>     
                            </View>
                        </View>
                    </View>  
                    <OperationButton
                        style = {`self-start my-4 ${error ? 'opacity-30' : 'opacity-1'} `}
                        clickAction = {async ()=>{
                            setLoading(true);
                            await editSavingGoal(dispatch, finances.savings[selectedIndex].id, goalName, target);
                            setLoading(false);
                            setCurrentMode(savingsModes.IDLE_MODE)
                        }}
                        disabled = {error}
                        textStyle = 'text-lg'
                        title = 'Confirm'
                    />
                    <ComponentLoader
                        title = 'Updating'
                        textStyle = ''
                        indicatorStyling = ''
                        style = 'self-start absolute left-2 -bottom-2 '
                        loading = {loading}
                    />
                </View>
            </Dialog>
        </>
    );
};

export default EditSavingGoalDialog;