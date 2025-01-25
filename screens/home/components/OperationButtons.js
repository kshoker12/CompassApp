import { View, Text } from 'react-native'
import React from 'react'
import IconButton from '../../../components/IconButton';
import { useNavigation } from '@react-navigation/native';

/**
 * @description Operation buttons for the home page
 * @module Solutions Button to solutions route
 * @module MasterKey Button to master key route
 * @module Dreams Button to dreams route
 * @returns {JSX.Element}
 */
const OperationButtons = () => {
    /** Navigation object */
    const navigation = useNavigation();

    /** Render button for each route */
    return (
        <View className = 'space-y-2 flex-col items-center w-full'>
            <IconButton 
                className = 'bg-slate-300 border-primary-lightPurple px-3 py-2'
                icon = 'chess-knight'
                onPress = {()=>navigation.navigate('Solutions')}
            />
            <IconButton
                className = 'bg-slate-300 border-primary-lightPurple p-2'
                icon = 'moon'
                onPress = {()=>navigation.navigate('Dreams')}
            />
            <IconButton
                className = 'bg-slate-300 border-primary-lightPurple p-2'
                icon = 'calendar-check'
                onPress = {()=>navigation.navigate('UpcomingDue')}
            />
        </View>    
    )
};

export default OperationButtons;