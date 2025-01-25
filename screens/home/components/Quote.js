import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import * as AppHelper from '../../../Helpers/HelperFunctions';

/**
 * @description Quote of the day extracted upon each reload of app
 * @returns {JSX.Element}
 */
const Quote = () => {
    /** State variable storing current quote value */
    const [ quote, setQuote ] = useState();

    /** Fetch a quote upon each reload */
    useEffect(()=>{
        AppHelper.obtainQuote(setQuote);
    }, []);

    /** Render quote of the day */
    return (
        <View className = 'bg-primary-purple border-purple-500 border-[1px] p-5 m-2 flex-col space-y-1 opacity-90'>
            <Text className = 'font-thin text-slate-200 text-xl'>Quote of the Day</Text>
            <ScrollView className = 'h-12 overflow-y-auto'>
                <Text className = 'text-slate-200 text-xs'>"{quote ? quote.quote : ''}" - <Text className = 'font-bold text-slate-300'>{quote ? quote.author : ''} </Text></Text>    
            </ScrollView>
        </View>
    );
};

export default Quote;