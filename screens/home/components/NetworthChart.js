import React, { useContext, useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import moment from 'moment';
import { Dialog } from 'react-native-elements';
import { chartModes } from '../../../Constants/homeConstants';
import { AppContext } from '../../../context/AppContext';
import * as compassHelper from '../../../Helpers/compassHelper';

/**
 * @description Indicates the trends of networth over time to track progress and displayed on home screen
 * @param {Object} homeContext Home context containing context variables for home screen
 * @returns {JSX.Element}
 */
const NetworthChart = ({homeContext}) => {
    /** Home Context variables */
    const { chartIndex, setChartIndex } = useContext(homeContext);

    /** App context variables */
    const { compass } = useContext(AppContext);

    /** Styling for dialog component */
    const dialogStyling = {
        backgroundColor: '#2c2e45',
        borderColor: 'rgb(168, 85, 247)',
        borderWidth: 1,
        padding: 15,
        borderRadius: 10,
        width: 370
    }

    /** State variable indicating time frame */
    const [timeframe, setTimeframe] = useState('1M');

    /** Construct compass data */
    const compassData = useMemo(()=>compass.yearly_compasses ? compassHelper.constructHoursChartData(compass) : [], []);
      
    const filterDataByTimeframe = () => {
        const now = moment();
        let filteredData;
    
        switch (timeframe) {
            case '1M':
                filteredData = compassData.filter((d) => moment(d.timestamp).isAfter(now.clone().subtract(1, 'month')));
                break;
            case '3M':
                filteredData = compassData.filter((d) => moment(d.timestamp).isAfter(now.clone().subtract(3, 'months')));
                break;
            case '6M':
                filteredData = compassData.filter((d) => moment(d.timestamp).isAfter(now.clone().subtract(6, 'months')));
                break;
            case '1Y':
                filteredData = compassData.filter((d) => moment(d.timestamp).isAfter(now.clone().subtract(1, 'year')));
                break;
            default:
                filteredData = compassData;
                break;
        }
    
        return filteredData.map((d) => ({
            label: moment(d.timestamp).format('MM/DD'),
            value: d.value,
        }));
    };
      
    /** Extract filtered data */
    const filteredData = useMemo(()=>filterDataByTimeframe(), [timeframe, compassData]); 

    /** Render dialog containing percentage chart */
    return (
        <Dialog
            isVisible = {chartIndex === chartModes.HOURS_MODE}
            onBackdropPress={()=>setChartIndex(chartModes.IDLE_MODE)}
            overlayStyle = {dialogStyling}
        >
            <View className=''>
                <Text className='text-slate-200 text-xl mb-2'>Weekly Hours</Text>
                <LineChart
                    data={{
                        datasets: [
                        {
                            data: filteredData.map((d) => d.value),
                        },
                        ],
                    }}
                    width={356} 
                    height={250}
                    chartConfig={{
                        backgroundGradientFrom: '#2c2e45',
                        backgroundGradientTo: '#2c2e45',
                        decimalPlaces: 0,
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        style: {borderRadius: 8},
                    }}
                    withDots = {false}
                    fromZero={true}
                    fromNumber={120}
                    segments={12}
                    yAxisInterval={10}
                    yAxisSuffix=''
                    style={{marginLeft: -14}}
                    bezier
                />
                <View className='flex flex-row justify-between items-center mt-1'>
                    {['1M', '3M', '6M', '1Y', 'ALL'].map((tf) => (
                        <TouchableOpacity
                            className={`${timeframe === tf ? 'bg-primary-lightPurple' : 'bg-alt-purple'} text-slate-200 border-[1px]  px-2 py-1 w-16 rounded-md`}
                            onPress={() => setTimeframe(tf)}
                        >
                            <Text className='text-center text-slate-200'>{tf}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </Dialog>
    );
};

export default NetworthChart;