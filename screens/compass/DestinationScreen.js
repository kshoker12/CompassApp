import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React, { createContext, useContext, useMemo, useRef, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import BackgroundImage from '../../components/BackgroundImage';
import { useNavigation } from '@react-navigation/native';
import AlertChip from '../../components/AlertChip';
import ScreenLoader from '../../components/ScreenLoader';
import DreamMeadowTitle from '../../components/DreamMeadowTitle';
import { destinationModes } from '../../Constants/compassConstants';
import PrimarySpeedDial from '../../components/PrimarySpeedDial';
import BackArrow from '../../components/BackArrow';
import AddDestinationDialog from './components/AddDestinationDialog';
import DestinationButton from './components/DestinationCard';
import EditDestinationDialog from './components/EditDestinationDialog';

/** Destination context */
const destinationContext = createContext();

/**
 * @description Destination screen including all destinations of a given compass
 * @param {Object} route Route object
 * @returns {JSX.Element}
 */
const DestinationScreen = ({route}) => {
    /** Context Variables */
    const { compass, dispatch, password } = useContext(AppContext);

    /** Extract memoized route parameters */
    const { yearlyCompassId, monthlyCompassId, type} = useMemo(()=>route.params, []);

    /** Compute memoized properties of compass based on type */
    const currentCompass = useMemo(()=>{
        /** Initialize properties to extract */
        let currentCompass, addFunction, removeFunction;

        /** Extract appropriate data based on type */
        if (type === 'yearly') {
            currentCompass = compass.yearly_compasses.find(yearlyCompass => yearlyCompass.id === yearlyCompassId);    
        } else {
            currentCompass = compass.yearly_compasses.find(yearlyCompass => yearlyCompass.id === yearlyCompassId).monthly_compasses.find(monthlyCompass => monthlyCompass.id === monthlyCompassId);
        };
        return currentCompass;
    }, [compass]);

    /** Navigation object */
    const navigation = useNavigation();

    /** Indicator whether an operation mode is active */
    const [operationMode, setOperationMode] = useState(destinationModes.IDLE_MODE);

    /** Status of operations */
    const [status, setStatus] = useState(null);
    
    /** Indicator that user-requested action is being conducted */
    const [loading, setLoading] = useState(false);

    /** Active destination index */
    const [destinationIndex, setDestinationIndex] = useState(-1);

    /** Memoized speed dial actions */
    const speedDialActions = useMemo(()=>{
        /** Speed dial action data to finish week */
        const add = {icon: 'add', type: 'material', action: ()=> setOperationMode(destinationModes.ADD_MODE)};

        /** Speed dial action data to add mistake */
        const remove = {icon: 'remove', type: 'material', action: ()=> setOperationMode(operationMode === destinationModes.REMOVE_MODE ? destinationModes.IDLE_MODE : destinationModes.REMOVE_MODE)};

        /** Return computed speed dial actions */
        return [add, remove];
    }, [operationMode]);

    /** Render all destinations of active compass */
    return (
        <destinationContext.Provider
            value={{loading, setLoading, setOperationMode, operationMode, status, setStatus, destinationIndex, setDestinationIndex, currentCompass, type}}
        >
            <SafeAreaView>
                <EditDestinationDialog destinationContext = {destinationContext}/>
                <AddDestinationDialog destinationContext = {destinationContext}/>
                <View className = 'w-full h-full flex-col'>
                    <BackgroundImage imagePath = {require('../../images/compassbg.heic')} shade = 'bg-violet-950'/>
                    <DreamMeadowTitle title = 'Compass' style = 'self-center' textStyle = 'text-slate-200 text-7xl pt-6'/>
                    <BackArrow
                        style = 'absolute self-start m-2 z-30 '
                        colour = 'rgb(226, 232, 240)'
                    />
                    <AlertChip
                        status = {status}
                        setStatus = {setStatus}
                        style = 'absolute z-50 bg-slate-200'
                        textStyle = 'text-white'
                        iconColor = '#e2e8f0'
                    />
                    <ScreenLoader
                        title = 'Loading...'
                        textStyle = 'text-white'
                        indicatorStyling = 'white'
                        style = 'absolute'
                        loading = {loading}
                    />
                    <View className = 'bg-primary-purple border-primary-lightPurple border-[1px] rounded-lg px-4 py-1 mb-1 mx-10'>
                        <Text className = 'text-slate-200 text-lg text-center'>{`${currentCompass.name} Destinations`}</Text>
                    </View>
                    <ScrollView className = 'flex-grow flex-col mb-6 z-30'>
                        {currentCompass.destinations.map((destination, index)=>(
                            <DestinationButton
                                destination = {destination}
                                index = {index}
                                destinationContext = {destinationContext}
                            />
                        ))}
                    </ScrollView>
                    <PrimarySpeedDial
                        speedDialActions = {speedDialActions}
                    />
                </View>
            </SafeAreaView>    
        </destinationContext.Provider>
    );
};

export default DestinationScreen;