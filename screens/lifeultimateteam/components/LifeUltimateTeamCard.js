import { View, Text, TouchableOpacity } from 'react-native'
import React, { useContext, useMemo } from 'react'
import { AppContext } from '../../../context/AppContext';
import { Image } from 'react-native';
import * as lifeUltimateTeamHelper from '../../../Helpers/lifeUltimateTeamHelper';
import { useNavigation } from '@react-navigation/native';

/**
 * @description Life Ultimate Team Card including image of me and ratings for traits
 * @returns {JSX.Element}
 */
const LifeUltimateTeamCard = () => {
    /** Context Variables */
    const { lifeUltimateTeam } = useContext(AppContext);

    /** Navigation object */
    const navigation = useNavigation();

    /** Compute memoized rating for traits and total rating */
    const { totalRating, categoryRatings } = useMemo(()=> lifeUltimateTeamHelper.extractRatings(lifeUltimateTeam),[lifeUltimateTeam]);

    /** Render Life Ultimate Team card, with picture of me and ratings */
    return (
        <View className = 'self-center mt-2 z-50 w-full'>
            <Image 
                source={require('../../../images/fifacard.png')}
                className = 'w-[350px] h-[560px] absolute self-center opacity-80'
            />
            <Image source={require('../../../images/self.png')} className = 'w-[200px] h-[250px] self-center top-[46px] -right-10'/>
            <View className = 'absolute left-16 top-16 space-y-0.5 items-center flex-col'>
                <Text className = 'text-3xl'>{isNaN(totalRating) ? 0 : totalRating.toFixed(0)}</Text> 
                <Image source={require('../../../images/canadaflag.png')} className = 'mb-2'/>
                <Image source= {require('../../../images/ubc.png')} className = ''/>    
            </View>
            <View className = 'top-14 self-center'>
                <Text className = 'text-3xl text-amber-950'>Karandeep Shoker</Text>
                <View className = 'left-4 space-y-1'>
                    {categoryRatings.map(({category, rating})=>(
                        <TouchableOpacity 
                            className = 'flex-row items-center justify-start space-x-1'
                            onPress={()=>navigation.navigate('RatingTraitView', {category, rating})}
                        >
                            <Text className = 'text-2xl text-slate-800'>{isNaN(rating)? 0 : rating.toFixed(0)}</Text>
                            <Text className = 'text-2xl font-thin'>{category}</Text>    
                        </TouchableOpacity>    
                    ))}
                </View>
            </View>
        </View>
    );
}; 

export default LifeUltimateTeamCard;