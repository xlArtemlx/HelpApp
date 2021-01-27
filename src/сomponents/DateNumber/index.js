import React, {useState} from "react";
import {Text, TouchableOpacity, View, Image} from "react-native";
import {useNavigation} from '@react-navigation/native'

import moment from "moment";
import {useSelector} from "react-redux";

import {styles} from './style'

const _isToday = date => moment().local().isSame(date)

const DateNumber = ({date, setDate}) => {

    const {navigate} = useNavigation();
    const activeLanguage = useSelector( ({app}) => app.activeLanguage)

    let [disabled, setDisabled] = useState(false)

    const _changeDate = type => {

        if(type === 'next') {
            _isToday(date) && setDisabled(true)
            setDate(moment(date.add(1, 'days')))
        }else{
            setDisabled(false)
            setDate(moment(date.subtract(1, 'days')))
        }

    }


    return (
        <View style={styles.date}>
            <TouchableOpacity onPress={() => _changeDate('prev')}>
                <Image style={styles.arrowIcon} source={require('../../images/icons/ic_arrow_left.png')}/>
            </TouchableOpacity>

            <View style={styles.textDate}>
                <Text style={styles.textDay}>{date.locale(activeLanguage).format('DD MMM')}</Text>
                <Text>{date.locale(activeLanguage).format('dddd')}</Text>
            </View>

            <View style={styles.buttonsRight}>
                <TouchableOpacity onPress={() => navigate('Calendar', {setDate})}>
                    <Image style={styles.iconCalendar}  source={require('../../images/icons/ic_calendar.png')}/>
                </TouchableOpacity>
                <TouchableOpacity disabled={disabled} onPress={() => _changeDate('next')}>
                    <Image style={styles.arrowIcon} source={require('../../images/icons/ic_arrow_right.png')}/>
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default DateNumber

