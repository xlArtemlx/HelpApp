import React from "react";
import {Text, TouchableOpacity, View, Image} from "react-native";

import {formatDistanceStrict} from 'date-fns'

import {enUS, ru} from 'date-fns/locale'

import {useDispatch, useSelector} from "react-redux";
import {Label} from "../index";
import {removeDreamTC,updateDreamTC} from "../../redux/reducers/mainReducer";
import {useActionSheet} from "@expo/react-native-action-sheet";
import {useNavigation} from "@react-navigation/native";
import {convertDateFromTime} from "../../utils/convertFromTime";

 import{_separateMinutes} from '../../utils/calcStatistics'
import {accent, main} from "../../core/colors";
import {styles} from "./styles";
import {timeWithWords} from "../../utils/minutesWithWords";
import {renderTime} from '../../utils/renderTime'

import moment from "moment";

const _timeView = (time) => {
    const times = time && time.split(":")
    return times ? `${times[0]}:${times[1]}` : ''
}

const _timeDistance = (startTimes , endTimes , languages) => {


  let endTime = endTimes && endTimes.indexOf('-') === -1? endTimes  : moment().local().format('HH:mm')
  let startTime = startTimes && startTimes.indexOf('-') === -1? startTimes  : moment().local().format('HH:mm') 
    if (startTime > endTime) {
        const start = startTime.split(':');
        const startHours = +start[0] - 12;
        startTime = startHours + ':' + start[1];


        const end = endTime.split(':');
        const endHours = +end[0] + 12;
        endTime = endHours + ':' + end[1];
    }

    const startDate = convertDateFromTime(startTime);
    const endDate = convertDateFromTime(endTime);


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

const _renderWakefulness = (dream,wakefulness, inMinutes, languages, theme={}) => {


    if (wakefulness !== undefined && inMinutes >= 0) {

        let totalMinutes =  Number(dream.startTime.split(':')[0]) * 60 + Number(dream.startTime.split(':')[1]) - inMinutes
        let tempHour = Math.floor(totalMinutes/ 60)
        let diffMinutes = totalMinutes - tempHour * 60
        let diffHours = 0 + tempHour

        let start = renderTime(_separateMinutes(diffMinutes,diffHours),languages)

      

        return <Text style={{...styles.wakefulnessText, color: theme.text}}>{languages.wakefulness_text} <Text style={styles.wakefulnessValue}>{
            typeof wakefulness 
                ? _timeDistance(start,dream.startTime,languages)
                : languages.less_minute
        }</Text></Text>
    }
}
const _renderWakefulnessAfter = (endTime='', startTime='', languages, theme={}) => {
// let startTime = startTimes ? startTimes : moment().local().format('HH:mm')

    if ( endTime !== undefined && startTime === '' ) {
        let now = moment().local().format('HH:mm')
        return <Text style={{...styles.wakefulnessText, color: theme.text}}>{languages.wakefulness_text} <Text style={styles.wakefulnessValue}>{
            typeof endTime === 'string' 
                ? _timeDistance(endTime,now,languages)
                : languages.less_minute
        }</Text></Text>
    } else { 
        return <Text style={{...styles.wakefulnessText, color: theme.text}}>{languages.wakefulness_text} <Text style={styles.wakefulnessValue}>{
            typeof endTime === 'string' 
                ? _timeDistance(startTime,endTime, languages)
                : languages.less_minute
        }</Text></Text>
    }
}


const _myRenderDown = (dream,index,dateDream,date,wakefulnessNight, dreamCount,inMinutes, languages,theme ,prevEndTime ,yestEndTime,prevDreamStarted,lastDreamStarted) => {
    

    const dateYesterday = moment(date).add(-1, 'days')
    const dateTomorrow = moment(date).add(1, 'days')

    
 
    if(moment(dateDream).format('DD MMM') === moment(dateTomorrow).format('DD MMM')){
        if(index === dreamCount-1){
           
            if(prevDreamStarted){
                return null
            } else {
                return  _renderWakefulnessAfter(dream.startTime,yestEndTime, languages, theme)         
            }
        }else {
            if(lastDreamStarted){
                return _renderWakefulnessAfter(dream.startTime, prevEndTime,languages, theme)
            }else {
                return _renderWakefulness(dream,dream.wakefulness && dream.wakefulness.value,inMinutes, languages, theme)
            }
        }
    } else if(moment(dateDream).format('DD MMM') === moment(dateYesterday).format('DD MMM')){
        if(index === 0 ) {
            return null
        } else  {
            if(prevDreamStarted){
                return null
            } else {
                return _renderWakefulness(dream,dream.wakefulness && dream.wakefulness.value,inMinutes, languages, theme)
            }
        }

    } else {
        if(index === dreamCount-1){
            if(!yestEndTime){
                return null
            } else {
                if(yestEndTime){
                    return _renderWakefulnessAfter(dream.startTime,yestEndTime, languages, theme)
                } else {
                    return null
                }
            }
        } else {
            if(dream.started){
                return _renderWakefulnessAfter(dream.startTime, prevEndTime,languages, theme)
            } else {
                return _renderWakefulness(dream,dream.wakefulness && dream.wakefulness.value,inMinutes, languages, theme)
            }

        }


    }

}
/////////////////////////////////////////////////////////////////////////////////////////
const _imageRender = timeOfDay => {

    const imgStyles = {...styles.timeIcon, tintColor: timeOfDay === 'day' ? accent : main}
    const imgSource = (timeOfDay === 'day') ? require('../../images/icons/ic_day.png') : require('../../images/icons/ic_night.png')

    return <Image source={imgSource} style={imgStyles}/>

}



const _onOpenActionSheet = ({dream, date, showActionSheetWithOptions, navigate, dispatch, languages,_handleButtonPress,dateDream,deletDream}) => {

  

    const options = dream.started && !dream.wakefulness ? [languages.edit, 'Завершить','Покормить', languages.delete] : [languages.edit, 'Покормить', languages.delete];

    
    if(dream.started && !dream.wakefulness){
        const cancelButtonIndex = 5
        showActionSheetWithOptions(
            {options, cancelButtonIndex},
            buttonIndex => {
                switch (buttonIndex) {
                    case 0:
                        navigate('NewDream', {date, dream})
                        break
                    case 1:{
                        _handleButtonPress()
                    }
                    case 2: {
                        dispatch(updateDreamTC(dateDream, {...dream, countFeeding: dream.countFeeding? dream.countFeeding+1 : 1}, dream.id));
                        break
                    }
                    case 3:{
                        deletDream(dateDream,dream.id,dream.startTime,dream.endTime)
                       
                    }
                        break
                }
            }
        );
    } else {
        const cancelButtonIndex = 4
        showActionSheetWithOptions(
            {options, cancelButtonIndex},
            buttonIndex => {
                switch (buttonIndex) {
                    case 0:
                        navigate('NewDream', {date, dream})
                        break
                    case 1: {
                        dispatch(updateDreamTC(dateDream, {...dream, countFeeding: dream.countFeeding? dream.countFeeding+1 : 1}, dream.id));
                        break
                    }
                    case 2:{
                         deletDream(dateDream,dream.id,dream.startTime,dream.endTime)
                        
                    }
                        break
                }
            }
        );

    }
};




const DreamItem = ({dreamCount,index,prevEndTime,dream,dateDream, date, languages, theme,wakefulnessNight,yestEndTime,_handleButtonPress,prevDreamStarted,lastDreamStarted,deletDream}) => {

    
    const {showActionSheetWithOptions} = useActionSheet();
    const dispatch = useDispatch()
    const lastDream = 0 === index

    const {navigate} = useNavigation();
    const dateTomorrow = moment(date).add(1, 'days')

    const disableFeeding = useSelector( ({directory}) => directory.disableFeeding);
    const disableTags = useSelector( ({directory}) => directory.disableTags);
    const inMinutes = dream.wakefulness ? dream.wakefulness.inMinutes : 0
    const currentTime = moment().local().format('L') === moment(dream.dateOfDream).format('L')
   
  
    
    

    return (
        <View>
            { 
               moment(dateDream).format('DD MMM') === moment(dateTomorrow).format('DD MMM') || wakefulnessNight ? null : !dream.started && lastDream && currentTime  ? _renderWakefulnessAfter(dream.endTime, '',languages, theme) : null
            }
            <TouchableOpacity onPress={() => _onOpenActionSheet({
                dream,
                showActionSheetWithOptions,
                dispatch,
                navigate,
                date,
                languages,
                _handleButtonPress,
                dateDream,deletDream
            })} style={{...styles.dream, backgroundColor: theme.navigator}}>
                <View style={styles.timeBlock}>
                    <Text style={{fontWeight: 'bold', color: theme.text}}>{dream.endTime ? _timeView(dream.endTime) : '-- --'}</Text>
                    {_imageRender(dream.timeOfDay)}
                    <Text style={{fontWeight: 'bold', color: theme.text}}>{_timeView(dream.startTime)}</Text>
                </View>
                <View>
                    <View style={styles.distanceBlock}>
                        <Text style={{...styles.distanceText, color: theme.text}}>
                            {
                                dream.endTime && dream.startTime ?
                                    dream.startTime > dream.endTime && dream.timeOfDay === 'day'?
                                        _timeDistance(dream.endTime, dream.startTime, languages) : _timeDistance(dream.startTime, dream.endTime, languages) : dream.startTime > moment().local().format('LT') ?
                                    _timeDistance(moment().local().format('LT'), dream.startTime, languages) : _timeDistance(dream.startTime, moment().local().format('LT'), languages)
                            }
                        </Text>
                    </View>
                    <View style={styles.placeBlock}>
                        {dream.place ? <Label style={{padding: 4}} focused place={dream.place || ''}/> : null}
                        {!disableFeeding ? dream.countFeeding ? <Label style={{padding: 4}} focused place={dream.countFeeding || ''} feed languages = {languages}/> : null : null}
                        {!disableTags ? dream.tags ? dream.tags.map(tag => <Label style={{padding: 4}} tag place={tag.value || ''}/>) : null : null}

                    </View>
                    <View style={styles.commentBlock}>
                        <Text style={styles.commentBlockText}>{dream.comment}</Text>
                    </View>
                </View>
            </TouchableOpacity>
                  
                        {_myRenderDown(dream,index,dateDream,date,wakefulnessNight, dreamCount,inMinutes, languages,theme ,prevEndTime ,yestEndTime,prevDreamStarted,lastDreamStarted)}
                       
        </View>
    )
}

export default DreamItem
