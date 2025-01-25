import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';

/**
 * @description Primary item card which can be expanded or collapsed
 * @param {JSX.Element} children Child components to this component
 * @param {boolean} active Indicator whether this card is active
 * @param {Function} clickAction Action to be confucted upon clicking item
 * @param {boolean} deleteMode Indicator whether item is in delete mode
 * @param {boolean} complete Indicator whether item is complete
 * @param {string} style Additional styling for component
 * @returns {JSX.Element}
 */
const PrimaryItemCard = ({children, active = false, deleteMode = false, clickAction, complete = false}) => (
    <TouchableOpacity
        className = {`border-[1px] mx-6 opacity-90 rounded-xl my-2 overflow-hidden mb-2 ${active? 'border-primary-lightPurple' : 'border-slate-200'}`}
        onPress={clickAction}
    >
        <LinearGradient
            colors={!deleteMode ? ['#2c2e45', complete ? '#4f6962' : '#6b21a8', 'black'] : ['#2c2e45', 'red', 'black']}
            start={{x: 0.1, y: 0}}
            end={{x: 1, y: 1}}
            className = 'py-1 px-4'
        >
            {children}             
        </LinearGradient>
    </TouchableOpacity>
);

export default PrimaryItemCard;