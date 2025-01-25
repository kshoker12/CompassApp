import { View, Text } from 'react-native'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { AppContext } from '../../../context/AppContext';
import AddResourceDialog from '../../../components/AddResourceDialog';
import { compassModes } from '../../../Constants/compassConstants';
import { Dialog, Icon, Slider } from 'react-native-elements';
import ComponentLoader from '../../../components/ComponentLoader';
import OperationButton from '../../../components/OperationButton';
import { setEarnedPoints } from '../../../Helpers/compassHelper';
import PrimarySlider from '../../../components/PrimarySlider';

/**
 * @description Finish week dialog where user gives score for each week
 * @param {Object} compassContext Compass context variables
 * @returns {JSX.Element}
 */
const FinishWeekDialog = ({compassContext}) => {
    /** Compass context variables */
    const { operationMode, activeCompass, setOperationMode, setStatus} = useContext(compassContext);

    /** Indicator for user that content is being updated */
    const [loading, setLoading] = useState(false);

    /** App context variables */
    const { compass, dispatch, password } = useContext(AppContext);

    /** Active destination currently being evaluated */
    const activeDestination = useMemo(()=>activeCompass.weekly_destinations.find(destination => destination.earned === -1), [compass]);

    /** State variable indicating score */
    const [score, setScore] = useState(0);

    /** State variable indicating limit of slider */
    const [limit, setLimit] = useState(activeDestination ? activeDestination.points : 0);

    /** Styling for dialog component */
    const dialogStyling = {
        backgroundColor: '#2c2e45',
        borderColor: 'rgb(168, 85, 247)',
        borderWidth: 1,
        padding: 15,
        borderRadius: 10,
        width: 370
    };

    /** Render finish week dialog to submit score for each destination */
    return (
        <Dialog
            isVisible={operationMode === compassModes.FINISH_MODE}
            onBackdropPress={()=>setOperationMode(compassModes.IDLE_MODE)}
            overlayStyle = {dialogStyling}
        >
            <View className = "items-center w-fit bg-[#2c2e45]">
                <View className = 'self-start left-4'>
                    <Text className = 'text-lg text-slate-200'>{activeDestination ? activeDestination.name : ''}</Text>    
                </View>
                <View className = 'w-[90%] my-2'>
                    {activeDestination  && (
                        <View>
                            <Text className = 'text-slate-200 text-base font-thin mb-1'>{`${score} / ${activeDestination.points} Pts`}</Text>
                            <PrimarySlider
                                key = {limit}
                                value = {score}
                                setValue = {setScore}
                                limit = {limit}
                                icon = 'star'
                            />
                        </View>
                        
                    )}
                </View>
                {activeDestination && (
                    <View className = 'flex-row items-center justify-between space-x-6 py-4 w-[90%]'>
                        <OperationButton
                            title = 'Cancel'
                            style = 'bg-slate-200 w-32 '
                            textStyle = 'text-center text-black text-lg'
                            clickAction = {()=>setOperationMode(compassModes.IDLE_MODE)}
                        />
                        <OperationButton
                            title = 'Confirm'
                            style = {`bg-[#6c71a6] w-32 `}
                            textStyle = 'text-center text-lg'
                            clickAction = {async ()=>{
                                setLoading(true);
                                await setEarnedPoints(dispatch, activeCompass.id, activeDestination.id, score, setStatus);
                                setLoading(false);
                                if (activeDestination.id === activeCompass.weekly_destinations[activeCompass.weekly_destinations.length - 1].id) {
                                    setOperationMode(compassModes.IDLE_MODE);
                                } else {
                                    setScore(0);
                                    setLimit(activeCompass.weekly_destinations[activeCompass.weekly_destinations.findIndex(dest => dest.id === activeDestination.id) + 1].points);    
                                };
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
                )}
            </View>
        </Dialog>
    );
};

export default FinishWeekDialog;