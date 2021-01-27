import React, {useState} from "react";
import {View, TouchableOpacity, Text,  Dimensions} from "react-native";

import {timeDifference,_separateMinutes,calcTotalSleep} from "../../utils/calcStatistics";
import {renderTime} from '../../utils/renderTime'
import Modal from 'react-native-modal';
import {Label} from "../index";
import moment from 'moment';
import {convertDateFromTime} from "../../utils/convertFromTime";
import {formatDistanceStrict} from 'date-fns'
import {enUS, ru} from 'date-fns/locale'
import {timeWithWords} from "../../utils/minutesWithWords";


import {styles} from "./styles";


const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height


const _timeDistance = (startTime = '', endTime = '', languages) => {
    if(!endTime){endTime = moment().local().format('HH:mm')}

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

const _dreamStyle = ({startPoint, height, offset, timeOfDay}) => {
    return {
        ...styles.dreamDiagram,
        top: startPoint * offset,
        height: height ? height : 1,
        backgroundColor: timeOfDay === 'day' ? "#FF8500" : "#33006D"
    }
}
const _dreamStyleWakefulness = ({startPoint, height, offset, timeOfDay}) => {
    if(height >0){
        return {
            ...styles.dreamDiagram,
            top: startPoint * offset,
            height: height ? height : 1,
            backgroundColor: '#FFF'
        }
    }
}
const _toPositive = number => Math.sign(number) === -1 ? number * -1 : number



const _getDataForRender = (dream, offset, day,languages,index,dreamCount) => {

    let start = dream.startTime;
    let end = dream.endTime;



    if (dream.endDate === moment(day).local().format("DD MMM") && dream.startTime > dream.endTime) {
        start = '-01:00';
    }
    if(dream.started && !dream.endTime){
        end = moment().local().format('HH:mm')
    }
    
   
    const startPoint = Number(start.split(':')[0]) + Number(start.split(':')[1] / 60)
    const endPoint = Number(end.split(':')[0]) + Number(end.split(':')[1] / 60)
    let diff =  timeDifference(start, end) * offset;

   

    if (diff < 0) {
        diff = -1 * diff
    }

    const height = diff > 60 ? diff / 60 : diff
  
    return {
        startPoint: startPoint,
        endPoint:endPoint,
        height,
        totalSleep: renderTime( calcTotalSleep([dream]))
    }
}

const _getDataForRenderWakefuless = (dream, offset, day,languages,index,dreamCount,prevEndTime) => {


    let startPoint = 0
    let endPoint = 0
    let height = 0
    const count = dreamCount -1
    let currentHour = new Date().getHours();
 
 
    let start = dream.startTime;
    let end = '00:00' ;
    if(index === count && dream.started === false && dream.timeOfDay === 'night'){
        end === '00:00'
    }else if( dream.wakefulness){
        let totalMinutes = Number(start.split(':')[0]) * 60 + Number(start.split(':')[1]) - _toPositive(dream.wakefulness.inMinutes) 
        let tempHour = Math.floor(_toPositive(totalMinutes)/ 60)
        let diffMinutes = _toPositive(totalMinutes) - tempHour * 60
        let diffHours = 0 + tempHour
    end = renderTime(_separateMinutes(diffMinutes,diffHours),languages)
    } else if(dream.started && index === count &&currentHour < 6) {
        end = '00:00'
    } else if(dream.started && prevEndTime){
        end = prevEndTime
    }
    

    
    startPoint = Number(end.split(':')[0]) + (end.split(':')[1] / 60)
    endPoint = Number(start.split(':')[0]) + Number(start.split(':')[1]/60)
    let diff = timeDifference(end, start) * offset;
  


    if (diff < 0) {
        diff = -1 * diff
    }

    height = diff > 60 ? diff / 60 : diff


    return {
        startPoint: startPoint,
        endPoint: endPoint,
        height,
        wakefulness: {
            startTime: end,
            endTime:dream.startTime,

        }
    }
}
const _getDataForRenderWakefulessNow = (dream, offset,index,dreamCount) => {


    let startPoint = 0
    let endPoint = 0
    let height = 0

    let start = dream.endTime;
    let end = '00:00' ;
    const toDay = dream.endDate === moment().local().format("DD MMM")
  
 
 
  

    if(toDay&& dream.wakefulness && index === 0 && dream.started === false){
        end = moment().local().format('HH:mm')
        startPoint = Number(start.split(':')[0]) + (start.split(':')[1] / 60)
        endPoint = Number(end.split(':')[0]) + Number(end.split(':')[1]/60)
        let diff = timeDifference(start, end) * offset;
        if (diff < 0) {
            diff = -1 * diff
        }
        height = diff > 60 ? diff / 60 : diff
    }
    

    
  

    
    return {
        startPoint: startPoint,
        endPoint: endPoint,
        height,
        wakefulness: {
            startTime: dream.endTime,
            endTime: end,

        }
    }
}

const _renderDay = (dreams, offset,languages, day,visible, setVisible,setActivDream) => {
  
    
    return dreams.map((dream, index) => {
        const {startPoint, height} = _getDataForRender(dream, offset, day,languages,index,dreams.length);

        const handleToggle = () => {
            setVisible(!visible)
            setActivDream(dream)

        }
        return (

            <View key={index}>
                <TouchableOpacity
                    style={_dreamStyle({startPoint, height, offset, timeOfDay: dream.timeOfDay})}
                    onPress={() => handleToggle()}
                >
                </TouchableOpacity>
            </View>
        )
    })


    // return renderDreams
}
const _renderDayWakefulness = (dreams, offset,languages, day,visibleWakefulness, setVisibleWakefulness,setActivWakefulness,setActivDream) => {
  let prevEndTime ;
  dreams.forEach( (el,index) => index === 1 ? prevEndTime = el.endTime:0)

    
    
    return dreams.map((dream, index) => {
        const dreamCount = dreams.length
     
      
        const {startPoint, height, wakefulness} = _getDataForRenderWakefuless(dream, offset, day,languages,index,dreamCount,prevEndTime);
       

        const handleToggle = () => {
            setVisibleWakefulness(!visibleWakefulness)
            setActivWakefulness(wakefulness)
            setActivDream(dream)

        }
        return (

            <View key={index}>
                <TouchableOpacity
                    style={_dreamStyleWakefulness({startPoint, height, offset, timeOfDay: dream.timeOfDay})}
                    onPress={() => handleToggle()}
                >
                </TouchableOpacity>
            </View>
        )
    })



}

const _renderDayWakefulnessNow = (dreams, offset,languages, day,visibleWakefulness, setVisibleWakefulness,setActivWakefulness,setActivDream) => {
  
    
    return dreams.map((dream, index) => {
        const {startPoint, height, wakefulness} = _getDataForRenderWakefulessNow(dream, offset,index);

        const handleToggle = () => {
            setVisibleWakefulness(!visibleWakefulness)
            setActivWakefulness(wakefulness)
            setActivDream(dream)

        }
        

        return (

            <View key={index}>
                <TouchableOpacity
                    style={_dreamStyleWakefulness({startPoint, height, offset, timeOfDay: dream.timeOfDay})}
                    onPress={() => handleToggle()}
                >
                </TouchableOpacity>
            </View>
        )
    })


    // return renderDreams
}

const CoordinateColumn = ({dreams, offset, languages, day}) => {
    const [visible, setVisible] = useState(false);
    const [visibleWakefulness, setVisibleWakefulness] = useState(false);
    const [activDream,setActivDream] = useState([])
    const [activWakefulness,setActivWakefulness] = useState([])






    

    return (
        <View style={styles.column}>
            {_renderDayWakefulness(dreams, offset, languages, day, visibleWakefulness, setVisibleWakefulness,setActivWakefulness,setActivDream)}
            {_renderDay(dreams, offset, languages, day, visible, setVisible,setActivDream)}
            {_renderDayWakefulnessNow(dreams, offset,languages, day,visibleWakefulness, setVisibleWakefulness,setActivWakefulness,setActivDream)}
            
            {visible && activDream ? <Modal
                isVisible={visible}
                onBackdropPress={() => setVisible(false)}
                hideModalContentWhileAnimating
                backdropOpacity={0.40}
                style={styles.modalContainer}
            >
                <View style={{
                    ...styles.modalContent,
                    width: deviceWidth,
                    height: deviceHeight / 6
                }}>
                    <Text style={styles.modalDate}>{activDream.startDate}</Text>
                    <Text style={styles.modalSleepTime}>{activDream.timeOfDay === 'day' ? `${languages.day_sleep}: ` : `${languages.night_sleep}: `}{activDream.startTime} - {activDream.endTime} ({_timeDistance(activDream.startTime,activDream.endTime,languages)})</Text>
                    <Text></Text> 
                    <View style={styles.placeContainer}><Label style={{padding: 10}} focused place={activDream.place} /></View>
                </View>
            </Modal> : null}
            {visibleWakefulness && activWakefulness ? <Modal
                isVisible={visibleWakefulness}
                onBackdropPress={() => setVisibleWakefulness(false)}
                hideModalContentWhileAnimating
                backdropOpacity={0.40}
                style={styles.modalContainer}
            > 
                <View style={{
                    ...styles.modalContent,
                    width: deviceWidth,
                    height: deviceHeight / 6
                }}>
                    <Text style={styles.modalDate}>{activDream.startDate}</Text>
                    <Text style={styles.modalSleepTime}>{ `${languages.wakefulness_text} `}{activWakefulness.startTime} - {activWakefulness.endTime} ({_timeDistance(activWakefulness.startTime,activWakefulness.endTime,languages)})</Text>
                </View>
            </Modal> : null}
        </View>
    )
}

export default CoordinateColumn
