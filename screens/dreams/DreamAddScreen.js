import { View, Text, SafeAreaView, ScrollView, TextInput } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext';
import { useNavigation } from '@react-navigation/native';
import BackgroundImage from '../../components/BackgroundImage';
import DreamMeadowTitle from '../../components/DreamMeadowTitle';
import OperationButton from '../../components/OperationButton';
import BackArrow from '../../components/BackArrow';
import ComponentLoader from '../../components/ComponentLoader';
import { Image } from 'expo-image';
import * as dreamJournalHelper from '../../Helpers/dreamJournalHelper';

/**
 * @description Add Dream screen where user types in new dream title and story
 * @returns {JSX.Element}
 */
const DreamAddScreen = () => {
    /** Context Variables */
    const { dispatch, password } = useContext(AppContext);

    /** Navigation Object */
    const navigation = useNavigation();

    /** State variable indicating user-requested action is being conducted */
    const [loading, setLoading] = useState(false);

    /** State variable indicating text for dream title */
    const [title, setTitle] = useState('');

    /** State variable indicating text for dream story */
    const [story, setStory] = useState('')

    /** Render Add Dream title, text input for title and story */
    return (
        <SafeAreaView>
            <View className = 'w-full h-full flex-col'>
                <BackgroundImage imagePath = {require('../../images/dreamsbg.jpg')} shade = 'bg-purple-950'/>
                <DreamMeadowTitle title = 'New Dream' style = 'self-center' textStyle = 'text-slate-200 text-6xl pt-6'/>
                <BackArrow 
                    colour = 'rgb(226, 232, 240)'
                    style = 'absolute m-2'
                />
                <View className = 'flex-grow flex-col mx-10 z-50 mt-4 space-y-4'>
                    
                    <View className = ''>
                        <TextInput
                            className = 'rounded-lg border-[1px] border-slate-200 py-2 text-slate-200 text-base px-3 bg-[#2c2e45] opacity-95'
                            value={title}
                            onChangeText={(text)=>setTitle(text)}
                            blurOnSubmit
                            returnKeyType='done'
                            placeholder='Title'
                            placeholderTextColor={'gray'}
                        />
                    </View>
                    <View className = ''>
                        <TextInput
                            multiline
                            className = 'rounded-lg border-[1px] border-slate-200 py-2 text-slate-200 text-base px-3 bg-[#2c2e45] h-[200px] opacity-95'
                            value = {story}
                            onChangeText={(text)=> setStory(text)}
                            blurOnSubmit
                            returnKeyType='done'
                            placeholder='Story'
                            placeholderTextColor={'gray'}
                        />
                    </View>
                    <View className = 'h-72 w-72 self-center'>
                        <Image
                            source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Yin_and_Yang_symbol.svg/1200px-Yin_and_Yang_symbol.svg.png'}}
                            className = 'h-full w-full opacity-80'
                        />
                    </View>
                </View>
                <View className = 'mb-6 z-50'>
                    <OperationButton
                        title = 'Add Dream'
                        style = {`self-end m-2 w-36 bg-[#2c2e45] border-white z-50 border-[1px] ${!title || !story ? 'opacity-50' : 'opacity-1'}`}
                        textStyle = 'text-lg text-center'
                        disabled = {!title || !story}
                        clickAction = {async ()=>{
                            setLoading(true);
                            await dreamJournalHelper.addDream(dispatch, title, story);
                            setLoading(false);
                            navigation.goBack();
                        }}
                    />
                    <ComponentLoader
                        title = 'Processing'
                        style = 'absolute self-end -bottom-4 right-10'
                        textStyle = 'text-slate-200 '
                        indicatorStyling = 'rgb(226, 232, 240)'
                        loading = {loading}
                    />    
                </View>
            </View>
        </SafeAreaView>
    );
};

export default DreamAddScreen;