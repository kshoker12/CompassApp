import { View, Text, TextInput } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { Dialog } from 'react-native-elements';
import ComponentLoader from '../../../components/ComponentLoader';
import OperationButton from '../../../components/OperationButton';
import { solutionModes } from '../../../Constants/solutionConstants';
import { AppContext } from '../../../context/AppContext';
import { addSolution } from '../../../Helpers/solutionsHelper';

/**
 * @description Dialog box used to add problems
 * @param {boolean} currentMode  Current mode of solution screen
 * @param {Function} setCurrentMode Function to change mode of solution screen
 * @returns {JSX.Element}
 */
const AddSolutionDialog = ({currentMode, setCurrentMode}) => {
    /** Context Variables */
    const {dispatch, password} = useContext(AppContext);

    /** Indicator for user that content is being updated */
    const [loading, setLoading] = useState(false);

    /** State variable indicating name of problem text*/
    const [problemText, setProblemText] = useState('');

    /** Reset problem text upon dialog being activated */
    useEffect(()=>{
        if (currentMode === solutionModes.ADD_SOLUTION) setProblemText('');
    },[currentMode]);

    /** Styling for dialog component */
    const dialogStyling = {
        backgroundColor: '#2c2e45',
        borderColor: 'rgb(168, 85, 247)',
        borderWidth: 1,
        padding: 15,
        borderRadius: 10,
        width: 370
    }

    /** Dialog where user types in problem name */
    return (
        <Dialog
            isVisible={currentMode === solutionModes.ADD_SOLUTION}
            onBackdropPress={()=>setCurrentMode(solutionModes.IDLE_MODE)}
            overlayStyle = {dialogStyling}
        >
            <View className = "items-center w-fit bg-[#2c2e45]">
                <View className = 'self-start left-5'>
                    <Text className = 'text-lg text-slate-200'>Input Problem to solve</Text>    
                </View>
                <View className = 'w-[90%] my-2'>
                    <TextInput
                        className = 'rounded-lg border-[1px] border-slate-200 py-2 text-base text-slate-200 px-3 bg-[#1a1b2a] opacity-95'
                        value={problemText}
                        onChangeText={(text)=>setProblemText(text)}
                        blurOnSubmit
                        returnKeyType='done'
                        placeholder='Problem'
                        placeholderTextColor={'gray'}
                        
                    />
                </View>
                
                <View className = 'flex-row items-center justify-between space-x-6 py-4 w-[90%]'>
                    <OperationButton
                        title = 'Cancel'
                        style = 'bg-slate-200 w-32 '
                        textStyle = 'text-center text-black text-lg'
                        clickAction = {()=>setCurrentMode(solutionModes.IDLE_MODE)}
                    />
                    <OperationButton
                        title = 'Confirm'
                        style = {`bg-[#6c71a6] w-32 ${problemText.length === 0 ? 'opacity-30' : 'opacity-1'} `}
                        textStyle = 'text-center text-lg'
                        disabled = {problemText.length === 0}
                        clickAction = {async ()=>{
                            setLoading(true);
                            await addSolution(dispatch, problemText);
                            setLoading(false);
                            setCurrentMode(solutionModes.IDLE_MODE);
                        }}
                    />
                    <ComponentLoader
                        title = 'Adding'
                        style = 'absolute right-8 -bottom-3 '
                        textStyle = 'text-slate-200'
                        indicatorStyling = 'white'
                        loading = {loading}
                    />
                </View>
            </View>
        </Dialog>
    );
};

export default AddSolutionDialog;