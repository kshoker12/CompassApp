import { View, SafeAreaView } from 'react-native'
import React from 'react'
import VinaryTitle from '../../components/VinaryTitle';
import BackgroundImage from '../../components/BackgroundImage';
import LifeUltimateTeamCard from './components/LifeUltimateTeamCard';
import OperationButton from '../../components/OperationButton';
import { useNavigation } from '@react-navigation/native';

/**
 * @description Life Ultimate Team Screen where user can view their LUT card
 * and log in daily ratings.
 * @returns {JSX.Element}
 */
const LifeUltimateTeamScreen = () => {
  /** Navigation object */
  const navigation = useNavigation();

  /** Render Life Ultimate Team title, Life Ultimate Team Card, and Life Ultimate Team Ratings */
  return (
    <SafeAreaView>
      <View className = 'w-full h-full '>
        <BackgroundImage imagePath = {require('../../images/worldcup.jpg')}/>
        <VinaryTitle title = 'Life Ultimate Team' style = 'self-center' textStyle = 'text-5xl pt-8  text-[#fbbf24] shadow-xl shadow-black'/>
        <LifeUltimateTeamCard/>
        <OperationButton 
          title = 'Log Daily Ratings'
          style = 'absolute self-end bottom-2 right-4 bg-amber-600 z-50'
          textStyle = 'text-xl text-white'
          clickAction = {()=>navigation.navigate('RatingLog')}
        />
      </View>
    </SafeAreaView>
  );
};

export default LifeUltimateTeamScreen;