import { View, Text, TouchableOpacity } from 'react-native'
import React, { useContext, useMemo, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import DeleteConfirmationDialog from '../../../components/DeleteConfirmationDialog';
import * as compassHelper from '../../../Helpers/compassHelper';
import { AppContext } from '../../../context/AppContext';
import PrimaryCheckBox from '../../../components/PrimaryCheckBox';
import { destinationModes } from '../../../Constants/compassConstants';
import PrimaryItemCard from '../../../components/PrimaryItemCard';
import IconButton from '../../../components/IconButton';
/**
 * @description Destination button
 * @param {Object} destination Destination object
 * @param {number} index Index of destination
 * @param {Object} destinationContext Context variables for destination screen
 * @returns {JSX.Element}
 */
const DestinationButton = ({destination, index, destinationContext}) => {
    /** Context Variables */
    const { dispatch, password, compass} = useContext(AppContext);

    /** Responsibility Context Variables */
    const { setLoading, operationMode, setStatus, setOperationMode, destinationIndex, setDestinationIndex, type, currentCompass} = useContext(destinationContext);
    
    /** Indicator whether delete confirmation prompt is active */
    const [deleteIndicator, setDeleteIndicator] = useState(false);

    /** Render Subtask button displaying subtask name and duration */
    return (
        <PrimaryItemCard
            active = {destinationIndex === index}
            complete = {destination.arrived}
            deleteMode = {destinationModes.REMOVE_MODE === operationMode}
            clickAction = {()=>operationMode === destinationModes.REMOVE_MODE ? setDeleteIndicator(true) : setDestinationIndex(destinationIndex === index ? -1 : index)}
        >
            <DeleteConfirmationDialog
                deleteIndicator = {deleteIndicator}
                setDeleteIndicator = {setDeleteIndicator}
                setStatus = {setStatus}
                successAction = {async ()=> {
                    setLoading(true);
                    if (type === 'yearly') await compassHelper.removeDestinationFromYearlyCompass(dispatch, currentCompass.id, destination.id, setStatus); else await compassHelper.removeDestinationFromMonthlyCompass(dispatch, currentCompass.id, destination.id, setStatus);
                    setLoading(false);
                    setOperationMode(destinationModes.IDLE_MODE);
                }}
            />
            <View className = 'flex-col p-2'>
                <View className = 'flex-row justify-between items-center'>
                    <Text className = 'text-slate-200 text-xl'>{destination.name}</Text>
                </View>
                {destinationIndex === index && (
                    <View className = 'my-2 flex-col'>
                        <View className = ''>
                            <Text className = 'text-slate-200 font-thin'>{destination.notes}</Text>
                        </View>    
                        <View className = 'flex-col items-center justify-center w-12 m-2 self-end'>
                            <IconButton
                                className = 'bg-primary-darkPurple border-primary-lightPurple p-2.5'
                                icon = 'pen'
                                type = 'font-awesome'
                                solid = {'true'}
                                color = '#e2e8f0'
                                onPress = {()=>setOperationMode(destinationModes.EDIT_MODE)}
                            />    
                        </View>
                    </View>
                )}
            </View>
        </PrimaryItemCard>
    );
};

export default DestinationButton;