import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { SpeedDial } from 'react-native-elements';

/**
 * @description Primary speed dial component
 * @param {Array<Object>} speedDialActions Speed Dial actions
 * @returns {JSX.Element}
 */
const PrimarySpeedDial = ({speedDialActions}) => {
    /** State variable to indicate if speed dial is open */
    const [speedDialOpen, setSpeedDialOpen] = useState(false);

    /** Render speed dial along with speed dial actions */
    return (
        <SpeedDial
            isOpen = {speedDialOpen}
            icon = {{name: 'ellipsis-v', color: '#fff', type: 'font-awesome'}}
            openIcon = {{name: 'close', color: '#fff'}}
            onOpen={()=>setSpeedDialOpen(!speedDialOpen)}
            onClose={()=>setSpeedDialOpen(!speedDialOpen)}
            
            color='#2c2e45'
            buttonStyle = {{borderColor: '#a855f7', borderWidth: 1, borderRadius: 50, width: 45, height: 45}}
            style = {{bottom: -5, right: -5, zIndex: 100}}
        >
            {speedDialActions.map(({icon, action, type = 'material'})=>(
                <SpeedDial.Action
                    icon = {{name: icon, color: 'white', type: type}}
                    onPress={()=>{
                        action(); 
                        setSpeedDialOpen(false);
                    }}
                    color='#2c2e45'
                    buttonStyle = {{borderColor: '#a855f7', borderWidth: 1, borderRadius: 50, width: 38, height: 38}}
                    style = {{left: 5}}
                />
            ))}
        </SpeedDial>   
    );
};

export default PrimarySpeedDial;