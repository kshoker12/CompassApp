import { View, Text, TouchableOpacity } from 'react-native'
import React, { useContext, useMemo, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import DeleteConfirmationDialog from '../../../components/DeleteConfirmationDialog';
import { AppContext } from '../../../context/AppContext';
import { formatMinutes } from '../../../Helpers/HelperFunctions';
import PrimaryCheckBox from '../../../components/PrimaryCheckBox';
import { viewCompassModes } from '../../../Constants/compassConstants';
import { computeYearlyCompassHours, computeYearlyCompassPercentage, deleteYearlyCompass, isYearlyCompassCompleted } from '../../../Helpers/compassHelper';

/**
 * @description Yearly compass button
 * @param {Object} yearlyCompass Yearly compass object
 * @param {Object} viewCompassContext View compass context
 * @returns {JSX.Element}
 */
const YearlyCompassButton = ({yearlyCompass, viewCompassContext}) => {
    /** Navigation object */
    const navigation = useNavigation();

    /** Context Variables */
    const { dispatch, password} = useContext(AppContext);

    /** Responsibility Context Variables */
    const { setLoading, operationMode, setStatus, setOperationMode} = useContext(viewCompassContext);
    
    /** Indicator whether delete confirmation prompt is active */
    const [deleteIndicator, setDeleteIndicator] = useState(false);

    /** Memoized yearly compass percentage */
    const percentage = useMemo(()=>computeYearlyCompassPercentage(yearlyCompass), [yearlyCompass]);

    /** Memoized completed indicator */
    const completed = useMemo(()=> isYearlyCompassCompleted(yearlyCompass), [yearlyCompass]);

    /** Memoized completed hours */
    const hours = useMemo(()=> computeYearlyCompassHours(yearlyCompass), [yearlyCompass]);

    /** Render Subtask button displaying subtask name and duration */
    return (
        <TouchableOpacity
            className = 'border-primary-lightPurple border-[1px] mx-6 opacity-90 rounded-xl my-2 overflow-hidden mb-2'
            onPress={()=>operationMode === viewCompassModes.REMOVE_MODE ? setDeleteIndicator(true) : navigation.navigate('YearlyCompass', {yearlyCompassId: yearlyCompass.id})}
        >
            <DeleteConfirmationDialog 
                setDeleteIndicator = {setDeleteIndicator} 
                deleteIndicator = {deleteIndicator}
                setStatus = {setStatus}
                successAction = {async ()=>{
                    setOperationMode(viewCompassModes.IDLE_MODE);
                    await deleteYearlyCompass(dispatch, yearlyCompass.id, setStatus);
                }}
            />
            <LinearGradient
                colors={operationMode !== viewCompassModes.REMOVE_MODE ? ['#2c2e45', (completed ? '#4f6962' : '#6b21a8'), 'black'] : ['#2c2e45', 'red', 'black']}
                start={{x: 0.1, y: 0}}
                end={{x: 1, y: 1}}
                className = 'py-1 px-4'
            >
                <Text className = 'text-slate-200 text-2xl font-thin'>{yearlyCompass.name}</Text>  
                <View className = 'flex-row justify-between items-center'>
                    <Text className = 'text-slate-200 font-semibold text-base'>{`${hours} ${hours === 1 ? 'Hour' : 'Hours'}`}</Text>
                    <Text className = 'text-slate-200 font-semibold text-base'>{`${percentage.toFixed(1)}%`}</Text>   
                </View>
                 
            </LinearGradient>
        </TouchableOpacity>
    );
};

export default YearlyCompassButton;