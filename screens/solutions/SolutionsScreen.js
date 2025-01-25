import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import BackgroundImage from '../../components/BackgroundImage';
import DreamMeadowTitle from '../../components/DreamMeadowTitle';
import BackArrow from '../../components/BackArrow';
import OperationButton from '../../components/OperationButton';
import AddSolutionDialog from './components/AddSolutionDialog';
import { AppContext } from '../../context/AppContext';
import { solutionModes } from '../../Constants/solutionConstants';
import SolutionViewCard from './components/SolutionViewCard';
import EditSolutionDialog from './components/EditSolutionDialog';

/** 
 * @description Solutions screen where user can view problems and provide solution
 * @returns {JSX.Element}
 */
const SolutionsScreen = () => {
    /** Context Variables */
    const { solutions } = useContext(AppContext);

    /** State variable indicating current mode of solutions screen */
    const [ currentMode, setCurrentMode ] = useState(solutionModes.IDLE_MODE);

    /** State variable indicating active solution being viewed */
    const [activeSolutionId, setActiveSolutionId] = useState(-1);

    /** State representing mode of whether solved or unsolved solutions are being displayed */
    const [showSolvedSolutions, setShowSolvedSolutions] = useState(false);

    /** Set active solution to inactive upon change of solutions being viewed (Solved vs. Unsolved) */
    useEffect(()=>{setActiveSolutionId(-1)}, [showSolvedSolutions]);

    /** Render solution screen with title, solutions card, and ratio of problems solved */
    return (
        <SafeAreaView>
            <AddSolutionDialog 
                currentMode = {currentMode} 
                setCurrentMode = {setCurrentMode}
            />
            <EditSolutionDialog
                currentMode = {currentMode}
                setCurrentMode = {setCurrentMode}
                solutionId = {activeSolutionId}
            />
            <View className = 'w-full h-full flex-col'>
                <BackgroundImage 
                    imagePath = {require('../../images/solutionsbg.jpg')} shade = 'bg-purple-950'
                />
                <DreamMeadowTitle   
                    title = 'Solutions'
                    style = 'self-center '
                    textStyle = 'text-7xl text-slate-200 pt-5'
                />
                <BackArrow
                    style = 'self-start absolute m-2 z-50'
                    colour = 'white'
                />
                <ScrollView className = 'flex-grow z-50'>
                    {[...solutions.filter(solution => showSolvedSolutions ? solution.is_solved : !solution.is_solved)].reverse().map(solution=>(
                        <SolutionViewCard
                            solution = {solution}
                            activeSolutionId = {activeSolutionId}
                            setActiveSolutionId = {setActiveSolutionId}
                            setCurrentMode = {setCurrentMode}
                            currentMode = {currentMode}
                        />
                    ))}
                </ScrollView>
                <View className = 'flex-row justify-between items-center m-4 z-50'>
                    <OperationButton
                        title = {`${showSolvedSolutions ? 'View Unsolved' : 'View Solved'}`}
                        style = 'bg-[#2c2e45] border-white w-44'
                        textStyle = 'text-lg text-center'
                        clickAction = {()=>setShowSolvedSolutions(!showSolvedSolutions)}
                    />
                    <OperationButton
                        title = 'Add Problem'
                        style = 'bg-[#2c2e45] border-white w-44 '
                        textStyle = 'text-lg text-center'
                        clickAction = {()=>setCurrentMode(solutionModes.ADD_SOLUTION)}
                    />     
                </View>
            </View>
        </SafeAreaView>
    );
};

export default SolutionsScreen;