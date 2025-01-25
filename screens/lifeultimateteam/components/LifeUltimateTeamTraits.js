import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React, { useContext, useMemo } from 'react'
import { AppContext } from '../../../context/AppContext';
import * as lifeUltimateTeamHelper from '../../../Helpers/lifeUltimateTeamHelper';
import BackgroundImage from '../../../components/BackgroundImage';
import VinaryTitle from '../../../components/VinaryTitle';
import BackArrow from '../../../components/BackArrow';
import { useNavigation } from '@react-navigation/native';

/**
 * @description Life Ultimate Team traits view where user can view their rating for each trait's sub traits
 * @param {Object} route Route object 
 * @returns {JSX.Element}
 */
const LifeUltimateTeamTraits = ({route}) => {
    /** Context Variables */
    const { lifeUltimateTeam } = useContext(AppContext);

    /** Navigation object */
    const navigation = useNavigation();
    
    /** Obtain memoized trait category and rating from route object */
    const {category, rating} = useMemo(()=> route.params,[]);

    /** Extract memoized sub traits for given category */
    const subTraits = useMemo(()=>lifeUltimateTeamHelper.extractTraitGroupings(lifeUltimateTeam, category), [category]);

    /** Render trait view with all sub traits */
    return (
        <SafeAreaView>
            <View className = 'w-full h-full text-[#fbbf24] flex-col'>
                <BackgroundImage imagePath = {require('../../../images/worldcup.jpg')}/>
                <BackArrow 
                    colour = 'rgb(251, 191, 36)'
                    style = 'absolute'
                    onPress = {()=>navigation.goBack()}
                />
                <Text className = 'self-center text-5xl text-[#fbbf24] mt-4'>{isNaN(rating) ? 0 : rating.toFixed(0)}</Text>
                <VinaryTitle title = {category} style = 'self-center shadow-xl' textStyle = 'text-5xl pt-6 text-[#fbbf24] shadow-xl shadow-black'/>
                <ScrollView className = 'flex-grow mb-4 space-y-4 z-50'>
                    {subTraits.map(({name, rating, description}) => (
                        <View className = '  bg-[#fde68a] opacity-80 mx-6 border-4 border-[#bca770] rounded-lg p-4 shadow-lg shadow-black'>
                            <View className = 'flex-row space-x-3 items-center justify-start'>
                                <Text className = 'text-black text-3xl'>{isNaN(rating) ? 0 : rating.toFixed(0)}</Text>
                                <Text className = 'text-black text-3xl font-thin'>{name}</Text>    
                            </View>
                            <View className = 'h-14'>
                                <Text>{description}</Text>    
                            </View>
                        </View>
                    ))}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default LifeUltimateTeamTraits;