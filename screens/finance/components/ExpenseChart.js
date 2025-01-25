import React, { useContext, useMemo, useState } from 'react'
import { AppContext } from '../../../context/AppContext';
import { VictoryPie } from 'victory-native';
import { dollarFormatterNoCents } from '../../../Helpers/HelperFunctions';
import * as financesHelper from '../../../Helpers/financesHelper';
import { Text, View } from 'react-native';
import * as financesConstants from '../../../Constants/financeConstants';
import { ExpenseChartLabel } from './ChartLabel';

/**
 * @description Expense pie chart to be displayed in expense screen which includes a breakdown of expense into
 * categories
 * @returns {JSX.Element}
 */
const ExpenseChart = () => {
    /** Context Variables */
    const { finances } = useContext(AppContext);

    /** Memoized expenses categories and computed expense totals */
    const { totalAllocated, expenseCategories, colours } = useMemo(()=>financesHelper.computeExpenseCategories(finances.expenses), [finances.expenses]); 
    
    /** Selected category which user clicked on */
    const [selectedCategory, setSelectedCategory] = useState(null);

    /** Memoized dimensions for pie chart */
    const {width, length} = useMemo(()=> financesConstants.EXPENSE_PIE_DIMENSIONS, []);

    /** Render Pie chart and display each category which contributed to networth */
    return (
        <View className = 'z-50 items-center justify-center'>
            <VictoryPie
                data={expenseCategories}
                radius={({datum})=> (selectedCategory == datum.label) ? width * 0.4 : length * 0.4 - 15}
                innerRadius={62}
                padAngle={2}
                labelComponent={<ExpenseChartLabel/>}
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
                colorScale={colours}
                events={[{
                    target: 'data',
                    eventHandlers: {
                        onPress: ()=> {
                            return [{
                                target: 'labels',
                                mutation: (props)=> {
                                    const label = expenseCategories[props.index].label;
                                    setSelectedCategory(selectedCategory === label ? null : label);
                                }
                            }]
                        }
                    }
                }]}
            />
            <View className = 'absolute self-center '>
                <Text className = 'text-center font-bold text-gray-400'>Expenses</Text>
                <Text className = 'text-lg text-center text-gray-400'>{dollarFormatterNoCents.format(totalAllocated)}</Text>
            </View>
        </View>
    );
};

export default ExpenseChart;