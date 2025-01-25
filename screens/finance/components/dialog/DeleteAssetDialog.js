import { View, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import React, { useContext, useState } from 'react'
import { Dialog } from 'react-native-elements';
import { BANKING_CARDS } from '../../../../Constants/financeConstants';
import OperationButton from '../../../../components/OperationButton';
import * as financeHelper from '../../../../Helpers/financesHelper'
import { AppContext } from '../../../../context/AppContext';

/**
 * @description Dialog to Delete asset
 * @param {number} deleteMode -> Indicator whether delete mode dialog is active
 * @param {Function} setDeleteMode -> Function to switch delete mode 
 * @param {number} selectedIndex -> Index of clicked asset
 * @param {Function} setSelectedIndex -> Function to change index of selected asset
 * @returns {JSX.Element}
 */
const DeleteAssetDialog = ({deleteMode, setDeleteMode, selectedIndex, setSelectedIndex}) => {
    /**
     * @description Context Variables
     */
    const { dispatch, finances, password } = useContext(AppContext)
    /**
     * @description State variable indicating index of selected banking card
     */
    const [selectedCard, setSelectedCard] = useState(0);

    /**
     * @description State variable indicating user-requested action is being conducted
     */
    const [loading, setLoading] = useState(false);

    /**
     * @description Render Banking cards to transfer savings to and an operation button to confirm selection
     */
    return (
        <Dialog
            isVisible = {deleteMode}
            onBackdropPress = {()=> setDeleteMode(false)}
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
                <View className = 'flex-row justify-center items-center mt-2 space-x-1'>
                    <OperationButton
                        textStyle = {'text-base text-center'}
                        clickAction = {async ()=>{
                            setLoading(true);
                            await financeHelper.deleteAsset(dispatch, finances.assets[selectedIndex].id, finances.debitCards[selectedCard].id);
                            setLoading(false);
                            setSelectedIndex(-1);
                            setDeleteMode(false);
                        }}
                        style = 'w-24'
                        title = {'Confirm'}
                    />
                    <TouchableOpacity 
                        className = 'px-4 py-1 rounded-lg border-[1px] border-black bg-gray-300 w-24'
                        onPress={()=>{
                            setDeleteMode(false)
                        }}
                    >
                        <Text className = 'text-base shadow-xl text-center'>Cancel</Text>
                    </TouchableOpacity>    
                </View>
                {loading && (
                    <View className = 'absolute self-center -bottom-5 flex-row items-center'>
                        <Text>Deleting</Text>
                        <ActivityIndicator color={'black'}/>
                    </View>
                )}
            </View>
        </Dialog>
    );
};

export default DeleteAssetDialog;