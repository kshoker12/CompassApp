import React, { useEffect, useState } from 'react'
import AppLoading from 'expo-app-loading';
import { StyleSheet, Text, View } from 'react-native';
import useFonts from "./useFonts";

/**
 * @description Dream Meadow font title component
 * @param {string} title Title text
 * @param {string} style Additional styling to apply to container 
 * @param {string} textStyle Styling for the text of this title
 * @returns {JSX.Element}
 */
const DreamMeadowTitle = ({title, style = "", textStyle = ''}) => {
    /** Indicates if fonts have been loaded yet or not */
    const [fontLoaded, setFontLoaded] = useState(false);

    /** Load fonts upon component mounting */
    useEffect(() => {
        async function loadFonts() {
            await useFonts();
            setFontLoaded(true);
        }
        loadFonts();
    }, []);

    /** If Font isn't loaded yet, render the AppLoading */
    if (!fontLoaded) {
        return <AppLoading/>;
    }

    /** Render basic view with Dream Meadow title */
    return (
        <View className = {`${style}`}>
            <Text className = {`${textStyle}`} style ={styles.customFont}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    customFont: {
      fontFamily: 'DreamMeadow',
    },
})

export default DreamMeadowTitle;