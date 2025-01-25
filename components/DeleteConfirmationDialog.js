import React, { useContext, useState } from 'react'
import { Text, View } from 'react-native'
import { Dialog } from 'react-native-elements'
import { AppContext } from '../context/AppContext';
import ComponentLoader from './ComponentLoader';
import OperationButton from './OperationButton';

/**
 * @description Dialog box used to confirm deletion of responsibility
 * @param {boolean} deleteIndicator Indicator whether to show delete dialog
 * @param {Function} setDeleteIndicator Function changing value of delete indicator
 * @param {string} successAction Action to conduct upon user selecting yes
 * @param {Function} setStatus Function to set status
 * @returns {JSX.Element}
 */
const DeleteConfirmationDialog = ({deleteIndicator, setDeleteIndicator, successAction, setStatus}) => {
    /** Context Variables */
    const {dispatch, password} = useContext(AppContext);

    /** Indicator for user that content is being updated */
    const [loading, setLoading] = useState(false);

    /** Styling for dialog component */
    const dialogStyling = {
        backgroundColor: '#2c2e45',
        borderColor: 'rgb(168, 85, 247)',
        borderWidth: 1,
        padding: 15,
        borderRadius: 10 
    }

    /** Render delete dialog asking for confirmation */
    return (
        <Dialog
            isVisible={deleteIndicator}
            onBackdropPress={()=>setDeleteIndicator(false)}
            overlayStyle = {dialogStyling}

        >
            <View className = " items-center w-fit bg-[#2c2e45] ">
                <Text className = 'text-lg text-slate-200'>Are you sure you want to delete?</Text>
                <ComponentLoader
                    title = 'Deleting'
                    style = 'absolute self-center -bottom-2'
                    textStyle = 'text-slate-200'
                    indicatorStyling = 'white'
                    loading = {loading}
                />
                <View className = 'flex-row items-center justify-between space-x-6 py-4 w-3/4'>
                    <OperationButton
                        title = 'Yes'
                        style = 'bg-[#6c71a6] w-24'
                        textStyle = 'text-center'
                        clickAction = {async ()=>{
                            setLoading(true);
                            await successAction();
                            setLoading(false);
                            setDeleteIndicator(false);
                        }}
                    />
                    <OperationButton
                        title = 'No'
                        style = 'bg-slate-200 w-24 '
                        textStyle = 'text-center text-black'
                        clickAction = {()=>setDeleteIndicator(false)}
                    />
                </View>
            </View>
        </Dialog>
    );
};

export default DeleteConfirmationDialog;