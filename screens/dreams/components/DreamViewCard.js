import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { dateFormatter } from '../../../Helpers/HelperFunctions';

/**
 * @description Card displaying basic information of dream
 * @param {Object} dream Dream object to display
 * @param {number} index Index of selected dream
 * @param {number} dreamStoryIndex Index of currently selected dream
 * @param {Function} setDreamStoryIndex Function to change dream story
 * @returns {JSX.Element}
 */
const DreamViewCard = ({dream, index, dreamStoryIndex, setDreamStoryIndex}) => {
    /** Render press-able dream title and date */
    return (
        <TouchableOpacity 
            className = {`bg-[#2c2e45] space-y-1 my-1 p-4 mx-8 border-2 ${dreamStoryIndex === index ? 'border-purple-500' : 'border-slate-200'} rounded-xl opacity-95`}
            onPress={()=>setDreamStoryIndex(dreamStoryIndex === index ? -1 : index)}
        >
            <Text className = 'text-slate-200 text-xl'>{dream.title}</Text>
            <Text className = 'text-slate-200 font-thin'>{dateFormatter.format(new Date(dream.date))}</Text>
            {dreamStoryIndex === index && (
                <View className = ''>
                    <Text className = 'text-slate-200'>{dream.story}</Text>    
                </View>
            )}
        </TouchableOpacity>
    );
};

export default DreamViewCard;