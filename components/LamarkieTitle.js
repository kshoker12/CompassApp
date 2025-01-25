import React, { useEffect, useState } from 'react'
import AppLoading from 'expo-app-loading';
import { StyleSheet, Text, View } from 'react-native';
import useFonts from "./useFonts";

/**
 * @description Lamarkie font title component
 * @param {string} title -> Title text
 * @param {string} style -> Additional styling to apply to container 
 * @param {string} textStyle -> Styling for the text of this title
 * @returns {Element}
 */
const LamarkieTitle = ({title, style = "", textStyle = ''}) => {
    // Indicates if fonts have been loaded yet or not
    const [fontLoaded, setFontLoaded] = useState(false);

    // Load fonts upon component mounting
    useEffect(() => {
        async function loadFonts() {
        await useFonts();
        setFontLoaded(true);
        }
        loadFonts();
    }, []);

    // If Font isn't loaded yet, render the AppLoading
    if (!fontLoaded) {
        return <AppLoading/>;
    }

    return (
        <View className = {`${style}`}>
            <Text className = {`${textStyle}`} style ={styles.customFont}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    customFont: {
      fontFamily: 'MyFont',
    },
  })

export default LamarkieTitle;