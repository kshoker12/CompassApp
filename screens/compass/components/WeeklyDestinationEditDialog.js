import { View, Text } from 'react-native'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { AppContext } from '../../../context/AppContext';
import AddResourceDialog from '../../../components/AddResourceDialog';
import { compassModes } from '../../../Constants/compassConstants';
import PrimaryTextInput from '../../../components/PrimaryTextInput';
import { setWeeklyDestinationName, setWeeklyDestinationNotes } from '../../../Helpers/compassHelper';

/**
 * @description Edit weekly destination text 
 * @param {Object} compassContext Context variables of compass
 * @returns {JSX.Element}
 */
const WeeklyDestinationEditDialog = ({compassContext}) => {
    /** Compass Context Variables */
    const { destinationIndex, operationMode, setOperationMode, activeCompass, setStatus } = useContext(compassContext);

    /** App Context Variables */
    const { dispatch, password, compass } = useContext(AppContext);

    /** State variable indicating text */
    const [destinationText, setDestinationText] = useState('');

    /** State variable indicating name */
    const [name, setName] = useState('');

    /** Memoized active destination */
    const activeWeeklyDestination = useMemo(()=>activeCompass.weekly_destinations[destinationIndex], [destinationIndex, activeCompass]);

    /** Set destination text to text of active destination */
    useEffect(()=>{
        if (operationMode === compassModes.EDIT_MODE && activeWeeklyDestination) {
            setDestinationText(activeWeeklyDestination.notes); 
            setName(activeWeeklyDestination.name);
        }
    },[operationMode]);

    /** Weekly destination edit dialog where user can edit weekly destination text */
    return activeWeeklyDestination && (
        <AddResourceDialog
            addIndicator = {operationMode === compassModes.EDIT_MODE}
            resetAddIndicator = {()=>setOperationMode(compassModes.IDLE_MODE)}
            disabled = {destinationText.length === 0 && name.length === 0}
            title = {activeWeeklyDestination.name}
            successFunction = {async ()=> {
                await setWeeklyDestinationNotes(dispatch, activeCompass.id, activeWeeklyDestination.id, destinationText, setStatus);
                await setWeeklyDestinationName(dispatch, activeCompass.id, activeWeeklyDestination.id, name, setStatus);
            }}
        >
            <View className = 'flex-col -mt-2'>
                <PrimaryTextInput
                    text = {name}
                    setText = {setName}
                    placeholder = 'Name'
                />
                <Text className = 'text-slate-200 text-sm font-thin ml-1 mb-1'>{`${activeWeeklyDestination.points} Points`}</Text>
                <PrimaryTextInput
                    text = {destinationText}
                    setText = {setDestinationText}
                    style = 'h-48 '
                    placeholder = 'Notes'
                    returnKeyType = 'done'
                    multiline
                />    
            </View>
        </AddResourceDialog>
    );
};

export default WeeklyDestinationEditDialog;