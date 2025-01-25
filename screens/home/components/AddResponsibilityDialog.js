import React, { useContext, useEffect, useState } from 'react'
import { Text, TextInput, View } from 'react-native'
import { Dialog } from 'react-native-elements'
import { AppContext } from '../../../context/AppContext';
import ComponentLoader from '../../../components/ComponentLoader';
import OperationButton from '../../../components/OperationButton';
import { homeModes } from '../../../Constants/homeConstants';
import * as beastmodeHelper from '../../../Helpers/beastmodeHelper';
import PrimaryTextInput from '../../../components/PrimaryTextInput';

/**
 * @description Dialog box used to Add new responsibility
 * @param {boolean} operationMode Current operation mode
 * @param {Function} setOperationMode Function to change operation mode
 * @param {Function} setStatus Function to set status 
 * @returns {JSX.Element}
 */
const AddResponsibilityDialog = ({operationMode, setOperationMode, setStatus}) => {
    /** Context Variables */
    const {dispatch, password} = useContext(AppContext);

    /** Indicator for user that content is being updated */
    const [loading, setLoading] = useState(false);

    /** State variable indicating name of responsibility name*/
    const [responsibilityName, setResponsibilityName] = useState('');

    /** Reset problem text upon dialog being activated */
    useEffect(()=>{
        if (operationMode === homeModes.ADD_MODE) setResponsibilityName('');
    },[operationMode]);

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
            isVisible={operationMode === homeModes.ADD_MODE}
            onBackdropPress={()=>setOperationMode(homeModes.IDLE_MODE)}
            overlayStyle = {dialogStyling}
        >
            <View className = "items-center w-fit bg-[#2c2e45]">
                <View className = 'self-start left-5'>
                    <Text className = 'text-lg text-slate-200'>Responsibility Name</Text>    
                </View>
                <View className = 'w-[90%] my-2'>
                    <PrimaryTextInput
                        text = {responsibilityName}
                        setText = {setResponsibilityName}
                        placeholder = 'Responsibility'
                    />
                </View>
                <View className = 'flex-row items-center justify-between space-x-6 py-4 w-[90%]'>
                    <OperationButton
                        title = 'Cancel'
                        style = 'bg-slate-200 w-32 '
                        textStyle = 'text-center text-black text-lg'
                        clickAction = {()=>setOperationMode(homeModes.IDLE_MODE)}
                    />
                    <OperationButton
                        title = 'Confirm'
                        style = {`bg-[#6c71a6] w-32 ${responsibilityName.length === 0 ? 'opacity-30' : 'opacity-1'} `}
                        textStyle = 'text-center text-lg'
                        disabled = {responsibilityName.length === 0}
                        clickAction = {async ()=>{
                            setLoading(true);
                            await beastmodeHelper.addResponsibility(dispatch, responsibilityName, setStatus)
                            setLoading(false);
                            setOperationMode(homeModes.IDLE_MODE);
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

export default AddResponsibilityDialog;