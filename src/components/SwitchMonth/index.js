import React from "react";
import {TouchableOpacity, View, Text} from "react-native";
import {AntDesign} from "@expo/vector-icons";


import {styles} from './styles'
import moment from "moment";

const SwitchMonth = ({prevActiveDate, nextActiveDate, setWeeksTC, weeks, theme}) => {

    const _startDay = moment(weeks[0]).format('DD')
    const _endDay = moment(weeks[weeks.length - 1]).format('DD')
  

    const handlePress = type => {
        setWeeksTC(type === 'prev' ? prevActiveDate : nextActiveDate, type)
    }

    return (
        <View style={{...styles.switchMonth, backgroundColor: theme.background}}>
            <TouchableOpacity onPress={() => handlePress('prev')}>
                {<AntDesign name="arrowleft" size={24} color='#1768AF'/>}
            </TouchableOpacity>

            <View style={{alignItems: 'center'}}>
                <Text style={{...styles.month, color: theme.text}}>{prevActiveDate.format('MMMM')}</Text>
                <Text style={{...styles.weekdays, color: theme.text}}>{_startDay} - {_endDay}</Text>
            </View>

            <TouchableOpacity onPress={() => handlePress('next')}>
                {<AntDesign name="arrowright" size={24} color='#1768AF'/>}
            </TouchableOpacity>
        </View>
    )
}

export default SwitchMonth
