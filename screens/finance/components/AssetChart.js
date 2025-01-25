import React, { useContext, useMemo, useState } from 'react'
import { AppContext } from '../../../context/AppContext';
import { VictoryPie } from 'victory-native';
import  { AssetChartLabel } from './ChartLabel';
import { dollarFormatterNoCents } from '../../../Helpers/HelperFunctions';
import * as financesHelper from '../../../Helpers/financesHelper';
import { Text, View } from 'react-native';
import * as financesConstants from '../../../Constants/financeConstants';

/**
 * @description Networth pie chart to be displayed in networth screen which includes a breakdown of networth into
 * available cash, assets, savings, and stocks
 * @returns {JSX.Element}
 */
const AssetChart = () => {
    /**
     * @description Context Variables
     */
    const { finances } = useContext(AppContext);

    /**
     * @description Memoized networth categories, computed networth, and generated colours
     */
    const { assetCategories, assetValue, colours } = useMemo(()=>financesHelper.computeAssetsCategories(finances.assets), [JSON.stringify(finances.assets)]); 
    
    /**
     * @description Selected category which user clicked on
     */
    const [selectedCategory, setSelectedCategory] = useState(null)

    /**
     * @description Memoized dimensions for pie chart
     */
    const {width, length} = useMemo(()=> financesConstants.ASSETS_PIE_DIMENSIONS, []);

    /**
     * @description Render Pie chart and display each category which contributed to networth
     */
    return (
        <View className = 'z-50 items-center justify-center'>
            <VictoryPie
                data={assetCategories}
                radius={({datum})=> (selectedCategory == datum.label) ? width * 0.4 : length * 0.4 - 15}
                innerRadius={62}
                padAngle={2}
                labelComponent={<AssetChartLabel/>}
                labelRadius={({innerRadius})=> (width * 0.46 + innerRadius) / 2.5}
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
                colorScale={colours}
                events={[{
                    target: 'data',
                    eventHandlers: {
                        onPress: ()=> {
                            return [{
                                target: 'labels',
                                mutation: (props)=> {
                                    const label = assetCategories[props.index].label;
                                    setSelectedCategory(selectedCategory === label ? null : label);
                                }
                            }]
                        }
                    }
                }]}
            />
            <View className = 'absolute self-center '>
                <Text className = 'text-center font-bold'>Total Value</Text>
                <Text className = 'text-lg text-center'>{dollarFormatterNoCents.format(assetValue)}</Text>
            </View>
        </View>
    );
};

export default AssetChart;