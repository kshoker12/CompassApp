import { View, Text, TouchableOpacity } from 'react-native'
import React, { useContext, useState } from 'react'
import { AppContext } from '../../../context/AppContext';
import { StarIcon as StarSolid} from 'react-native-heroicons/solid';
import { StarIcon as StarOutline } from 'react-native-heroicons/outline';
import OperationButton from '../../../components/OperationButton';
import ComponentLoader from '../../../components/ComponentLoader';
import { useNavigation } from '@react-navigation/native';
import { updateSubTraitRating } from '../../../Helpers/lifeUltimateTeamHelper';

/**
 * @description Sub trait rating component where user selects daily rating for sub trait
 * @param {number} index Index of current sub rating to track for pager
 * @param {React.Ref} pagerRef Reference to pager component
 * @param {Object} subTrait Current sub trait being viewed
 * @returns {JSX.Element}
 */
const SubTraitRatingPage = ({index, pagerRef, subTrait}) => {
    /** Context Variables */
    const { lifeUltimateTeam, dispatch, password } = useContext(AppContext);

    /** Navigation Object */
    const navigation = useNavigation();

    /** State variable indicating the daily rating out of ten allocated for this sub rating */
    const [dailyRating, setDailyRating] = useState(5);

    /** State variable indicating, user-requested action is being conducted */
    const [loading, setLoading] = useState(false);

    /** Render sub trait name, current rating, and 10 stars to choose from */
    return (
        <View className = 'w-[350px] bg-[#fde68a] border-[#bca770] border-2 rounded-lg self-center bottom-8 absolute shadow-lg shadow-black z-50'>
            <View className = 'self-start flex-row items-center space-x-2 pt-2 px-4'>
                <Text className = 'text-2xl'>{isNaN(subTrait.rating) ? 0 : subTrait.rating.toFixed(0)}</Text>
                <Text className = 'text-2xl font-thin'>{subTrait.name}</Text>
            </View>
            <View className = 'px-4 pt-1 h-[60px] '>
                <Text className = 'text-black'>{subTrait.description}</Text>
            </View>
            <View className = 'flex-row flex-wrap self-center py-2 text-amber-700'>
                {Array(10).fill(null).map((_, index)=>(
                    <TouchableOpacity
                        onPress={()=>setDailyRating(index + 1)}
                    >
                        {index < dailyRating ? (
                            <StarSolid
                                size={30}
                                color={'rgb(183, 83, 9)'}
                            />
                        ) : (
                            <StarOutline
                                size={30}
                                color={'rgb(183, 83, 9)'}
                            />
                        )}
                    </TouchableOpacity>
                ))}
            </View>
            <View className = 'flex-row items-center justify-end mx-8 mb-8 mt-4 '>
                <OperationButton
                    title = 'Skip'
                    style = 'mr-2 w-24 bg-[#fde047]'
                    textStyle = 'text-lg text-center text-black '
                    clickAction = {()=>{
                        if (lifeUltimateTeam.length > index + 1) {
                            pagerRef.current.setPage(index + 1)    
                        } else navigation.goBack();
                    }}
                />
                <OperationButton
                    title = 'Submit'
                    style = 'w-24 bg-[#d97706]'
                    textStyle = 'text-lg text-center '
                    clickAction = {async ()=>{
                        setLoading(true);
                        await updateSubTraitRating(dispatch, subTrait.id, dailyRating);
                        if (lifeUltimateTeam.length > index + 1 ) {
                            pagerRef.current.setPage(index + 1);
                        } else navigation.goBack();
                        setLoading(false);
                    }}
                />    
            </View>
            
            <ComponentLoader
                title = 'Processing'
                style = 'absolute bottom-2 right-7'
                textStyle = ''
                indicatorStyling = 'black'
                loading = {loading}
            />
        </View>
    );
};

export default SubTraitRatingPage;