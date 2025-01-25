import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import Quote from './components/Quote';
import BackgroundImage from '../../components/BackgroundImage';
import { Image } from 'expo-image';
import Stat from './components/Stat';
import { dollarFormatterNoCents, writeData } from '../../Helpers/HelperFunctions';
import * as lifeUltimateTeamHelper from '../../Helpers/lifeUltimateTeamHelper';

import * as beastmodeHelper from '../../Helpers/beastmodeHelper';
import OperationButtons from './components/OperationButtons';
import ResponsibilityButton from './components/ResponsibilityButton';
import TitleDisplay from './components/TitleDisplay';
import { chartModes, homeModes } from '../../Constants/homeConstants';
import AddResponsibilityDialog from './components/AddResponsibilityDialog';
import AlertChip from '../../components/AlertChip';
import PrimarySpeedDial from '../../components/PrimarySpeedDial';
import * as financeHelper from '../../Helpers/financesHelper';
import * as compassHelper from '../../Helpers/compassHelper';
import PercentageChart from './components/PercentageChart';
import HoursChart from './components/HoursChart';

/** Home context */
const homeContext = createContext();

/**
 * @description Home screen where user can view a summary of their stats
 * @returns {JSX.Element}
 */
const HomeScreen = () => {
    /** Context variables */
    const { finances, dispatch, password, beastmode, lifeUltimateTeam, compass, dietTracker } = useContext(AppContext);

    /** State variable indicating whether speed dial is open */
    const [speedDialOpen, setSpeedDialOpen] = useState(false);

    /** Indicator whether an operation mode is active */
    const [operationMode, setOperationMode] = useState(homeModes.IDLE_MODE);

    /** State variable indicating type of chart open */
    const [chartIndex, setChartIndex] = useState(-1);

    /** Status of operations */
    const [status, setStatus] = useState(null);
    
    /** Fetch latest stock prices */
    useEffect(()=>{
        finances.stocks.forEach(stock => financeHelper.getCurrentStockPrice(dispatch, stock.stock_code));
    }, [JSON.stringify(finances)]);

    /** Compute memoized rating for total rating */
    const { totalRating } = useMemo(()=> lifeUltimateTeamHelper.extractRatings(lifeUltimateTeam),[lifeUltimateTeam]);

    /** Memoized completed tasks in todo list */
    const completedTodo = useMemo(()=> beastmodeHelper.computeCompletedSubTasks(beastmode.todoList[0].subtasks), [beastmode]);

    /** Memoized total hours for the week */
    const totalHours = useMemo(()=>beastmodeHelper.computeTotalHours(beastmode.responsibilities),[beastmode]);

    /** Memoized speed dial */
    const speedDialActions = useMemo(()=>{
        /** Reset responsibility speed dial action data */
        const repeat = {icon: 'repeat', action: async () => {
            await beastmodeHelper.resetResponsibilities(dispatch, setStatus);
            setOperationMode(homeModes.IDLE_MODE);
        }};

        /** Add responsibility speed dial action data */
        const addResponsibility = {icon: 'add', action: ()=>setOperationMode(homeModes.ADD_MODE)};

        /** Remove responsibility speed dial action data */
        const removeResponsibility = {icon: 'delete', action: ()=>setOperationMode(operationMode === homeModes.DELETE_MODE ? homeModes.IDLE_MODE : homeModes.DELETE_MODE)};

        /** Return computed speed dial actions */
        return [repeat, addResponsibility, removeResponsibility];
    },[operationMode]);

    /** Memoized total compass percentage */
    const compassPercentage = useMemo(()=>compass.yearly_compasses ? compassHelper.computeCompassPercentage(compass) : 0, [JSON.stringify(compass)]);
    
    /** Memoized computed networth */
    const { networth } = useMemo(()=>financeHelper.computeNetworthPieData(finances), [JSON.stringify(finances)]); 
    console.log(finances)
    /** Render Quote of the day, stats and home screen image, as well as responsibilities */
    return (
        <homeContext.Provider 
            value = {{chartIndex, setChartIndex}}
        >
            <SafeAreaView>
                <PercentageChart homeContext = {homeContext}/>
                <HoursChart homeContext = {homeContext}/>
                <AddResponsibilityDialog operationMode = {operationMode} setOperationMode = {setOperationMode} setStatus = {setStatus}/>
                <View className = 'w-full h-full flex-col'>
                    <BackgroundImage
                        imagePath = {require('../../images/newhome.jpg')}
                        shade = 'bg-purple-950'
                    />
                    <AlertChip
                        status = {status}
                        setStatus = {setStatus}
                        style = 'absolute z-50 bg-slate-200'
                        textStyle = 'text-white'
                        iconColor = '#e2e8f0'
                    />
                    <Quote/>
                    
                    <View className = 'mx-2 z-50'>
                        <View className = 'flex-row flex items-start space-x-2 h-[262px]'>
                            <View className = 'flex-col self-start space-y-1'> 
                                {[{name: `${completedTodo} / ${beastmode.todoList[0].subtasks.length}`, number: 4, icon: 'clipboard', textStyle: 'text-base'}, {name: compassPercentage.toFixed(2) + '%', number: 76, icon: 'graduation-cap', textStyle: 'text-base', clickAction:()=>setChartIndex(chartModes.PERCENTAGE_MODE)}, {name: totalHours, number: 15, icon: 'briefcase', textStyle: 'text-base', clickAction:()=>setChartIndex(chartModes.HOURS_MODE)}, {name: totalRating.toFixed(0), icon: 'star', textStyle: 'text-base'}, {name: dollarFormatterNoCents.format(networth), number: 3, icon: 'money', textStyle: ''}].map(compass => (
                                    <Stat title = {compass.name} className = '' icon = {compass.icon} saveTeams = {false} textStyle = {compass.textStyle} onPress = {compass.clickAction}/>
                                ))}
                            </View>
                            <Image
                                source={require('../../images/dmitrybivol.jpeg')}
                                className = 'w-64 h-full border-[1px] self-end opacity-90'
                            />    
                        </View>
                        <TitleDisplay/>
                    </View>
                    <View
                        className = 'z-50 flex-grow flex-row'
                    >
                        <ScrollView className = 'h-[275px]'>
                            {beastmode.responsibilities.map(({id, hours, name})=>(
                                <ResponsibilityButton id = {id} hours = {hours} name = {name} operationMode = {operationMode} setOperationMode = {setOperationMode} setStatus = {setStatus}/>
                            ))}
                        </ScrollView>
                        <View className = 'w-16 flex-col items-center justify-between h-[220px]'>
                            <OperationButtons/>
                        </View>
                    </View>
                    <PrimarySpeedDial speedDialActions = {speedDialActions}/>
                </View>
            </SafeAreaView>    
        </homeContext.Provider>
    );
};

export default HomeScreen;