import { View, Text, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../../context/AppContext';
import { dietTrackerModes } from '../../../Constants/dietTrackerConstants';
import AddResourceDialog from '../../../components/AddResourceDialog';
import * as dietTrackerHelper from '../../../Helpers/dietTrackerHelper';
import PrimaryTextInput from '../../../components/PrimaryTextInput';
import { Icon } from 'react-native-elements';

/**
 * @description Add acitvity or meal dialog
 * @param {Object} dietTrackerContext Diet tracker context
 * @returns {JSX.Element}
 */
const AddMealActivityDialog = ({dietTrackerContext}) => {
    /** App Context Variables */
    const { dispatch, password, dietTracker } = useContext(AppContext);

    /** Diet Tracker Context Variables */
    const { operationMode, setOperationMode, setLoading, setStatus, loading } = useContext(dietTrackerContext);

    /** Indicator of mode of adding (Activity = 0 or Meal = 1) */
    const [mode, setMode] = useState(0)

    /** Calories for new item */
    const [calories, setCalories] = useState('');
    
    /** Name for new item */
    const [name, setName] = useState('');

    /** Protein for new item */
    const [protein, setProtein] = useState('');

    /** Fat for new item */
    const [fat, setFat] = useState('');

    /** Fibre for new item */
    const [fibre, setFibre] = useState('');

    /** Sugar for new item */
    const [sugar, setSugar] = useState('');

    /** Carbs for new item */
    const [carbs, setCarbs] = useState('');

    /** Quantity of meal */
    const [quantity, setQuantity] = useState(1);

    /** Search results */
    const [searchResults, setSearchResults] = useState([]);

    /** Reset properties upon activating add dialog */
    useEffect(()=>{
        if (operationMode === dietTrackerModes.ADD_MODE) {
            setMode(0);
            setCalories('');
            setName('');
            setProtein('');
            setFat('');
            setFibre('');
            setSugar('');
            setCarbs('');
            setSearchResults([]);
            setQuantity(1);
        };
    }, [operationMode]);

    /** Render dialog to add activity or meal with primary input fields */
    return (
        <AddResourceDialog
            addIndicator = {operationMode === dietTrackerModes.ADD_MODE}
            resetAddIndicator = {()=> setOperationMode(dietTrackerModes.IDLE_MODE)}
            disabled = {mode === 0 ? [name.length, calories.length].includes(0) : [name.length, calories.length, carbs.length, sugar.length, fat.length, fibre.length].includes(0)}
            title = {`Add new activity or meal`}
            successFunction = {async ()=> {
                setLoading(true);
                if (mode === 0) {
                    await dietTrackerHelper.addActivityToDailyTracker(
                        dispatch, 
                        {
                            name, 
                            calories: parseFloat(calories)
                        }, 
                        setStatus,
                    ); 
                } else {
                    await dietTrackerHelper.addMealToDailyTracker(
                        dispatch, 
                        {
                            name, 
                            calories: parseFloat(calories), 
                            protein: parseFloat(protein), 
                            fat: parseFloat(fat), 
                            carbs: parseFloat(carbs), 
                            sugar: parseFloat(sugar), 
                            fibre: parseFloat(fibre),
                            quantity: quantity,
                        }, 
                        setStatus,
                    );
                };
                setLoading(false);
            }}
        >
            <View className = 'flex-col space-y-4'>
                <View className = 'flex-col space-y-1'>
                    <Text className = 'font-thin text-slate-200'>Choose type</Text>
                    <View className = 'flex-row items-center justify-start space-x-4'>
                        {Array(2).fill(null).map((_, index)=>(
                            <TouchableOpacity
                                className = {`${mode === index ? 'bg-primary-lightPurple' : 'bg-alt-purple'} rounded-lg px-4 py-1 border-primary-purple border-[1px] w-20`}
                                onPress={()=>setMode(index)}
                            >   
                                <Text className = 'text-slate-200 text-xs text-center'>{index === 0 ? 'Activity' : 'Meal'}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>    
                </View>
                <View className = 'flex-col z-50'>
                    {mode === 1 && (
                        <TouchableOpacity
                            className = 'absolute z-30 right-2 top-1.5'
                            onPress={async ()=>{
                                setLoading(true);
                                await dietTrackerHelper.searchMealsInHistory(name, setSearchResults);
                                setLoading(false);
                            }}
                            disabled = {name.length < 3}
                        >
                            <Icon name='search' color={'white'} size={30}/>
                        </TouchableOpacity>    
                    )}
                    {mode === 1 && loading && (
                        <View className = 'absolute right-10 top-2.5 z-40'>
                            <ActivityIndicator color={'white'}/>    
                        </View>
                    )}
                    <PrimaryTextInput
                        text = {name} 
                        setText = {setName}
                        placeholder = 'Name'
                    />
                    {searchResults.length > 0 && mode === 1 && (
                        <View className = 'h-36 bg-primary-purple opacity-90 border-[1px] border-alt-purple absolute z-50 flex-col w-full top-11 rounded-lg overflow-hidden'>
                            <ScrollView className = 'flex-grow flex-col space-y-1'>
                                {searchResults.map(result => (
                                    <TouchableOpacity
                                        className = ' border-b-[1px] border-alt-purple py-2 mx-2'
                                        onPress={()=>{
                                            setName(result.name);
                                            setCalories(result.calories.toString());
                                            setCarbs(result.carbs.toString());
                                            setSugar(result.sugar.toString());
                                            setFibre(result.fibre.toString());
                                            setFat(result.fat.toString());
                                            setProtein(result.protein.toString());
                                            setSearchResults([]);
                                        }}
                                    >
                                        <Text className = 'text-slate-200'>{result.name}</Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>    
                            <TouchableOpacity 
                                className = 'm-2 self-end'
                                onPress={()=>setSearchResults([])}
                            >
                                <Text className = 'text-slate-200'>Clear Results</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
                <View className = 'flex-row flex-wrap justify-between'>
                    {mode === 0 ? (
                        <>
                            <View className = 'flex-col space-y-1 mb-1'>
                                <Text className = 'text-slate-200 font-thin mb-1'>Cals</Text>
                                <PrimaryTextInput
                                    text = {calories}
                                    setText = {setCalories}
                                    placeholder = 'Cals'
                                    keyboardType = 'numeric'
                                    style = 'w-32 text-xs '
                                />
                            </View>
                        </>
                    ) : (
                        <>
                            <View className = 'flex-col space-y-1 m-0.5 mb-1'>
                                <Text className = 'text-slate-200 font-thin mb-1'>Cals</Text>
                                <PrimaryTextInput
                                    text = {calories}
                                    setText = {setCalories}
                                    placeholder = 'Cals'
                                    keyboardType = 'numeric'
                                    style = 'w-32 text-xs '
                                />
                            </View>
                            <View className = 'flex-col space-y-1 m-0.5 mb-1'>
                                <Text className = 'text-slate-200 font-thin mb-1'>Protein (g)</Text>
                                <PrimaryTextInput
                                    text = {protein}
                                    setText = {setProtein}
                                    placeholder = 'Protein'
                                    keyboardType = 'numeric'
                                    style = 'w-32 text-xs '
                                />
                            </View>
                            <View className = 'flex-col space-y-1 m-0.5 mb-1'>
                                <Text className = 'text-slate-200 font-thin mb-1'>Carbs (g)</Text>
                                <PrimaryTextInput
                                    text = {carbs}
                                    setText = {setCarbs}
                                    placeholder = 'Carbs'
                                    keyboardType = 'numeric'
                                    style = 'w-32 text-xs '
                                />
                            </View>
                            <View className = 'flex-col space-y-1 m-0.5 mb-1'>
                                <Text className = 'text-slate-200 font-thin mb-1'>Fat (g)</Text>
                                <PrimaryTextInput
                                    text = {fat}
                                    setText = {setFat}
                                    placeholder = 'Fat'
                                    keyboardType = 'numeric'
                                    style = 'w-32 text-xs '
                                />
                            </View>
                            <View className = 'flex-col space-y-1 m-0.5 mb-1'>
                                <Text className = 'text-slate-200 font-thin mb-1'>Fibre (g)</Text>
                                <PrimaryTextInput
                                    text = {fibre}
                                    setText = {setFibre}
                                    placeholder = 'Fibre'
                                    keyboardType = 'numeric'
                                    style = 'w-32 text-xs '
                                />
                            </View>
                            <View className = 'flex-col space-y-1 m-0.5 mb-1'>
                                <Text className = 'text-slate-200 font-thin mb-1'>Sugar (g)</Text>
                                <PrimaryTextInput
                                    text = {sugar}
                                    setText = {setSugar}
                                    placeholder = 'Sugar'
                                    keyboardType = 'numeric'
                                    style = 'w-32 text-xs '
                                />
                            </View>
                        </>
                    )}
                </View>
                {mode === 1 && (
                    <View className = 'flex-row items-center space-x-3 mt-6'>
                        <View className = 'flex-row items-center'>
                            <Text className = 'text-base text-gray-400 font-semibold'>Quantity: </Text>
                            <Text className = 'text-base text-slate-200'>{quantity}</Text>    
                        </View>
                        <View className = 'flex-col space-y-1'>
                            <TouchableOpacity
                                className = ''
                                onPress={()=>setQuantity(quantity + 1)}
                            >
                                <Icon name='chevron-up' type = 'font-awesome' color={'white'} size={16}/>
                            </TouchableOpacity>
                            <TouchableOpacity
                                className = ''
                                onPress={()=>setQuantity(quantity - 1 > 0 ? quantity - 1 : quantity)}
                            >
                                <Icon name='chevron-down' type = 'font-awesome' color={'white'} size={16}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </View>
        </AddResourceDialog>
    );
};

export default AddMealActivityDialog;