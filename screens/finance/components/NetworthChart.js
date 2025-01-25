import React, { useContext, useMemo, useState } from 'react'
import { AppContext } from '../../../context/AppContext';
import { VictoryPie } from 'victory-native';
import { NetworthChartLabel } from './ChartLabel';
import { dollarFormatterNoCents } from '../../../Helpers/HelperFunctions';
import * as financesHelper from '../../../Helpers/financesHelper';
import { Text, View } from 'react-native';
import * as financesConstants from '../../../Constants/financeConstants';

/**
 * @description Networth pie chart to be displayed in networth screen which includes a breakdown of networth into
 * available cash, assets, savings, and stocks
 * @returns {JSX.Element}
 */
const NetworthChart = () => {
    /**
     * @description Context Variables
     */
    const { finances } = useContext(AppContext);

    /**
     * @description Memoized networth categories and computed networth
     */
    const { networthCategories, networth } = useMemo(()=>financesHelper.computeNetworthPieData(finances), [finances]); 
    
    /**
     * @description Selected category which user clicked on
     */
    const [selectedCategory, setSelectedCategory] = useState(null)

    /**
     * @description Memoized color scale for networth chart
     */
    const colorScale = useMemo(()=>networthCategories.map((category)=> category.color));

    /**
     * @description Memoized dimensions for pie chart
     */
    const {width, length} = useMemo(()=> financesConstants.NETWORTH_PIE_DIMENSIONS, []);

    /**
     * @description Render Pie chart and display each category which contributed to networth
     */
    return (
        <View className = 'z-50 items-center justify-center'>
            <VictoryPie
                data={networthCategories}
                radius={({datum})=> (selectedCategory == datum.label) ? width * 0.4 : length * 0.4 - 15}
                innerRadius={62}
                padAngle={2}
                labelComponent={<NetworthChartLabel/>}
                labelRadius={({innerRadius})=> (width * 0.53 + innerRadius) / 2.5}
                style={{
                    data: {
                        strokeWidth: 0.8,
                        fillOpacity: 0.9,
                        stroke: 'black'
                    },
                    parent: {
                        ...{
                            shadowColor: '#000',
                            shadowOffset: {
                                width: 6,
                                height: 6,
                            },
                            shadowOpacity: 0.35,
                            shadowRadius: 2.5,
                            elevation: 5    
                        }
                    },
                }}
                width={width * 0.8}
                height={length * 0.8}
                colorScale={colorScale}
                events={[{
                    target: 'data',
                    eventHandlers: {
                        onPress: ()=> {
                            return [{
                                target: 'labels',
                                mutation: (props)=> {
                                    const label = networthCategories[props.index].label;
                                    setSelectedCategory(selectedCategory === label ? null : label);
                                }
                            }]
                        }
                    }
                }]}
            />
            <View className = 'absolute self-center '>
                <Text className = 'text-center font-bold'>Networth</Text>
                <Text className = 'text-lg text-center'>{dollarFormatterNoCents.format(networth)}</Text>
            </View>
        </View>
    );
};

export default NetworthChart;