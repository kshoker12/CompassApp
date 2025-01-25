import { View, Text, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native'
import React, { useContext, useMemo, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import CalgaryDemoTitle from '../../components/CalgaryDemoTitle';
import BackArrow from '../../components/BackArrow';
import { Image } from 'expo-image';
import { dateFormatter, dollarFormatter } from '../../Helpers/HelperFunctions';
import { Icon } from 'react-native-elements';
import OperationButton from '../../components/OperationButton';
import { AppContext } from '../../context/AppContext';
import { computeSpentPercentage } from '../../Helpers/financesHelper';
import AddTransaction from './components/dialog/AddTransaction';
import { transactionModes } from '../../Constants/financeConstants';
import EditAllocatedAmount from './components/dialog/EditAllocatedAmount';

/**
 * @description Transaction screen including transactions made for each expense
 * @param {Object} route Route Object
 * @returns {JSX.Element}
 */
const TransactionScreen = ({route}) => {
    /** Context Variables */
    const { finances } = useContext(AppContext);

    /** Current mode of operation (Add, Edit, Idle) */
    const [operationMode, setOperationMode] = useState(transactionModes.IDLE_MODE);

    /** Memoized expenses based on expense Id */
    const expense = useMemo(()=>finances.expenses.find(expense => expense.id === route.params.expenseId), [finances.expenses]);

    /** Memoized amount spent */
    const amountSpentPercentage = useMemo(()=>computeSpentPercentage(expense.amount_allocated, expense.transactions), [finances.expenses]);

    /** Render Expense title, allocated amount and transactions as well as progress bar and 'Make Transaction' Button */
    return (
        <SafeAreaView>
            <AddTransaction operationMode = {operationMode} setOperationMode = {setOperationMode} expense = {expense}/>
            <EditAllocatedAmount operationMode = {operationMode} setOperationMode = {setOperationMode} expense = {expense}/>
            <LinearGradient
                colors={['#222222', '#141414','#6082B6']}
                className = 'w-full h-full flex-col'
            >
                <BackArrow colour = 'white' style = 'absolute'/>
                <View className = 'flex-row items-center justify-center'>
                    <CalgaryDemoTitle title = {expense.name} style = 'self-center mt-1' textStyle = 'text-gray-400 text-4xl pt-6'/> 
                    <View className = 'w-14 h-14 ml-2'>
                        <Image source={{uri: expense.icon}} className = 'w-full h-full'/>
                    </View>   
                </View>
                <View className = 'flex-col justify-center items-start mx-6'>
                    <View className = 'flex-row items-center justify-start space-x-8 mb-2'>
                        <Text className = 'text-white text-xl'>
                            <Text className = 'font-semibold text-gray-400'>Allocated Amount: </Text> 
                            {dollarFormatter.format(expense.amount_allocated)}
                        </Text>
                        <TouchableOpacity
                            className = 'self-end'
                            onPress={()=>setOperationMode(transactionModes.EDIT_AMOUNT_ALLOCATED)}
                        >
                            <Icon type='font-awesome' name = 'edit' color={'white'} size={30}/>    
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text className = 'text-white text-xl'>
                            <Text className = 'text-gray-400 font-semibold'>Spent: </Text>
                            {dollarFormatter.format(isNaN(amountSpentPercentage) ? 0 : amountSpentPercentage / 100 * expense.amount_allocated)}
                        </Text>
                    </View>
                    <View className = 'flex-row justify-start items-center space-x-2'>
                        <View className = 'flex-row items-center justify-center w-4/5 h-4 rounded-xl overflow-hidden border-[0.5px] border-white'>
                            <View
                                style = {{width: amountSpentPercentage + '%'}}
                                className = 'h-full bg-[#2c2e45]'
                            />
                            <View className = {`bg-gray-400 h-full`} style = {{width: (100 - amountSpentPercentage) + '%'}}/>
                        </View>   
                        <Text className = 'text-white text-lg font-semibold'>{isNaN(amountSpentPercentage) ? 0 : amountSpentPercentage.toFixed(0)}%</Text> 
                    </View>
                </View>
                <ScrollView className = 'mt-4 space-y-3'>
                    {[...expense.transactions].reverse().map(({name, id, cost, date})=>(
                        <View className = 'flex-row items-center justify-between mx-6 px-4 py-2 bg-[#2c2e45] border-[1px] border-white rounded-lg'>
                            <View className = 'space-y-1'>
                                <Text className = 'text-gray-400 text-lg'>{name}</Text>
                                <Text className = 'text-white font-semibold'>{dateFormatter.format(new Date(date))}</Text>   
                            </View>
                            <Text className = 'text-white text-2xl font-thin'>{dollarFormatter.format(cost)}</Text> 
                        </View>
                    ))}
                </ScrollView>
                <OperationButton 
                    title = 'Add Transaction' 
                    style = 'self-end m-2 bg-[#2c2e45]' 
                    textStyle = 'text-lg'
                    clickAction = {()=>setOperationMode(transactionModes.ADD_TRANSACTION)}
                />  
            </LinearGradient>
        </SafeAreaView>
    )
}

export default TransactionScreen;