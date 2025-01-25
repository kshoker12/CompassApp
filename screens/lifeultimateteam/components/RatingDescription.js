import { View, Text } from 'react-native'
import React from 'react'
import { StarIcon } from 'react-native-heroicons/solid';

/**
 * @description Rating description for each rating score (1 - 10)
 * @param {number} rating Rating to provide description for
 * @param {string} description Description to indicate the value of this rating
 * @returns {JSX.Element}
 */
const RatingDescription = ({rating, description}) => (
    <View className = ' flex-row items-center justify-between border-[#bca770] border-2 rounded-lg bg-[#fde68a] px-4 py-1 shadow-black shadow-xl my-0.5 opacity-80 mx-8'>
        <View className = 'flex-row items-center justify-start'>
            <Text className = 'text-xl'>{rating}</Text>
            <Text className = 'text-xl font-thin'>{` - ${description}`}</Text> 
        </View>
        <View className = 'flex-row items-center justify-end'>
            {Array(parseInt(rating)).fill(null).map((_, index)=>(
                <StarIcon size={14} color={'rgb(183, 83, 9)'}/>
            ))}   
        </View>
    </View>
);

export default RatingDescription;