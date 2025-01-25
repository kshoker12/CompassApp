import React, { useContext, useEffect, useState } from 'react'
import { Text, TextInput, View } from 'react-native'
import { Dialog } from 'react-native-elements'
import ComponentLoader from './ComponentLoader';
import OperationButton from './OperationButton';

/**
 * @description Dialog box used to Add new resource
 * @param {boolean} addIndicator Current operation mode
 * @param {Function} resetAddIndicator Function to reset add indicator
 * @param {boolean} disabled Indicator whether submission is disabled
 * @param {string} title Title of dialog
 * @param {JSX.Element} children Child element of this component
 * @param {Function} successFunction Function to add resource
 * @returns {JSX.Element}
 */
const AddResourceDialog = ({addIndicator, resetAddIndicator, disabled = false, title, children, successFunction}) => {
    /** Indicator for user that content is being updated */
    const [loading, setLoading] = useState(false);

    /** Styling for dialog component */
    const dialogStyling = {
        backgroundColor: '#2c2e45',
        borderColor: 'rgb(168, 85, 247)',
        borderWidth: 1,
        padding: 15,
        borderRadius: 10,
        width: 370
    }

    /** Dialog where user can add resource */
    return (
        <Dialog
            isVisible={addIndicator}
            onBackdropPress={()=>resetAddIndicator()}
            overlayStyle = {dialogStyling}
        >
            <View className = "items-center w-fit bg-[#2c2e45]">
                <View className = 'self-start left-5'>
                    <Text className = 'text-lg text-slate-200'>{title}</Text>    
                </View>
                <View className = 'w-[90%] my-2'>
                    {children}
                </View>
                <View className = 'flex-row items-center justify-between space-x-6 py-4 w-[90%]'>
                    <OperationButton
                        title = 'Cancel'
                        style = 'bg-slate-200 w-32 '
                        textStyle = 'text-center text-black text-lg'
                        clickAction = {()=>resetAddIndicator()}
                    />
                    <OperationButton
                        title = 'Confirm'
                        style = {`bg-[#6c71a6] w-32 ${disabled ? 'opacity-30' : 'opacity-1'} `}
                        textStyle = 'text-center text-lg'
                        disabled = {disabled}
                        clickAction = {async ()=>{
                            setLoading(true);
                            await successFunction();
                            setLoading(false);
                            resetAddIndicator();
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

export default AddResourceDialog;