import React from "react";
import {View, Text, ScrollView} from "react-native";
import {DreamTotalSleep} from "../index";

import {calcAverage, calcTotalSleep, calcWakefulness, getDreamByType} from "../../utils/calcStatistics";
import {filterByTimeOfDay} from "../../utils/filterByTimeOfDay";

import {styles} from "./styles";


const _renderStatisticsSection = (dreams, title, render, statisticsView, value, index) => {
   

    const isDisable = !!statisticsView.find( (setting) => setting.value === value )

    return (
        !isDisable &&
        <View key={index} style={styles.dreamsStatisticsTotal}>
            <Text style={styles.dreamsStatisticsText}>{title}</Text>
            <View style={styles.dreamsStatistics}>
                {
                    dreams.map( (dream, index) => render(dream.dream, index))
                }
            </View>
        </View>
    )
}

const statisticsSections = languages => [
    {
        title: `${languages.total_sleep}`,
        value: 'total_sleep',
        render: (dream, index) => <DreamTotalSleep languages={languages} key={index} totalSleep={calcTotalSleep(dream)}/>
    },
    {
        title: `${languages.total_day_sleep}`,
        value: 'total_day_sleep',
        render: (dream, index) => <DreamTotalSleep languages={languages} key={index} totalSleep={filterByTimeOfDay(dream, 'day')}/>
    },
    {
        title: `${languages.total_night_sleep}`,
        value: 'total_night_sleep',
        render: (dream, index) => <DreamTotalSleep languages={languages} key={index} totalSleep={filterByTimeOfDay(dream, 'night')}/>
    },
    {
        title: `${languages.average_sleep}`,
        value: 'average_sleep',
        render: (dream, index) => <DreamTotalSleep languages={languages} key={index} totalSleep={calcAverage(calcTotalSleep(dream), dream.length)}/>
    },
    {
        title: `${languages.average_day_sleep}`,
        value: 'average_day_sleep',
        render: (dream, index) => <DreamTotalSleep languages={languages} key={index} totalSleep={calcAverage(calcTotalSleep(getDreamByType('day', dream)), dream.length) }/>
    },
    {
        title: `${languages.average_night_sleep}`,
        value: 'average_night_sleep',
        render: (dream, index) => <DreamTotalSleep languages={languages} key={index} totalSleep={calcAverage(calcTotalSleep(getDreamByType('night', dream)), dream.length) }/>
    },
    {
        title: `${languages.total_wakefulness}`,
        value: 'total_wakefulness',
        render: (dream, index) => <DreamTotalSleep languages={languages} key={index} totalSleep={calcWakefulness(dream) || 0}/>
    }
]

const DreamStatistic = ({dreams, statisticsView, languages}) => {

    return (
        <ScrollView style={styles.dreamsStatisticsContainer}>

            {statisticsSections(languages).map( (section, index) => _renderStatisticsSection(dreams, section.title, section.render, statisticsView, section.value, index))}

        </ScrollView>
    );
}

export default DreamStatistic
