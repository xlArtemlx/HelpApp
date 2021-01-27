import {Text, View} from "react-native";
import React from "react";

import {styles} from './styles'

//Styles
const _textStyle = (marginBottom, index) => {
    return {
        ...styles.textStyle,
        marginTop: index === 0 ? 0 : marginBottom,
        marginBottom: marginBottom
    }
}

const TimeLine = ({timeLine, offset}) => {

    return(
        <View>{timeLine.map( (time, index) => <Text key={index} style={_textStyle(offset, index)}>{time}</Text> )}</View>
    )
}

export default TimeLine
