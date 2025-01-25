import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { AppContext } from '../../../context/AppContext';
import { useNavigation } from '@react-navigation/native';
import VinaryTitle from '../../../components/VinaryTitle';
import BackgroundImage from '../../../components/BackgroundImage';
import BackArrow from '../../../components/BackArrow';
import PagerView from 'react-native-pager-view';
import { Icon } from 'react-native-elements';
import SubTraitRatingPage from './SubTraitRatingPage';
import { TRAIT_RATING_DESCRIPTIONS } from '../../../Constants/lifeUltimateTeamConstants';
import RatingDescription from './RatingDescription';

/** 
 * @description Screen where user Logs daily rating for each subTrait
 * @returns {JSX.Element}
 */
const LifeUltimateTeamLog = () => {
    /** Context Variables */
    const { lifeUltimateTeam } = useContext(AppContext);

    /** Navigation Object */
    const navigation = useNavigation();

    /** Pager reference to control pager */
    const pagerRef = useRef();

    /** Render pager for each sub trait where user must make selection for daily rating */
    return (
        <SafeAreaView>
            <View className = 'w-full h-full'>
                <BackgroundImage imagePath = {require('../../../images/worldcup.jpg')}/>
                <View className = 'flex-row justify-center items-center '>
                    <VinaryTitle title = 'Daily Log' style = 'self-center' textStyle = 'mr-3 text-5xl pt-10 text-[#fbbf24] shadow-xl shadow-black'/>    
                    <Icon name='clipboard' type='font-awesome' color={'rgb(251, 191, 36)'} size={40}/>
                </View>
                <BackArrow
                    colour = 'rgb(251, 191, 36)'
                    style = 'absolute z-50'
                    onPress = {()=>pagerRef.current.page === 0 && navigation.goBack}
                />
                <View className = 'space-y-1 '>
                    {Object.keys(TRAIT_RATING_DESCRIPTIONS).reverse().map(key=>(
                        <RatingDescription rating={key} description={TRAIT_RATING_DESCRIPTIONS[key]}/>
                    ))}    
                </View>
                <PagerView
                    initialPage={0}
                    className = 'w-full h-[36%] z-50 opacity-80'
                    ref={pagerRef}
                    scrollEnabled = {false}
                >
                    {lifeUltimateTeam.map((subTrait, index)=>(
                        <SubTraitRatingPage
                            index = {index}
                            pagerRef = {pagerRef}
                            subTrait = {subTrait}
                        />
                    ))}
                </PagerView>
            </View>
        </SafeAreaView>
    );
};

export default LifeUltimateTeamLog;