import React from "react";
import {Text, TouchableOpacity, View, Image} from "react-native";

import {formatDistanceStrict} from 'date-fns'

import {enUS, ru} from 'date-fns/locale'

import {useDispatch} from "react-redux";
import {Label} from "../index";
import {removeDreamTC} from "../../redux/reducers/mainReducer";
import {useActionSheet} from "@expo/react-native-action-sheet";
import {useNavigation} from "@react-navigation/native";
import {convertDateFromTime} from "../../utils/convertFromTime";

import {accent, main} from "../../core/colors";
import {styles} from "./styles";
import {timeWithWords} from "../../utils/minutesWithWords";

const _timeView = (time) => {
    const times = time && time.split(":")
    return times ? `${times[0]}:${times[1]}` : ''
}

const _timeDistance = (startTime = '', endTime = '', languages) => {

    const startDate = convertDateFromTime(startTime)
    const endDate = convertDateFromTime(endTime)

    const distanceHour = formatDistanceStrict(startDate, endDate, {
        locale: languages.fns_locale === 'ru' ? ru : enUS,
        unit: 'hour',
        roundingMethod: "floor"
    })
    const distanceMinute = formatDistanceStrict(startDate, endDate, {
        locale: languages.fns_locale === 'ru' ? ru : enUS,
        unit: 'minute'
    })

    const minutes = parseInt(distanceMinute) - (parseInt(distanceHour) * 60)
    const hours = parseInt(distanceHour)

    return distanceMinute.startsWith('0')
        ? languages.less_minute
        : `${distanceHour.startsWith('0') ? '' : timeWithWords(languages, hours, 'hours')} ${timeWithWords(languages, minutes, 'minutes')} `
}

const _renderWakefulness = (wakefulness, languages) => {
    if (wakefulness !== undefined) {
        return <Text style={styles.wakefulnessText}>{languages.wakefulness_text} <Text style={styles.wakefulnessValue}>{
            typeof wakefulness === 'string' && !wakefulness.includes('0')
                ? wakefulness
                : languages.less_minute
        }</Text></Text>
    }
}

const _imageRender = timeOfDay => {

    const imgStyles = {...styles.timeIcon, tintColor: timeOfDay === 'day' ? accent : main}
    const imgSource = (timeOfDay === 'day') ? require('../../images/icons/ic_day.png') : require('../../images/icons/ic_night.png')

    return <Image source={imgSource} style={imgStyles}/>

}

const _onOpenActionSheet = ({dream, date, showActionSheetWithOptions, navigate, dispatch, languages}) => {

    const options = [languages.edit, languages.delete, languages.cancel];
    const cancelButtonIndex = 2;
    showActionSheetWithOptions(
        {options, cancelButtonIndex},
        buttonIndex => {
            switch (buttonIndex) {
                case 0:
                    navigate('NewDream', {date, dream})
                    break
                case 1: {
                    dispatch(removeDreamTC(date, dream.id))
                }
                    break
            }
        }
    );
};


const DreamItem = ({dream, date, languages}) => {
    const {showActionSheetWithOptions} = useActionSheet();
    const dispatch = useDispatch()

    const {navigate} = useNavigation()

    return (
        <View>
            {_renderWakefulness(dream.wakefulness, languages)}
            <TouchableOpacity onPress={() => _onOpenActionSheet({
                dream,
                showActionSheetWithOptions,
                dispatch,
                navigate,
                date,
                languages
            })} style={styles.dream}>
                <View style={styles.timeBlock}>
                    <Text style={{fontWeight: 'bold'}}>{dream.endTime ? _timeView(dream.endTime) : '-- --'}</Text>
                    {_imageRender(dream.timeOfDay)}
                    <Text style={{fontWeight: 'bold'}}>{_timeView(dream.startTime)}</Text>
                </View>
                <View>
                    <View style={styles.distanceBlock}>
                        <Text style={styles.distanceText}>
                            {
                                dream.endTime && dream.startTime ? _timeDistance(dream.startTime, dream.endTime, languages) : languages.less_minute
                            }
                        </Text>
                    </View>
                    <View style={styles.placeBlock}>
                        <Label style={{padding: 3}} focused place={dream.place || ''}/>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default DreamItem
