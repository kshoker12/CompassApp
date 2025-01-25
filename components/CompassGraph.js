import { Dialog } from "react-native-elements"
import { View, Text, SafeAreaView, Image, TouchableOpacity, scrollView, ScrollView, TextInput} from 'react-native'
import React, {useContext, useState} from 'react'
import { VictoryAxis, VictoryChart, VictoryContainer, VictoryLabel, VictoryLine, VictoryPie, VictoryTheme, VictoryVoronoiContainer } from "victory-native"
import { AppContext } from "../context/AppContext"

export default function CompassGraph({showDialog2, setShowDialog2}) {
    const {compass} = useContext(AppContext);
    const [mode, setMode] = useState("AT");
    const modes = ["AT", "1Y", "6M", "3M", "1M"];
    let data = [];
    let index = 1;
    let yearlyCompass = null;
    let yearId = null;
    let monthId = null;
    let monthIndex = null;
    let categories = [];

    function obtainMonth(id) {
        switch(id) {
            case 0:
                return "Jan"
            case 1:
                return "Feb"
            case 2:
                return "Mar"
            case 3:
                return "Apr"
            case 4: 
                return "May"
            case 5:
                return "June"
            case 6: 
                return "July"
            case 7:
                return "Aug"
            case 8:
                return "Sept"
            case 9:
                return "Oct"
            case 10:
                return "Nov"
            case 11:
                return "Dec"
        }
    }

    compass.yearlyCompass.map((yearlyCompass)=>{
        yearlyCompass.monthlyCompass.map((monthlyCompass)=>{
            monthlyCompass.weeklyCompass.map((weeklyCompass)=>{
                if (weeklyCompass.percentage >= 0) {
                    data.push({x: index, y: weeklyCompass.percentage})
                    index += 1;    
                }
            })
        })
    })
    switch(mode) {
        case "AT":
            break;
        case "1Y":
            if (data.length >= 48) {
                data = data.slice(-48)
            } 
            break;
        case "6M":
            if (data.length >= 24) {
                data = data.slice(-24)
            }
            break;
        case "3M":
            if (data.length >= 12) {
                data = data.slice(-12);
            }
            break;
        case "1M":
            if (data.length >= 4) {
                data = data.slice(-4)
            }
            break;
        default:
            break;
    }
    
    return (
        <Dialog
            isVisible={showDialog2}
            onBackdropPress={()=>{setShowDialog2(false)}}
            overlayStyle = {{backgroundColor: "rgb(165,243,252)", borderRadius: 15, borderWidth: 2, borderColor: "rgb(253, 224, 71)", width: "98%"}}
        >
          <View className = "p-4 items-center ">
            <Text className = "text-xl items-start w-full font-bold ">Compass Percentage</Text>
            <VictoryChart
                theme={VictoryTheme.grayscale}
                animate={{
                    duration: 1000,
                    onLoad: { duration: 500 }
                }}
                domain={{y: [0, 100]}}
                containerComponent={
                    <VictoryVoronoiContainer  labels={({ datum }) => `${Math.round(datum.x, 2)}, ${Math.round(datum.y, 2)}`}/>
                }
            >
                <VictoryLine
                style={{
                    data: { stroke: "#c43a31", color: "yellow"},
                    parent: { border: "1px solid #ccc"},
                    labels: {color: "yellow"}
                }}
                data={data}
                />
                <VictoryAxis tickFormat={()=>{""}}/>
                <VictoryAxis dependentAxis tickCount={10}/>
          </VictoryChart>
            <View className = "flex-row justify-between items-center w-full">
                {modes.map((modeText)=>{
                    return (
                        <TouchableOpacity className = {"w-1/6 px-2 py-1 items-center " + (mode === modeText ? "border-2 border-[#fde047] rounded-xl bg-[#1e293b]": "")} onPress={()=>{setMode(modeText)}}>
                            <Text className = {mode === modeText ? "text-yellow-300": "text-black"}>{modeText}</Text>
                        </TouchableOpacity>
                    )
                })}
            </View>
          </View>
        </Dialog>
      )
}