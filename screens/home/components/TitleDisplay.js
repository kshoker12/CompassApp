import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import { AppContext } from '../../../context/AppContext'
import Stat from './Stat';
import { Image } from 'expo-image';

/**
 * @description Display of title 
 * @returns {JSX.Element}
 */
const TitleDisplay = () => {
    /** Context variables */
    const { compass } = useContext(AppContext);

    /** Render title stat and title itself is user is currently champion, otherwise a generic message */
    return (
        <View className = 'flex-row items-center justify-between h-12 space-x-2 mt-2 mb-1'>
            <Stat title = {`${compass.title_defences}x`} className = 'h-12' textStyle = 'text-base' icon = {'trophy'}/>
            <View
                className = {`opacity-90 flex-col items-center justify-center h-12 w-64 border-[1px] mb-1 ${compass.is_champion ? 'border-gold-50 bg-gold-200' : 'bg-primary-purple border-primary-lightPurple'} `}
                // style = {{backgroundColor: 'rgb(234, 179, 8)'}}
            >
                {compass.is_champion ? (
                    <View
                        style = {{
                            shadowColor: 'black',
                            shadowRadius: 3.5,
                            shadowOffset: {width: 5, height: 4},
                            shadowOpacity: 0.5
                        }}
                    >
                        <Image
                            source={require('../../../images/ufc.png')}
                            className = 'w-24 h-10'
                        />
                    </View>    
                ) : (
                    <Text className = 'text-slate-200 text-base font-thin'>Active Contender</Text>
                )}
            </View>
            <Text>TitleDisplay</Text>
        </View>
    );
};

export default TitleDisplay;