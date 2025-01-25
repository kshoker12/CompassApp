import { ActivityIndicator, Text, View } from "react-native";

/**
 * @description Screen loader which indicates user-requested action is being carried out
 * @param {string} title Title of loader
 * @param {string} textStyle Additional styling for text
 * @param {string} style Additional styling for component
 * @param {string} indicatorStyling Additional styling for activity indicator
 * @param {boolean} loading Indicator whether this component is showing
 * @returns {JSX.Element}
 */
const ScreenLoader = ({title = '', textStyle = '', style = '', indicatorStyling = 'gray', loading = false}) => loading && (
    <View className = {` ${style} flex-col items-center justify-center space-x-1 h-screen w-screen pb-20`} style = {{zIndex: 4000}}>
        <View className = 'absolute h-screen w-screen bg-gray-500 opacity-30 z-50'/>
        <ActivityIndicator color = {`${indicatorStyling}`} size={'large'} style = {{transform: [{ scale: 2 }] }}/>
        <Text className = {`${textStyle} text-xl mt-6`}>{title}</Text>
     </View>
);

export default ScreenLoader;