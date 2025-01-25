import React, { useEffect, useState } from 'react'
import AppLoading from 'expo-app-loading';
import { StyleSheet, Text, View } from 'react-native';
import useFonts from "./useFonts";

/**
 * @description Vinary font title component
 * @param {string} title -> Title text
 * @param {string} style -> Additional styling to apply to container 
 * @param {string} textStyle -> Styling for the text of this title
 * @returns {JSX.Element}
 */
const VinaryTitle = ({title, style = "", textStyle = ''}) => {
    /**
     * @description Indicates if fonts have been loaded yet or not
     */
    const [fontLoaded, setFontLoaded] = useState(false);

    /**
     * @description Load fonts upon component mounting
     */
    useEffect(() => {
        async function loadFonts() {
        await useFonts();
        setFontLoaded(true);
        }
        loadFonts();
    }, []);

    // If Font isn't loaded yet, render the AppLoading
    if (!fontLoaded) return <AppLoading/>;

    /**
     * @description Render Vinary Demo Title in Text Component
     */
    return (
        <View className = {`${style}`}>
            <Text className = {`${textStyle}`} style ={styles.customFont}>{title}</Text>
        </View>
    );
};

/**
 * @description Stylesheet loading calgary demo font family
 */
const styles = StyleSheet.create({
    customFont: {
      fontFamily: 'CalgaryDemo',
    },
});

export default VinaryTitle;