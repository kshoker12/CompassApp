import { LinearGradient } from 'expo-linear-gradient';
import React, { useContext, useState } from 'react'
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import BackArrow from '../../components/BackArrow';
import CalgaryDemoTitle from '../../components/CalgaryDemoTitle';
import { upcomingRangeModes } from '../../Constants/beastmodeConstants';
import { AppContext } from '../../context/AppContext';
import { filterDates } from '../../Helpers/beastmodeHelper';
import DueTaskButton from './components/DueTaskButton';

/**
 * @description Screen where user can view upcoming due tasks
 * @returns {JSX.Element}
 */
const UpcomingDueScreen = () => {
    /** Context Variables */
    const { beastmode } = useContext(AppContext);

    /** State variable indicating the range of due dates */
    const [range, setRange] = useState(upcomingRangeModes.TODAY);

    return (
        <SafeAreaView>
            <LinearGradient
                colors={['#2c2e45', '#6b21a8']}
                className = 'w-full h-full flex-col'
                start={{x:0.3, y: 0}}
                end={{x: 1, y: 1}}
            >  
                <BackArrow 
                    colour = 'rgb(226, 232, 240)'
                    style = 'absolute m-2'
                />
                <CalgaryDemoTitle title = {'Upcoming Tasks'} style = 'self-center' textStyle = 'text-4xl pt-9 text-slate-200'/>
                <View className = 'flex-row items-center justify-between mx-2'>
                    {Object.values(upcomingRangeModes).map(rangeType => (
                        <TouchableOpacity
                            className = {`${range === rangeType ? 'bg-primary-lightPurple' : 'bg-alt-purple'} px-4 py-1 rounded-lg w-24`}
                            onPress={()=>setRange(rangeType)}
                        >
                            <Text className = 'text-slate-200 text-xs text-center'>{rangeType}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <ScrollView className = 'flex-grow mb-20'>
                    {filterDates(beastmode.responsibilities, range).map(task => (
                        <DueTaskButton task = {task}/>
                    ))}
                </ScrollView>
            </LinearGradient>
        </SafeAreaView>    
    );
};

export default UpcomingDueScreen;