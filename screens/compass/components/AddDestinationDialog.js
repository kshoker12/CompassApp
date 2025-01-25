import { View, Text } from 'react-native'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { AppContext } from '../../../context/AppContext';
import AddResourceDialog from '../../../components/AddResourceDialog';
import { destinationModes } from '../../../Constants/compassConstants';
import PrimaryTextInput from '../../../components/PrimaryTextInput';
import { addDestinationToMonthlyCompass, addDestinationToYearlyCompass, } from '../../../Helpers/compassHelper';

/**
 * @description Add new destination  
 * @param {Object} destinationContext Context variables of destination screen
 * @returns {JSX.Element}
 */
const AddDestinationDialog = ({destinationContext}) => {
    /** Compass Context Variables */
    const { operationMode, setOperationMode, setStatus, setLoading, type, currentCompass } = useContext(destinationContext);

    /** App Context Variables */
    const { dispatch, password, compass } = useContext(AppContext);

    /** State variable indicating name */
    const [name, setName] = useState('');

    /** Set destination text to text of active destination */
    useEffect(()=>{
        if (operationMode === destinationModes.ADD_MODE) {
            setName('');
        }
    },[operationMode]);

    /** Add destination dialog where user can add destination through primary text input */
    return (
        <AddResourceDialog
            addIndicator = {operationMode === destinationModes.ADD_MODE}
            resetAddIndicator = {()=>setOperationMode(destinationModes.IDLE_MODE)}
            disabled = {name.length === 0}
            title = {'Add new destination'}
            successFunction = {async ()=> {
                setLoading(false);
                if (type === 'yearly') await addDestinationToYearlyCompass(dispatch, currentCompass.id, name, setStatus); else await addDestinationToMonthlyCompass(dispatch, currentCompass.id, name, setStatus);
                setLoading(false);
            }}
        >
            <View className = 'flex-col -mt-2'>
                <PrimaryTextInput
                    text = {name}
                    setText = {setName}
                    placeholder = 'Name'
                />
            </View>
        </AddResourceDialog>
    );
};

export default AddDestinationDialog;