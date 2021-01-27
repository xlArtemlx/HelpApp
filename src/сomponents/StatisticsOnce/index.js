import React from "react";

import {ScrollView, Text, View} from 'react-native'
import {calcTotalSleep, calcAverage, getDreamByType, calcWakefulness} from "../../utils/calcStatistics";
import {renderTime} from "../../utils/renderTime";

import {styles} from './styles'

const _renderStatistics = (fields, statisticsView) => {

    return fields.map( (field, index) => {
        const isDisable = !!statisticsView.find( setting => setting.value === field.id )
        return !isDisable && (
            <View key={index} style={styles.statisticsOnceItem}>
               <View  style={styles.statisticsOnceText}>
                   <Text>{field.title}</Text>
                   <Text style={{fontWeight: 'bold'}}>{field.value}</Text>
               </View>
            </View>
        )
    })
}

const _statisticsSection = (dreams, languages) => {

    const dreamDay = getDreamByType('day', dreams)
    const dreamNight = getDreamByType('night', dreams)

    return [
        {
            id: 'total_sleep',
            title: `${languages.total_sleep}:rwerwer `,
            value: renderTime(calcTotalSleep(dreams), languages)
        },
        {
            id: 'average_sleep',
            title: `${languages.average_sleep}: `,
            value: renderTime(calcAverage(calcTotalSleep(dreams), dreams.length), languages)
        },
        {
            id: 'total_day_sleep',
            title: `${languages.day_sleep}: `,
            value: renderTime(calcTotalSleep(dreamDay), languages)
        },
        {
            id: 'average_day_sleep',
            title: `${languages.average_day_sleep}: `,
            value: renderTime(calcAverage(calcTotalSleep(dreamDay), dreamDay.length), languages)
        },
        {
            id: 'total_night_sleep',
            title: `${languages.night_sleep}: `,
            value: renderTime(calcTotalSleep(dreamNight), languages)
        },
        {
            id: 'average_night_sleep',
            title: `${languages.average_night_sleep}: `,
            value: renderTime(calcAverage(calcTotalSleep(dreamNight), dreamNight.length), languages)
        },
        {
            id: 'day_sleep_count',
            title: `${languages.day_sleep_count}: `,
            value: dreamDay.length
        },
        {
            id: 'night_sleep_count',
            title: `${languages.night_sleep_count}: `,
            value: dreamNight.length
        },
        {
            id: 'total_wakefulness',
            title: `${languages.total_wakefulness}: `,
            value: renderTime(calcWakefulness(dreams), languages)
        }
    ]
}

const StatisticsOnce = ({dreams, languages, statisticsView}) => {

    return (
        <ScrollView style={styles.statisticsOnce}>

            {
                _renderStatistics(_statisticsSection(dreams, languages), statisticsView)
            }
        </ScrollView>
    )
}

export default StatisticsOnce
