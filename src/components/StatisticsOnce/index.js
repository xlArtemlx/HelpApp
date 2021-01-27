import React,{useState,useMemo} from "react";

import {View} from 'react-native'
import {calcTotalSleep, calcAverage, getDreamByType, calcWakefulness,calcWakefulnessAverageDream} from "../../utils/calcStatistics";
import {renderTime} from "../../utils/renderTime";
import StatisticsOnceItem from '../StatiscticsOnceItem'


import { differenceInDays } from 'date-fns'

import {styles} from './styles'
import { FileSystemUploadType } from "expo-file-system";








// Calc
const calcDifference = (dreams, dreamsYest, dreamTomorrow, languages, type) =>  useMemo(()=> {
    let valueYest;
    let valueDiffYest;
    let valueTomorrow;
    let valueDiffTomorrow;

    if(type === 'average'){
        valueYest = calcAverage(calcTotalSleep(dreamsYest), dreamsYest.length)
    } else if( type ==='length') {
        valueYest = dreamsYest.length
    } else {
        valueYest = calcTotalSleep(dreamsYest)
    };

    if(type === 'average') {
        const {totalMinutes: totalMinutesYest} = calcAverage(calcTotalSleep(dreamsYest), dreamsYest.length)
        const {totalMinutes} = calcAverage(calcTotalSleep(dreams), dreams.length)
        valueDiffYest = totalMinutes - totalMinutesYest
    
    }  else if( type ==='length') {
        valueDiffYest =  dreams.length - dreamsYest.length
    } else {
        const {totalMinutes: totalMinutesYest} = calcTotalSleep(dreamsYest)
        const {totalMinutes} = calcTotalSleep(dreams)
        valueDiffYest = totalMinutes - totalMinutesYest
    }

    if(type === 'average'){
        valueTomorrow = calcAverage(calcTotalSleep(dreamTomorrow), dreamTomorrow.length)
    } else if( type ==='length') {
        valueTomorrow = dreamTomorrow.length
    } else {
        valueTomorrow = calcTotalSleep(dreamTomorrow)
    };

    if(type === 'average') {
        const {totalMinutes: totalMinutesTomorrow} = calcAverage(calcTotalSleep(dreamTomorrow), dreamTomorrow.length)
        const {totalMinutes} = calcAverage(calcTotalSleep(dreams), dreams.length)
        valueDiffTomorrow = totalMinutes - totalMinutesTomorrow
    
    }  else if( type ==='length') {
        valueDiffTomorrow =  dreams.length - dreamTomorrow.length
    } else {
        const {totalMinutes: totalMinutesTomorrow} = calcTotalSleep(dreamTomorrow)
        const {totalMinutes} = calcTotalSleep(dreams)
   
        valueDiffTomorrow = totalMinutes - totalMinutesTomorrow
    }



    return {
        valueYest: valueYest,
        valueDiffYest: valueDiffYest,
        valueTomorrow: valueTomorrow,
        valueDiffTomorrow: valueDiffTomorrow,
    }


})
const calcDifferenceWakefulness =  (dreams, dreamsYest,dreamTomorrow, languages, type) =>  useMemo(()=> {
    let valueYest;
    let valueDiffYest;
    let valueTomorrow;
    let valueDiffTomorrow;
   

    if(type === 'average'){
        valueYest = calcAverage(calcWakefulnessAverageDream(dreamsYest), dreamsYest.length)
    } else if( type ==='length') {
        valueYest = dreamsYest.length
    } else {
        valueYest = calcWakefulnessAverageDream(dreamsYest)
    };
    if(type === 'average') {
        const {totalMinutes: totalMinutesYest} = calcAverage(calcWakefulnessAverageDream(dreamsYest), dreamsYest.length)
        const {totalMinutes} = calcAverage(calcWakefulnessAverageDream(dreams), dreams.length)
        valueDiffYest = totalMinutes - totalMinutesYest
    }  else if( type ==='length') {
        valueDiffYest =  dreams.length - dreamsYest.length
    } else {
        const {totalMinutes: totalMinutesYest} = calcWakefulnessAverageDream(dreamsYest)
        const {totalMinutes} = calcWakefulnessAverageDream(dreams)
        valueDiffYest = totalMinutes - totalMinutesYest
    };
    if(type === 'average'){
        valueTomorrow = calcAverage(calcWakefulnessAverageDream(dreamTomorrow), dreamTomorrow.length)
    } else if( type ==='length') {
        valueTomorrow = dreamTomorrow.length
    } else {
        valueTomorrow = calcWakefulnessAverageDream(dreamTomorrow)
    };
    if(type === 'average') {
        const {totalMinutes: totalMinutesTomorrow} = calcAverage(calcWakefulnessAverageDream(dreamTomorrow), dreamTomorrow.length)
        const {totalMinutes} = calcAverage(calcWakefulnessAverageDream(dreams), dreams.length)
        valueDiffTomorrow = totalMinutes - totalMinutesTomorrow,languages
    
    }  else if( type ==='length') {
        valueDiffTomorrow =  dreams.length - dreamTomorrow.length
    } else {
        const {totalMinutes: totalMinutesTomorrow} = calcWakefulnessAverageDream(dreamTomorrow)
        const {totalMinutes} = calcWakefulnessAverageDream(dreams)
        valueDiffTomorrow = totalMinutes - totalMinutesTomorrow,languages
    };



    return {
        valueYest: valueYest,
        valueDiffYest: valueDiffYest,
        valueTomorrow: valueTomorrow,
        valueDiffTomorrow: valueDiffTomorrow,
    }

})

//render
// const _renderStatistics =  (fields,  statisticsView, theme, amountOfDays, indicator,view,indicatorAbove, languages,date) => {
 
//     return fields.map( (field, index) => <StatisticsOnceItem key={field.id} date={date} field={field} index={index} statisticsView={statisticsView} theme={theme} amountOfDays={amountOfDays}  indicator={ indicator} view={view} indicatorAbove={indicatorAbove}  languages={ languages}/>)
// }


export const _statisticsSection = (dreams, languages,dreamsYest,dreamTomorrow,totalMinutesWakefulness) => {
    const dreamDay = getDreamByType('day', dreams)
    const dreamNight = getDreamByType('night', dreams) 
    const dreamDayYest = getDreamByType('day', dreamsYest)
    const dreamNightYest = getDreamByType('night', dreamsYest) 
    const dreamDayTomorrow = getDreamByType('day', dreamTomorrow)
    const dreamNightTomorrow = getDreamByType('night', dreamTomorrow)


  
    return [
        {
            id: 'total_sleep_oneday',
            title: `${languages.total_sleep}`,
            value: renderTime(calcTotalSleep(dreams), languages),
            valueYest: calcDifference(dreams,dreamsYest,dreamTomorrow,languages)
        },
        {
            id: 'average_sleep_oneday',
            title: `${languages.average_sleep}`,
            value: renderTime(calcAverage(calcTotalSleep(dreams), dreams.length), languages),
            valueYest: calcDifference(dreams,dreamsYest,dreamTomorrow,languages, 'average')
        },
        {
            id: 'total_day_sleep_oneday',
            title: `${languages.day_sleep}`,
            value: dreamDay.length > 0 ? renderTime(calcTotalSleep(dreamDay), languages) : 0,
            valueYest:  calcDifference(dreamDay,dreamDayYest,dreamDayTomorrow,languages)
        },
        {
            id: 'average_day_sleep_oneday',
            title: `${languages.average_day_sleep}`,
            value: dreamDay.length > 0 ? renderTime(calcAverage(calcTotalSleep(dreamDay), dreamDay.length), languages) : 0,
            valueYest: calcDifference(dreamDay,dreamDayYest,dreamDayTomorrow,languages, 'average'),
        },
        {
            id: 'total_night_sleep_oneday',
            title: `${languages.night_sleep}`,
            value: dreamNight.length > 0 ? renderTime(calcTotalSleep(dreamNight), languages) : 0,
            valueYest:  calcDifference(dreamNight,dreamNightYest,dreamNightTomorrow,languages)
        },
        {
            id: 'average_night_sleep_oneday',
            title: `${languages.average_night_sleep}`,
            value: dreamNight.length > 0 ? renderTime(calcAverage(calcTotalSleep(dreamNight), dreamNight.length), languages) : 0,
            valueYest: calcDifference(dreamNight,dreamNightYest,dreamNightTomorrow,languages, 'average'),
        },
        {
            id: 'day_sleep_count_oneday',
            title: `${languages.day_sleep_count} `,
            value: dreamDay.length,
            valueYest: calcDifference(dreamDay,dreamDayYest,dreamDayTomorrow,languages,'length')
        },
        {
            id: 'night_sleep_count_oneday',
            title: `${languages.night_sleep_count} `,
            value: dreamNight.length,
            valueYest: calcDifference(dreamNight,dreamNightYest,dreamNightTomorrow,languages,'length')
        },
        {
            id: 'total_wakefulness_oneday',
            title: `${languages.total_wakefulness}: `,
            value: renderTime(calcWakefulness(dreams,totalMinutesWakefulness), languages),
            valueYest: calcDifferenceWakefulness(dreams,dreamsYest,dreamTomorrow,languages)
        },
        {
            id: 'total_wakefulness_day_oneday',
            title: `${languages.total_wakefulness_night}`,
            value: dreamDay.length ? renderTime(calcWakefulness(dreamDay)) : 0,
            valueYest: calcDifferenceWakefulness(dreamDay,dreamDayYest,dreamDayTomorrow,languages)
        },
        {
            id: 'total_wakefulness_average_day_oneday',
            title: `${languages.total_wakefulness_day_average}`,
            value: dreamDay.length ? renderTime(calcAverage(calcWakefulness(dreamDay),dreamDay.length)) : 0,
            valueYest: calcDifferenceWakefulness(dreamDay,dreamDayYest,dreamDayTomorrow,languages, 'average'),

        },
        {
            id: 'total_wakefulness_night_oneday',
            title: `${languages.total_wakefulness_night}`,
            value: dreamNight.length ? renderTime(calcWakefulness(dreamNight)) : 0,
            valueYest:  calcDifferenceWakefulness(dreamNight,dreamNightYest,dreamNightTomorrow,languages)
        },
        {
            id: 'total_wakefulness_average_night_oneday',
            title: `${languages.total_wakefulness_night_average}`,
            value: dreamNight.length ? renderTime(calcAverage(calcWakefulness(dreamNight),dreamNight.length)) : 0,
            valueYest: calcDifferenceWakefulness(dreamNight,dreamNightYest,dreamNightTomorrow,languages, 'average'),

        },
    ]
}



const StatisticsOnce = ({dreams, totalMinutesWakefulness, languages, statisticsView, theme, birthday, indicator, view,dreamsYest,dreamTomorrow,indicatorAbove,date}) => {


    const amountOfDays = differenceInDays(new Date(), new Date(birthday));
    const styl = view ? styles.statisticsOnceSecond : styles.statisticsOnceFirst

    const _renderStatistics =   (fields,  statisticsView, theme, amountOfDays, indicator,view,indicatorAbove, languages,date) => {
        
 
        return fields.map( (field, index) => {
            if(field.value !==0){
                return <StatisticsOnceItem 
                key={field.id} 
                date={date} 
                field={field} 
                index={index} 
                statisticsView={statisticsView} 
                theme={theme} 
                amountOfDays={amountOfDays}  
                indicator={ indicator} 
                view={view} 
                indicatorAbove={indicatorAbove}  
                languages={ languages}/>
            }
        })

     
    }

    return (
        
            <View style={styl} nestedScrollEnabled = {true}>

                {
                    _renderStatistics(_statisticsSection(dreams, languages,dreamsYest,dreamTomorrow,totalMinutesWakefulness), statisticsView, theme, amountOfDays, indicator,view,indicatorAbove, languages,date)
                }
            
            </View>
            
       
    )
}

export default StatisticsOnce
