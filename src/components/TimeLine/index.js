import {Text, View} from "react-native";
import React from "react";

import {styles} from './styles'

//Styles
const _textStyle = (marginBottom, index,time) => {

    return {
        ...styles.textStyle,
        marginTop: time === '00' ? 0 : time === '01'? marginBottom:marginBottom
    
       
    }
}

const TimeLine = ({timeLine, offset}) => {
   

    return(
        <View>{timeLine.map( (time, index) => <Text key={index} style={_textStyle(offset, index,time)}>{time}</Text> )}</View>
    )
}

export default TimeLine
