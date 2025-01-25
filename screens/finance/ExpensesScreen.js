import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useContext, useState } from 'react'
import { AppContext } from '../../context/AppContext';
import { LinearGradient } from 'expo-linear-gradient';
import CalgaryDemoTitle from '../../components/CalgaryDemoTitle';
import BackArrow from '../../components/BackArrow';
import { Image } from 'expo-image';
import { dollarFormatter } from '../../Helpers/HelperFunctions';
import ExpenseChart from './components/ExpenseChart';
import { useNavigation } from '@react-navigation/native';
import OperationButton from '../../components/OperationButton';
import ComponentLoader from '../../components/ComponentLoader';
import { computeSpentPercentage, resetExpenses } from '../../Helpers/financesHelper';

/**
 * @description Expenses screen where user manages expenses
 * @returns {JSX.Element}
 */
const ExpensesScreen = () => {
    /** Context Variables */
    const { finances, dispatch, password } = useContext(AppContext);

    /** Navigation Object */
    const navigation = useNavigation();

    /** State variable indicating user-requested action is being conducted */
    const [loading, setLoading] = useState(false);

    /** Render expenses  */
    return (
        <SafeAreaView>
            <LinearGradient
                colors={['#222222', '#141414','#6082B6']}
                className = 'w-full h-full flex-col'
            >
                <BackArrow colour = 'white' style = 'absolute'/>
                <CalgaryDemoTitle title = 'Expense Manager' textStyle = 'text-gray-200 text-4xl pt-6' style = 'self-center'/>
                <View>
                    <ScrollView className = 'flex-grow mt-6 space-y-4'>
                        {finances.expenses.map((expense)=>(
                            <TouchableOpacity
                                className = 'flex-row items-center justify-between mx-6 px-4 py-2 bg-[#2c2e45] rounded-2xl border-[1px] border-white'
                                onPress={()=>navigation.navigate('Transactions', {expenseId: expense.id})}
                            >
                                <View className = 'flex-row items-center justify-center space-x-4'>
                                    <View className = 'w-12 h-12'>
                                        <Image source={{uri: expense.icon}} className = 'w-full h-full'/>    
                                    </View>
                                    <Text className = 'text-gray-400 text-xl'>{expense.name}</Text>    
                                </View>
                                <Text className = 'text-xl text-gray-400 font-thin'>{dollarFormatter.format(expense.amount_allocated - expense.transactions.reduce((total, current)=>total + current.cost, 0))}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                    <OperationButton 
                        title = 'Reset' 
                        style = 'self-end items-end mt-2 mx-6 z-50' 
                        textStyle = '' 
                        clickAction = {async ()=>{
                            setLoading(true);
                            await resetExpenses(dispatch);
                            setLoading(false);
                        }}
                    />
                    <ComponentLoader
                        title = 'Resetting'
                        style = 'absolute -bottom-6 right-2 self-end '
                        textStyle = 'text-white'
                        indicatorStyling = 'white'
                        loading = {loading}
                    />   
                </View>
                {!finances.expenses.every(expense => expense.amount_allocated === 0) && (
                    <ExpenseChart/>    
                )}
            </LinearGradient>
        </SafeAreaView>
    );
};

export default ExpensesScreen;