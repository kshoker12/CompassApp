import { View, Text, TouchableOpacity } from 'react-native'
import React, { useContext, useState } from 'react'
import { dateFormatter } from '../../../Helpers/HelperFunctions';
import { CheckBox } from 'react-native-elements';
import { AppContext } from '../../../context/AppContext';
import { useNavigation } from '@react-navigation/native';
import ComponentLoader from '../../../components/ComponentLoader';
import OperationButton from '../../../components/OperationButton';
import { solveSolution } from '../../../Helpers/solutionsHelper';
import { solutionModes } from '../../../Constants/solutionConstants';
import EditSolutionDialog from './EditSolutionDialog';

/**
 * @description Card displaying basic information of solution
 * @param {Object} solution Dream object to display
 * @param {number} activeSolutionId Id of currently selected solution
 * @param {Function} setActiveSolutionId Function to change selected solution
 * @param {Function} setCurrentMode Function to change current mode
 * @returns {JSX.Element}
 */
const SolutionViewCard = ({solution, activeSolutionId, setActiveSolutionId, setCurrentMode}) => {
    /** Context Variables */
    const { dispatch, password } = useContext(AppContext);

    /** State variable indicating, user requested action is being conducted */
    const [loading, setLoading] = useState(false);

    /** Render press-able solution title and date */
    return (
        <TouchableOpacity 
            className = {`${solution.is_solved ? 'bg-[#4f6962]' : 'bg-[#2c2e45]'} space-y-1 my-1 p-4 mx-8 border-2 ${activeSolutionId === solution.id ? 'border-purple-500' : 'border-slate-200'} rounded-xl opacity-95`}
            onPress={()=>setActiveSolutionId(activeSolutionId === solution.id ? -1 : solution.id)}
        >
            <Text className = 'text-slate-200 text-xl'>{solution.problem}</Text>
            <Text className = 'text-slate-200 font-thin'>{`${dateFormatter.format(new Date(solution.date_created))}${solution.is_solved ? ' - ' + dateFormatter.format(new Date(solution.date_solved)) : ''}`}</Text>
            {activeSolutionId === solution.id && (
                <View>
                    <View className = 'py-1'>
                        <Text className = 'text-slate-200'>{solution.solutionText}</Text>    
                    </View> 
                    {!solution.is_solved && (
                        <View className = ' flex-row justify-between items-center pb-4 space-x-2'>
                            <CheckBox
                                style = {{backgroundColor: 'blue'}}
                                title={'Solved'}
                                containerStyle = {{backgroundColor: '#6c71a6', borderColor: 'black', padding: 6.5, paddingHorizontal: 14, borderRadius: 10, marginLeft: -5}}
                                titleProps={{style: {color: 'white', fontWeight: 700, fontSize: 18}}}
                                checked = {solution.is_solved}
                                onPress={async ()=>{
                                    setLoading(true);
                                    await solveSolution(dispatch, solution.id);
                                    setLoading(false);
                                }}
                            />  
                            <OperationButton
                                title = 'Edit Master Key'
                                style = 'bg-[#6c71a6] border-white'
                                textStyle = 'text-lg'
                                clickAction = {()=>setCurrentMode(solutionModes.EDIT_SOLUTION)}
                            />
                            <ComponentLoader
                                title = 'Processing'
                                style = 'self-start absolute -bottom-1 left-10'
                                textStyle ='text-slate-200'
                                indicatorStyling = 'white'
                                loading = {loading}
                            />     
                        </View>
                    )}   
                </View>
            )}
        </TouchableOpacity>
    );
};

export default SolutionViewCard;