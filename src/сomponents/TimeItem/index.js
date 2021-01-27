import React from "react";
import {Text, TouchableOpacity, View} from "react-native";

import {styles} from './styles'
import {useNavigation} from "@react-navigation/native";
import moment from "moment";

const TimeItem = ({style, type, time, date, updateDreamTime, disabled}) => {

    const {navigate} = useNavigation()

    return (
        <View style={[style, styles.styledBorder]}>
            <TouchableOpacity disabled={disabled} onPress={() => {
                navigate('SetTime',
                    {
                        type: type === 'start' ? 'startTime' : 'endTime',
                        updateDreamTime
                    })
            }}>
                <Text style={[{fontSize: 30}, disabled && styles.disabledText]}>
                    {
                        time ? typeof time === "object" ? time.format('HH:mm') : time : 'Время'
                    }
                </Text>
            </TouchableOpacity>
            <TouchableOpacity disabled={disabled} onPress={() => {
                navigate('Calendar', {type: type === 'start' ? 'startDate' : 'endDate', updateDreamTime})
            }}>
                {date
                    ? <Text style={{...{fontSize: 20}, ...disabled && styles.disabledText}}>{date}</Text>
                    : <Text>{moment().local().format('DD MMMM')}</Text>
                }
            </TouchableOpacity>
        </View>
    )
}

export default TimeItem
