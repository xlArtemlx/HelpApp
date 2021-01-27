import React from "react";
import {View, Text, ScrollView} from "react-native";
import {DreamTotalSleep} from "../index";
import {DreamTotalSleepWeek} from '../index'




import {calcAverage, calcTotalSleep, calcWakefulness, getDreamByType,getDreamByTypeWeeks,createAverageArrays,createAvgArrayWakefulness,createAvgCountDream,calcWakefulnessAverageDream} from "../../utils/calcStatistics";

import {filterByTimeOfDay} from "../../utils/filterByTimeOfDay";

import {styles} from "./styles";


const _renderStatisticsSection = ( title, render, statisticsView, languages, value, index, theme, birthday, indicator,valueAverageWeeks,dreams,dreamsMonth,dreamsTwoWeeks,dreamsThreeWeeks,indicatorAbove) => {

   

    const isDisable = !!statisticsView.find( (setting) => setting.value === value )
  

    return (
        !isDisable &&
        <View key={index} style={styles.dreamsStatisticsTotal}>
            <Text style={{...styles.dreamsStatisticsText, color: theme.text}}>{title}</Text>
            <View style={styles.dreamsStatistics}>
                {
                    dreams.map( (dream, index) => render(dream.dream, index, birthday, indicator,indicatorAbove))
                }
            </View>
            <View>
                <DreamTotalSleepWeek  
                languages={languages} 
                valueAverageWeeks={valueAverageWeeks(dreams,dreamsTwoWeeks,dreamsThreeWeeks,dreamsMonth) || 0} 
                statisticsView={statisticsView}
                />
            </View>
        </View>
    )
}

const statisticsSections = languages => [
    {
        title: `${languages.total_sleep}`,
        value: 'total_sleep',
        valueAverageWeeks: (dreams,dreamsTwoWeeks,dreamsThreeWeeks,dreamsMonth) => createAverageArrays(dreams,dreamsTwoWeeks,dreamsThreeWeeks,dreamsMonth),
        render: (dream, index, birthday, indicator,indicatorAbove) => <DreamTotalSleep languages={languages} key={index} totalSleep={calcTotalSleep(dream)} tag={'total_sleep'} birthday={birthday} indicator={indicator} indicatorAbove={indicatorAbove}/>
    },
    {
        title: `${languages.total_day_sleep}`,
        value: 'total_day_sleep',
        valueAverageWeeks: (dreams,dreamsTwoWeeks,dreamsThreeWeeks,dreamsMonth) => createAverageArrays(getDreamByTypeWeeks('day', dreams),getDreamByTypeWeeks('day', dreamsTwoWeeks),getDreamByTypeWeeks('day', dreamsThreeWeeks),getDreamByTypeWeeks('day', dreamsMonth)),
        render: (dream, index, birthday, indicator,indicatorAbove) => <DreamTotalSleep languages={languages} key={index} totalSleep={filterByTimeOfDay(dream, 'day')} tag={'total_day_sleep'} birthday={birthday} indicator={indicator} indicatorAbove={indicatorAbove}/>
    },
    {
        title: `${languages.average_day_sleep}`,
        value: 'average_day_sleep',
        valueAverageWeeks:(dreams,dreamsTwoWeeks,dreamsThreeWeeks,dreamsMonth) => createAverageArrays(getDreamByTypeWeeks('day', dreams),getDreamByTypeWeeks('day', dreamsTwoWeeks),getDreamByTypeWeeks('day', dreamsThreeWeeks),getDreamByTypeWeeks('day', dreamsMonth),'average'),
        render: (dream, index, birthday, indicator,indicatorAbove) => <DreamTotalSleep indicatorAbove={indicatorAbove} languages={languages} key={index} totalSleep={calcAverage(calcTotalSleep(getDreamByType('day', dream)), getDreamByType('day', dream).length) } tag={'average_day_sleep'} birthday={birthday} indicator={indicator}/>
    },
    {
        title: `${languages.total_night_sleep}`,
        value: 'total_night_sleep',
        valueAverageWeeks: (dreams,dreamsTwoWeeks,dreamsThreeWeeks,dreamsMonth) => createAverageArrays(getDreamByTypeWeeks('night', dreams),getDreamByTypeWeeks('night', dreamsTwoWeeks),getDreamByTypeWeeks('night', dreamsThreeWeeks),getDreamByTypeWeeks('night', dreamsMonth)),
        render: (dream, index, birthday, indicator,indicatorAbove) => <DreamTotalSleep  languages={languages} key={index} totalSleep={filterByTimeOfDay(dream, 'night')} tag={'total_night_sleep'} birthday={birthday} indicator={indicator} indicatorAbove={indicatorAbove}/>
    },
    {
        title: `${languages.average_night_sleep}`,
        value: 'average_night_sleep',
        valueAverageWeeks: (dreams,dreamsTwoWeeks,dreamsThreeWeeks,dreamsMonth) => createAverageArrays(getDreamByTypeWeeks('night', dreams),getDreamByTypeWeeks('night', dreamsTwoWeeks),getDreamByTypeWeeks('night', dreamsThreeWeeks),getDreamByTypeWeeks('night', dreamsMonth),'average'),
        render: (dream, index, birthday, indicator,indicatorAbove) => <DreamTotalSleep indicatorAbove={indicatorAbove} languages={languages} key={index} totalSleep={calcAverage(calcTotalSleep(getDreamByType('night', dream)), getDreamByType('night', dream).length) } tag={'average_night_sleep'} birthday={birthday} indicator={indicator}/>
    },
    {
        title: `${languages.total_wakefulness}`,
        value: 'total_wakefulness',
        valueAverageWeeks: (dreams,dreamsTwoWeeks,dreamsThreeWeeks,dreamsMonth) => createAvgArrayWakefulness(dreams,dreamsTwoWeeks,dreamsThreeWeeks,dreamsMonth),
        render: (dream, index) => <DreamTotalSleep languages={languages} tag={'total_wakefulness'} key={index} totalSleep={calcWakefulness(dream) || 0}/>
    },
    {
        title: `${languages.total_wakefulness_night}`,
        value: 'total_wakefulness_night',
        valueAverageWeeks: (dreams,dreamsTwoWeeks,dreamsThreeWeeks,dreamsMonth) => createAvgArrayWakefulness(getDreamByTypeWeeks('night', dreams),getDreamByTypeWeeks('night', dreamsTwoWeeks),getDreamByTypeWeeks('night', dreamsThreeWeeks),getDreamByTypeWeeks('night', dreamsMonth)),
        render: (dream, index) => <DreamTotalSleep dream={dream} languages={languages} key={index} tag={'total_wakefulness_night'} totalSleep={calcWakefulness(getDreamByType('night', dream)) || 0}/>
    },
    {
        title: `${languages.total_wakefulness_night_average}`,
        value: 'total_wakefulness_average_night',
        valueAverageWeeks: (dreams,dreamsTwoWeeks,dreamsThreeWeeks,dreamsMonth) => createAvgArrayWakefulness(getDreamByTypeWeeks('night', dreams),getDreamByTypeWeeks('night', dreamsTwoWeeks),getDreamByTypeWeeks('night', dreamsThreeWeeks),getDreamByTypeWeeks('night', dreamsMonth),'average'),
        render: (dream, index) => <DreamTotalSleep languages={languages} key={index} tag={'total_wakefulness_average_night'} totalSleep={ calcAverage(calcWakefulnessAverageDream(getDreamByType('night', dream)),getDreamByType('night', dream).length) || 0}/>
    },
    {
        title: `${languages.total_wakefulness_day}`,
        value: 'total_wakefulness_day',
        valueAverageWeeks: (dreams,dreamsTwoWeeks,dreamsThreeWeeks,dreamsMonth) => createAvgArrayWakefulness (getDreamByTypeWeeks('day', dreams),getDreamByTypeWeeks('day', dreamsTwoWeeks),getDreamByTypeWeeks('day', dreamsThreeWeeks),getDreamByTypeWeeks('day', dreamsMonth)),
        render: (dream, index) => <DreamTotalSleep languages={languages} key={index} tag={'total_wakefulness_day'} totalSleep={calcWakefulness(getDreamByType('day', dream)) || 0}/>
    },
    {
        title: `${languages.total_wakefulness_day_average}`,
        value: 'total_wakefulness_average_day',
        valueAverageWeeks: (dreams,dreamsTwoWeeks,dreamsThreeWeeks,dreamsMonth) => createAvgArrayWakefulness (getDreamByTypeWeeks('day', dreams),getDreamByTypeWeeks('day', dreamsTwoWeeks),getDreamByTypeWeeks('day', dreamsThreeWeeks),getDreamByTypeWeeks('day', dreamsMonth),'average'),
        render: (dream, index) => <DreamTotalSleep languages={languages} key={index} tag={'total_wakefulness_average_day'} totalSleep={calcAverage(calcWakefulnessAverageDream(getDreamByType('day', dream)),getDreamByType('day', dream).length) || 0}/>
    },
    {
        title: `${languages.total_daytime_dreams}`,
        value: 'total_daytime_dreams',
        valueAverageWeeks: (dreams,dreamsTwoWeeks,dreamsThreeWeeks,dreamsMonth) => createAvgCountDream(dreams,dreamsTwoWeeks,dreamsThreeWeeks,dreamsMonth) ,
        render: (dream, index, birthday, indicator,indicatorAbove) => <DreamTotalSleep birthday={birthday} countDream={dream.length} indicator={indicator} languages={languages} tag={'total_daytime_dreams'} key={index} totalSleep={  0} indicatorAbove={indicatorAbove}/>
    },
]

const DreamStatistic = ({dreams, statisticsView, languages, theme, birthday, indicator,dreamsMonth,dreamsTwoWeeks,dreamsThreeWeeks,indicatorAbove}) => {



    return (
        <ScrollView style={styles.dreamsStatisticsContainer}>

            {statisticsSections(languages).map( (section, index) => _renderStatisticsSection( section.title, section.render, statisticsView,languages, section.value, index, theme, birthday, indicator,section.valueAverageWeeks,dreams,dreamsTwoWeeks,dreamsThreeWeeks ,dreamsMonth,indicatorAbove))}

        </ScrollView>
    );
}

export default DreamStatistic

DreamStatistic.defaultProps = {
    
}







