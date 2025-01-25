import { View, Text, TextInput, StyleSheet, InputAccessoryView, Platform } from 'react-native'
import React from 'react'
import { Button } from 'react-native-elements';

/**
 * @description Primary text input
 * @param {string} text Text to display in text input
 * @param {Function} setText Function to set text provided value
 * @param {string} placeholder Placeholder text for text input
 * @param {string} returnKeyType Type of return key
 * @param {Object} props Additional props to add to text input
 * @param {string} style Additional styling for component
 * @returns {JSX.Element}
 */
const PrimaryTextInput = ({text, setText, placeholder, returnKeyType = 'done', style = '', ...props}) => (
    <View>
        <TextInput
            className = {`rounded-lg border-[1px] border-slate-200 py-2 text-base text-slate-200 px-3 bg-[#1a1b2a] opacity-95 ${style}`}
            value={text}
            onChangeText={(newText)=>setText(newText)}
            blurOnSubmit
            returnKeyType={returnKeyType}
            placeholder={placeholder}
            // inputAccessoryViewID={'uniqueId'}
            placeholderTextColor={'gray'}
            {...props}
        />
      {/* {Platform.OS === 'ios' && false && (
        <InputAccessoryView nativeID={'uniqueId'}>
          <View className = 'self-end w-20'>
            <Button title="Return" onPress={()=>setText(prev => prev + '\n')} />
          </View>
        </InputAccessoryView>
      )} */}
    </View>
    
);

export default PrimaryTextInput;