import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Dialog } from 'react-native-elements'
import { savingsModes } from '../../../../Constants/financeConstants'
import { dollarRegex } from '../../../../Helpers/HelperFunctions';
import OperationButton from '../../../../components/OperationButton';
import ComponentLoader from '../../../../components/ComponentLoader';
import { addSavingGoal } from '../../../../Helpers/financesHelper';
import { AppContext } from '../../../../context/AppContext';

/**
 * @description Dialog to add new savings goal with target price input
 * @param {number} currentMode -> Current Mode of savings screen
 * @param {Function} setCurrentMode -> Function to switch modes of saving screen
 * @returns {JSX.Element}
 */
const AddSavingGoalDialog = ({currentMode, setCurrentMode}) => {
    /** Context Variables */
    const { dispatch, password } = useContext(AppContext);

    /**
     * @description Text input for new savings goal name
     */
    const [goalName, setGoalName] = useState('');

    /**
     * @description Number input for new saving target
     */
    const [target, setTarget] = useState('');

    /**
     * @description State variable indicating user-requested action is being conducted
     */
    const [loading, setLoading] = useState(false);

    /** Reset goal and target upon dialog initializing */
    useEffect(()=>{
        setGoalName('');
        setTarget('');
    },[currentMode]);

    /**
     * @description Return Add Saving goal dialog with an input field for both goal name and target
     */
    return (
        <Dialog
            isVisible = {currentMode === savingsModes.ADD_MODE}
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
                </View>  
                <OperationButton
                    style = 'self-start my-4 '
                    clickAction = {async ()=>{
                        setLoading(true);
                        await addSavingGoal(dispatch, goalName, parseFloat(target));
                        setLoading(false);
                        setCurrentMode(savingsModes.IDLE_MODE);
                    }}
                    textStyle = 'text-lg'
                    title = 'Set Saving Goal'
                />
                <ComponentLoader    
                    title = 'Adding'
                    textStyle = ''
                    style = 'absolute -bottom-2 left-2 self-start '
                    indicatorStyle = ''
                    loading = {loading}
                />
            </View>
        </Dialog>
    );
};
export default AddSavingGoalDialog;