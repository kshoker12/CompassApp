import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React, { useContext, useState } from 'react'
import { AppContext } from '../../context/AppContext';
import BackgroundImage from '../../components/BackgroundImage';
import DreamMeadowTitle from '../../components/DreamMeadowTitle';
import DreamViewCard from './components/DreamViewCard';
import OperationButton from '../../components/OperationButton';
import { useNavigation } from '@react-navigation/native';
import BackArrow from '../../components/BackArrow';

/**
 * @description Screen where user can view list of all dreams
 * @returns {JSX.Element}
 */
const DreamsListScreen = () => {
    /** Context Variables */
    const { dreams, password, dispatch } = useContext(AppContext);

    /** Navigation object */
    const navigation = useNavigation();

    /** State variable indicating which dream story is being viewed */
    const [dreamStoryIndex, setDreamStoryIndex] = useState(-1);

    /** Render dreams journal title and list of all dreams and an operation button to add a dream */
    return (
        <SafeAreaView>
            <View className = 'w-full h-full flex-col'>
                <BackgroundImage imagePath = {require('../../images/dreamsbg.jpg')} shade = 'bg-purple-950'/>
                <BackArrow 
                    colour = 'rgb(226, 232, 240)'
                    style = 'absolute m-2'
                />
                <DreamMeadowTitle title = 'Dream Journal' style = 'self-center' textStyle = 'text-slate-200 text-6xl pt-6'/>
                <ScrollView className = 'flex-grow mb-1 z-50'>
                    {[...dreams].reverse().map((dream, index) => (
                        <DreamViewCard 
                            dream = {dream} 
                            index = {index} 
                            dreamStoryIndex = {dreamStoryIndex}
                            setDreamStoryIndex = {setDreamStoryIndex} 
                        />
                    ))}
                </ScrollView>
                <OperationButton
                    title = 'Add Dream'
                    style = 'self-end m-2 w-36 bg-[#2c2e45] border-white z-50 border-[1px]'
                    textStyle = 'text-lg text-center'
                    clickAction = {()=>navigation.navigate('DreamsAdd')}
                />
            </View>
        </SafeAreaView>
    );
};

export default DreamsListScreen;