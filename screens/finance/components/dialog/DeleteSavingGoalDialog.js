import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { savingsModes } from '../../../../Constants/financeConstants';
import { Dialog } from 'react-native-elements';
import { BANKING_CARDS } from '../../../../Constants/financeConstants';
import OperationButton from '../../../../components/OperationButton';
import { deleteSavingGoal } from '../../../../Helpers/financesHelper';
import { AppContext } from '../../../../context/AppContext';
import ComponentLoader from '../../../../components/ComponentLoader';

/**
 * @description Dialog to Delete saving goal
 * @param {number} currentMode -> Current Mode of savings screen
 * @param {Function} setCurrentMode -> Function to switch modes of saving screen
 * @param {number} selectedIndex -> Index of clicked saving goal
 * @returns {JSX.Element}
 */
const DeleteSavingDialog = ({currentMode, setCurrentMode, selectedIndex}) => {
    /** Context Variables */
    const { dispatch, password, finances } = useContext(AppContext); 
    /** State variable indicating index of selected banking card */
    const [selectedCard, setSelectedCard] = useState(0);

    /** State variable indicating user-requested action is being conducted */
    const [loading, setLoading] = useState(false);

    /** Indicator whether there is an error with input */
    const [error, setError] = useState(false);

    /** If selected card doesn't have enough savings, throw error and prevent deletion */
    useEffect(()=>{
        if (selectedIndex !== -1) setError(finances.debitCards[selectedCard].savings < finances.savings[selectedIndex].saved_amount)
    },[selectedCard, selectedIndex])

    /**
     * @description Render Banking cards to transfer savings to and an operation button to confirm selection
     */
    return (
        <Dialog
            isVisible = {currentMode === savingsModes.REMOVE_MODE && selectedIndex >= 0}
            onBackdropPress = {()=> setCurrentMode(savingsModes.IDLE_MODE)}
            overlayStyle = {{
                width: 330,
                backgroundColor: 'rgb(226, 232, 240)'
            }}
        >
            <View className = 'space-y-2'>
                <Text className = 'text-gray-600 text-xl'>Pick card to transfer savings to</Text>
                <View className = 'flex-row items-center justify-center space-x-2'> 
                    {BANKING_CARDS.map(({cardImage, type, id}, index)=> type !== 'creditCards' && (
                        <TouchableOpacity 
                            className = {`overflow-hidden w-[128px] rounded-lg  ${selectedCard === index ? 'border-green-500 border-4' : ''}`}
                            onPress={()=>setSelectedCard(index)}
                        >
                            <Image source={cardImage} className = {`w-[130px] h-[75px] ${selectedCard === index ? '-ml-0.5' : ''}`}/>
                        </TouchableOpacity>
                    ))}    
                </View> 
                {error && (
                    <View className = 'absolute bottom-6 w-1/2 self-start left-4'>
                        <Text className = 'text-red-700 text-[10px] font-semibold'>Error: Not enough savings in this card</Text>
                    </View>    
                )}
                <OperationButton
                    style = {`self-end my-2 ${error ? 'opacity-30' : 'opacity-1'} `}
                    textStyle = {'text-base'}
                    clickAction = {async ()=>{
                        setLoading(true);
                        await deleteSavingGoal(dispatch, finances.savings[selectedIndex].id, finances.debitCards[selectedCard].id);
                        setLoading(false);
                        setCurrentMode(savingsModes.IDLE_MODE);
                    }}
                    disabled = {error}
                    title = {'Confirm'}
                />
                <ComponentLoader
                    title = 'Deleting'
                    textStyle = ''
                    style = 'self-end -bottom-4 absolute '
                    indicatorStyling = ''
                    loading = {loading}
                />
            </View>
        </Dialog>
    );
};

export default DeleteSavingDialog;