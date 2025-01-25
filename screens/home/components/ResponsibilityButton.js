import { Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient';
import { homeModes } from '../../../Constants/homeConstants';
import DeleteResponsibilityDialog from './DeleteResponsibilityDialog';

/**
 * @description Responsibility Button 
 * @param {string} name Name of responsibility
 * @param {number} hours Number of hours spent working on responsibility
 * @param {number} id ID of responsibility
 * @param {number} operationMode Current operation mode
 * @param {Function} setOperationMode Function to change operation mode
 * @param {Function} setStatus Function to set status
 * @returns {JSX.Element}
 */
const ResponsibilityButton = ({name, hours, id, operationMode, setOperationMode, setStatus}) => {
    /** Navigation Object */
    const navigation = useNavigation();

    /** Indicator whether delete confirmation prompt is active */
    const [deleteIndicator, setDeleteIndicator] = useState(false);

    /** Render responsibility button with name and hours spent along with functionality */
    return (
        <TouchableOpacity
            className = 'border-primary-lightPurple border-[1px] ml-2 opacity-90 rounded-2xl overflow-hidden mb-2'
            onPress={()=>operationMode === homeModes.DELETE_MODE ? setDeleteIndicator(true) : navigation.navigate('Responsibility', {id: id})}
            key={id}
        >
            <DeleteResponsibilityDialog deleteIndicator = {deleteIndicator} setDeleteIndicator = {setDeleteIndicator} responsibilityId = {id} setOperationMode = {setOperationMode} setStatus = {setStatus}/>
            <LinearGradient
                colors={operationMode !== homeModes.DELETE_MODE ? ['#2c2e45', '#6b21a8', 'black'] : ['#2c2e45', 'red', 'black']}
                start={{x: 0.1, y: 0}}
                end={{x: 1, y: 1}}
                className = 'py-1 px-4'
            >
                <Text className = 'text-slate-200 text-2xl font-thin'>{name}</Text>
                <Text className = 'text-slate-200 text-sm'>{`${hours} ${hours === 1 ? 'Hour' : 'Hours'}`}</Text>    
            </LinearGradient>
        </TouchableOpacity>
    );
};

export default ResponsibilityButton;