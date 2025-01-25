import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text, Image, TouchableOpacity} from 'react-native'
import React, { useState } from 'react'
import LoginScreen from "../screens/LoginScreen";
import NetworthScreen from "../screens/finance/NetworthScreen";
import StocksScreen from "../screens/finance/StocksScreen";
import AssetsScreen from "../screens/finance/AssetsScreen";
import SavingsScreen from "../screens/finance/SavingsScreen";
import ExpensesScreen from "../screens/finance/ExpensesScreen";
import CardScreen from "../screens/finance/CardScreen";
import TransferScreen from "../screens/finance/TransferScreen";
import PaychequeScreen from '../screens/finance/PaychequeScreen';
import TransactionScreen from "../screens/finance/TransactionScreen";
import LifeUltimateTeamScreen from "../screens/lifeultimateteam/LifeUltimateTeamScreen";
import LifeUltimateTeamTraits from "../screens/lifeultimateteam/components/LifeUltimateTeamTraits";
import LifeUltimateTeamLog from "../screens/lifeultimateteam/components/LifeUltimateTeamLog";
import DreamsListScreen from "../screens/dreams/DreamsListScreen";
import DreamAddScreen from "../screens/dreams/DreamAddScreen";
import SolutionsScreen from "../screens/solutions/SolutionsScreen";
import HomeScreen from "../screens/home/HomeScreen";
import ResponsibilityScreen from "../screens/beastmode/ResponsibilityScreen";
import TaskScreen from "../screens/beastmode/TaskScreen";
import TodoListScreen from "../screens/beastmode/TodoListScreen";
import DietTrackerScreen from "../screens/diet/DietTrackerScreen";
import RecipesScreen from "../screens/diet/RecipesScreen";
import RecipesAddScreen from "../screens/diet/RecipeAddScreen";
import CompassScreen from "../screens/compass/CompassScreen";
import ViewCompass from "../screens/compass/ViewCompass";
import YearlyCompass from "../screens/compass/YearlyCompass";
import MonthlyCompassScreen from "../screens/compass/MonthlyCompassScreen";
import WeeklyCompassScreen from "../screens/compass/WeeklyCompassScreen";
import DestinationScreen from "../screens/compass/DestinationScreen";
import { Icon } from "react-native-elements";
import UpcomingDueScreen from "../screens/beastmode/UpcomingDueScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AppNavigation = () => {
    
    function HomeTabs() {
        return (
            <Tab.Navigator
                screenOptions={({route})=>({
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarIcon: ({focused, color, size}) => menuIcons(route, focused),
                    tabBarStyle: {
                        paddingBottom: 40,
                        paddingLeft: 4,
                        paddingRight: 4,
                        borderRadius: 0, 
                        backgroundColor: '#1a1b2a', 
                        marginHorizontal: 0,
                        height: 110,
                    },
                    tabBarItemStyle: {
                        marginTop: 30
                    }
                })}
            >
                <Tab.Screen name = "Home" component = {HomeScreen} options={{gestureEnabled: false}}/>
                <Tab.Screen name = "Ratings" component={LifeUltimateTeamScreen} options={{gestureEnabled: false}}/>
                <Tab.Screen name = "Budget" component={NetworthScreen} options={{gestureEnabled: false}}/>
                <Tab.Screen name = "Compass" component={CompassScreen} options={{gestureEnabled: false}}/>
                <Tab.Screen name = "Todo" component={TodoListScreen} options={{gestureEnabled: false}}/>
                <Tab.Screen name = "Diet" component={DietTrackerScreen} options={{gestureEnabled: false}}/>
            </Tab.Navigator>
        )
    }
    
    const menuIcons = (route, focused) => {
        let icon;
        let color = "#cbd5e1"
        if (route.name == "Home") {
            icon = <Icon name = "home" type = 'font-awesome-5' size = {25} color = {color}/>
        } else if (route.name == "Compass") {
            icon = <Icon name = 'compass' type = 'font-awesome' size = {25} color = {color}/>
        } else if (route.name == "Ratings") {
            icon = <Icon name="star" size={25} type="font-awesome-5" color={color} solid/>
        } else if (route.name == "Self-Image") {
            icon = <Icon name = "user-secret" type = 'font-awesome-5' size = {25} color = {color}/>
        } else if (route.name == "Todo") {
            icon = <Icon name = "clipboard-list" type = 'font-awesome-5' size = {25} color = {color}/>
        } else if (route.name == "Prompts") {
            icon = <Icon name = "pen" type = 'font-awesome-5' size = {25} color = {color}/>
        } else if (route.name == "Budget") {
            icon = <Icon name = "landmark" type = 'font-awesome-5' size = {25} color = {color}/>
        } else if (route.name == "Diet") {
            icon = <Icon name = "utensils" type = 'font-awesome-5' size = {25} color = {color}/>
        } 

        return (
            <View className = {`flex-row items-center justify-center rounded-full w-12 h-12 shadow-lg border-[1px] ${focused ? 'bg-primary-purple border-primary-lightPurple' : 'border-transparent'}`}> 
                {icon}
            </View>
        );
    };

  return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name = "Login" component={LoginScreen} options = {{headerShown: false, gestureEnabled: false}}/>
            <Stack.Screen name = "HomeTabs" component={HomeTabs} options = {{headerShown: false, gestureEnabled: false}}/>
            <Stack.Screen name = "Responsibility" component={ResponsibilityScreen} options = {{headerShown: false, gestureEnabled: false}}/>
            <Stack.Screen name = "Task" component={TaskScreen} options={{headerShown: false, gestureEnabled: false}}/>
            <Stack.Screen name = "YearlyCompass" component = {YearlyCompass} options = {{headerShown:false, gestureEnabled: false}}/>
            <Stack.Screen name = "MonthlyCompass" component={MonthlyCompassScreen} options = {{headerShown: false, gestureEnabled: false}}/>
            <Stack.Screen name = "WeeklyCompass" component={WeeklyCompassScreen} options = {{headerShown: false, gestureEnabled: false}}/>
            <Stack.Screen name = 'Destinations' component={DestinationScreen} options={{headerShown: false, gestureEnabled: false}}/>
            <Stack.Screen name = "Diet" component={DietTrackerScreen} options={{headerShown: false, gestureEnabled: false}}/>
            <Stack.Screen name = "Recipes" component={RecipesScreen} options={{headerShown: false, gestureEnabled: false}}/>
            <Stack.Screen name = "RecipesAdd" component={RecipesAddScreen} options={{headerShown: false, gestureEnabled: false}}/>
            <Stack.Screen name = "Solutions" component={SolutionsScreen} options = {{headerShown: false, gestureEnabled: false}}/>
            <Stack.Screen name = "Stocks" component={StocksScreen} options = {{headerShown: false, gestureEnabled: false}}/>
            <Stack.Screen name = "Assets" component={AssetsScreen} options = {{headerShown: false, gestureEnabled: false}}/>
            <Stack.Screen name = "Savings" component={SavingsScreen} options = {{headerShown: false, gestureEnabled: false}}/>
            <Stack.Screen name = "Expenses" component={ExpensesScreen} options = {{headerShown: false, gestureEnabled: false}}/>
            <Stack.Screen name = "Cards" component={CardScreen} options = {{headerShown: false, gestureEnabled: false}}/>
            <Stack.Screen name = "Transfer" component={TransferScreen} options = {{headerShown: false, gestureEnabled: false}}/>
            <Stack.Screen name = "Paycheque" component={PaychequeScreen} options = {{headerShown: false, gestureEnabled: false}}/>
            <Stack.Screen name = 'Transactions' component={TransactionScreen} options={{headerShown: false, gestureEnabled: false}}/>
            <Stack.Screen name = 'RatingTraitView' component={LifeUltimateTeamTraits} options = {{headerShown: false, gestureEnabled: false}}/>
            <Stack.Screen name = 'RatingLog' component={LifeUltimateTeamLog} options={{headerShown: false, gestureEnabled: false}}/>
            <Stack.Screen name = 'DreamsAdd' component={DreamAddScreen} options={{headerShown: false, gestureEnabled: false}}/>
            <Stack.Screen name="Dreams" component={DreamsListScreen} options={{headerShown: false, gestureEnabled: false}}/>
            <Stack.Screen name = 'ViewCompass' component={ViewCompass} options={{headerShown: false, gestureEnabled: false}}/>
            <Stack.Screen name = 'UpcomingDue' component={UpcomingDueScreen} options = {{headerShown: false, gestureEnabled: false}}/>
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigation;