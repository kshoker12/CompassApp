import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Dialog } from 'react-native-elements';
import OperationButton from '../../../../components/OperationButton';
import { AppContext } from '../../../../context/AppContext';
import DeleteAssetDialog from './DeleteAssetDialog';
import { editAsset } from '../../../../Helpers/financesHelper';

/**
 * @description Asset view dialog allowing user to edit asset name or value and also provide option to delete asset
 * @param {number} selectedIndex -> Index of asset being viewed
 * @param {Function} setSelectedIndex ->  Function to change selected index
 * @returns {JSX.Element}
 */
const AssetViewDialog = ({selectedIndex, setSelectedIndex}) => {
    /**
     * @description Context variables
     */
    const { finances, dispatch, password } = useContext(AppContext);

    /**
     * @description State variable representing asset name
     */
    const [assetName, setAssetName] = useState();

    /**
     * @description State variable representing asset value
     */
    const [assetValue, setAssetValue] = useState();

    /**
     * @description Indicator whether delete prompt is active
     */
    const [deleteMode, setDeleteMode] = useState(false);

    /**
     * @description State variable indicating user-requested action is being conducted
     */
    const [loading, setLoading] = useState(false);

    /**
     * @description Recompute asset name and value state variables upon change of selected index 
     */
    useEffect(()=>{
        if (selectedIndex !== -1) {
            const asset = finances.assets[selectedIndex];
            setAssetName(asset.name);
            setAssetValue(asset.value.toString());
        };
    },[selectedIndex]);

    return (
        <>
            <DeleteAssetDialog 
                selectedIndex = {selectedIndex} 
                setSelectedIndex = {setSelectedIndex}
                deleteMode = {deleteMode} 
                setDeleteMode = {setDeleteMode}
            />
            <Dialog
                isVisible = {selectedIndex >= 0 && !deleteMode}
                onBackdropPress = {()=> setSelectedIndex(-1)}
                overlayStyle = {{
                    width: 330,
                    backgroundColor: 'rgb(226, 232, 240)'
                }}
            >
                <View className = 'flex-col space-y-3'>
                    <View className = 'space-y-1 flex-col'>
                        <Text className = 'text-2xl font-thin'>Asset Name</Text>
                        <TextInput 
                            className = 'text-black text-lg p-1 bg-white shadow-black shadow-2xl' 
                            style = {{shadowRadius: 6, shadowOffset: 2, textShadowColor: 'black', textShadowRadius: 0.5}}
                            value={assetName}
                            onChangeText={(text)=>setAssetName(text)}
                            blurOnSubmit
                            returnKeyType ='done'
                        />
                    </View>
                    <View>
                        <Text className = 'text-2xl font-thin'>Value</Text>
                        <Text className = 'absolute self-start bottom-1 left-2 text-xl z-10'>$</Text>
                        <TextInput
                            className = 'text-black text-lg px-1 pb-1.5 pl-8 bg-white shadow-black shadow-2xl'
                            style = {{shadowRadius: 6, shadowOffset: 2, textShadowColor: 'black', textShadowRadius: 0.5}}
                            value={assetValue}
                            onChangeText={(text)=>setAssetValue(text)}
                            blurOnSubmit
                            returnKeyType='done'
                            keyboardType='numeric'
                        />
                    </View>  
                    <View className = 'flex-row items-center justify-start space-x-1 mt-4 mb-2'>
                        <OperationButton
                            clickAction = {async ()=>{
                                setLoading(true);
                                await editAsset(dispatch, finances.assets[selectedIndex].id, assetName, assetValue);
                                setLoading(false);
                                setSelectedIndex(-1)
                            }}
                            textStyle = 'text-lg text-center'
                            style = 'w-32'
                            title = 'Confirm'
                        />
                        <TouchableOpacity 
                            className = 'px-4 py-1 border-[1px] border-black rounded-lg bg-red-700 w-32'
                            onPress={()=>{
                                setDeleteMode(true);
                            }}
                        >
                            <Text className = 'text-lg shadow-xl text-white text-center'>Delete</Text>
                        </TouchableOpacity>
                    </View>
                    {loading && (
                        <View className = 'absolute self-start -bottom-5 flex-row items-center'>
                            <Text>Processing</Text>
                            <ActivityIndicator color={'black'}/>
                        </View>
                    )}
                </View>
            </Dialog>
        </>
    );
};

export default AssetViewDialog;