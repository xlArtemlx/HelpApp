import React from "react";
import {View, Text} from 'react-native'

import {styles} from "./styles";
import moment from "moment";

const DayItem = ({day, padding, theme}) => {

    const date = moment(day)


    return(
        <View style={{...styles.dayItem, paddingHorizontal: padding}}>
            <Text style={{...styles.dayNumber, color: theme.text}}>{date.date()}</Text>
            <Text style={{...styles.dayName, color: theme.text}}>{date.format('ddd')}</Text>
        </View>
    )
}

export default DayItem
