import { View, Text } from 'react-native'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { AppContext } from '../../../context/AppContext';
import AddResourceDialog from '../../../components/AddResourceDialog';
import { compassModes, destinationModes } from '../../../Constants/compassConstants';
import PrimaryTextInput from '../../../components/PrimaryTextInput';
import { editDestinationNotes, markDestinationAchieved } from '../../../Helpers/compassHelper';
import PrimaryCheckBox from '../../../components/PrimaryCheckBox';

/**
 * @description Edit compass destination text 
 * @param {Object} destinationContext Context variables of destination
 * @returns {JSX.Element}
 */
const EditDestinationDialog = ({destinationContext}) => {
    /** Destination context Variables */
    const { destinationIndex, operationMode, setOperationMode, currentCompass, setStatus, setLoading } = useContext(destinationContext);

    /** App Context Variables */
    const { dispatch, password, compass } = useContext(AppContext);

    /** State variable indicating text */
    const [destinationText, setDestinationText] = useState('');

    /** Indicator if destination is achieved */
    const [achieved, setAchieved] = useState(false);

    /** Memoized active destination */
    const activeWeeklyDestination = useMemo(()=>currentCompass.destinations[destinationIndex], [destinationIndex, compass]);

    /** Set destination text to text of active destination */
    useEffect(()=>{
        if (operationMode === destinationModes.EDIT_MODE && activeWeeklyDestination) {
            setDestinationText(activeWeeklyDestination.notes); 
            setAchieved(activeWeeklyDestination.arrived);
        };
    },[operationMode]);

    /** Weekly destination edit dialog where user can edit weekly destination text */
    return activeWeeklyDestination && (
        <AddResourceDialog
            addIndicator = {operationMode === destinationModes.EDIT_MODE}
            resetAddIndicator = {()=>setOperationMode(destinationModes.IDLE_MODE)}
            disabled = {destinationText.length === 0}
            title = {activeWeeklyDestination.name}
            successFunction = {async ()=> {
                await editDestinationNotes(dispatch, activeWeeklyDestination.id, destinationText, setStatus);
            }}
        >
            <View className = 'flex-col mt-1'>
                <PrimaryTextInput
                    text = {destinationText}
                    setText = {setDestinationText}
                    style = 'h-48 '
                    placeholder = 'Notes'
                    returnKeyType = 'done'
                    multiline
                />    
                <PrimaryCheckBox
                    checked = {activeWeeklyDestination.arrived}
                    clickAction = {async ()=>{
                        if (!achieved) {
                            setLoading(true);
                            await markDestinationAchieved(dispatch, activeWeeklyDestination.id, setStatus);
                            setLoading(false);    
                        };
                    }}
                    title = 'Arrived'
                    style = ''
                />
            </View>
        </AddResourceDialog>
    );
};

export default EditDestinationDialog;