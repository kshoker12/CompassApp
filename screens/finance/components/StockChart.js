import React, { useContext, useMemo, useState } from 'react'
import { AppContext } from '../../../context/AppContext';
import { VictoryPie } from 'victory-native';
import  { AssetChartLabel } from './ChartLabel';
import { dollarFormatterNoCents } from '../../../Helpers/HelperFunctions';
import * as financesHelper from '../../../Helpers/financesHelper';
import { Text, View } from 'react-native';
import * as financesConstants from '../../../Constants/financeConstants';

/**
 * @description Stock pie chart to be displayed in Stocks screen which includes a breakdown of owned stocks
 * @returns {JSX.Element}
 */
const StockChart = () => {
    /**
     * @description Context Variables
     */
    const { finances } = useContext(AppContext);

    /**
     * @description Memoized stock categories, computed total stock portfolio, and generated colours
     */
    const { stockCategories, portfolioValue, colours } = useMemo(()=>financesHelper.computeStockCategories(finances.stocks, finances.stockPrices), [finances.stocks, finances.stockPrices]); 
    
    /**
     * @description Selected category which user clicked on
     */
    const [selectedCategory, setSelectedCategory] = useState(null)

    /**
     * @description Memoized dimensions for pie chart
     */
    const {width, length} = useMemo(()=> financesConstants.STOCKS_PIE_DIMENSIONS, []);

    /**
     * @description Render Pie chart and display each category which contributed to stock portfolio
     */
    return (
        <View className = 'z-50 items-center justify-center -mt-10'>
            <VictoryPie
                data={stockCategories}
                radius={({datum})=> (selectedCategory == datum.label) ? width * 0.4 : length * 0.4 - 15}
                innerRadius={55}
                padAngle={2}
                labelRadius={({innerRadius})=> ( width * 0.18 + innerRadius / 2.5)}
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
                width={width}
                height={length}
                colorScale={colours}
                events={[{
                    target: 'data',
                    eventHandlers: {
                        onPress: ()=> {
                            return [{
                                target: 'labels',
                                mutation: (props)=> {
                                    const label = stockCategories[props.index].label;
                                    setSelectedCategory(selectedCategory === label ? null : label);
                                }
                            }]
                        }
                    }
                }]}
            />
            <View className = 'absolute self-center '>
                <Text className = 'text-center font-bold'>Portfolio</Text>
                <Text className = 'text-lg text-center'>{dollarFormatterNoCents.format(portfolioValue)}</Text>
            </View>
        </View>
    );
};

export default StockChart;