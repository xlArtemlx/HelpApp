import React from 'react'

import {View, Text, ScrollView} from "react-native";

import {styles} from './styles'
import {useSelector} from "react-redux";
import {useRoute} from "@react-navigation/native";


const _recommendationListRu = [
    {
        age: 'от 0 до 1',
        nightSleep: '8 - 9 часов',
        daySleep: '7 - 9 часов',
        countSleep: '3 - 6',
    },
    {
        age: '1 месяц',
        nightSleep: '8 - 9 часов',
        daySleep: '7 - 9 часов',
        countSleep: '3 - 6',
    },
    {
        age: '2 месяц',
        nightSleep: '8 - 9 часов',
        daySleep: '7 - 9 часов',
        countSleep: '3 - 6',
    },
    {
        age: '3 месяца',
        nightSleep: '9 - 10 часов',
        daySleep: '4 - 5 часов',
        countSleep: '3 - 5',
    },
    {
        age: '4 месяца',
        nightSleep: '10 - 11 часов',
        daySleep: '4 - 5 часов',
        countSleep: '2 - 3',
    },
    {
        age: '5 месяцев',
        nightSleep: '10 - 12 часов',
        daySleep: '3 - 4 часов',
        countSleep: '2 - 3',
    },
    {
        age: '6 месяцев',
        nightSleep: '10 - 12 часов',
        daySleep: '3 - 4 часов',
        countSleep: '2 - 3',
    },
    {
        age: '7 месяцев',
        nightSleep: '10 - 12 часов',
        daySleep: '3 - 3,5 часов',
        countSleep: '2 - 3',
    },
    {
        age: '8 месяцев',
        nightSleep: '10 - 12 часов',
        daySleep: '3 - 3,5 часов',
        countSleep: '2 - 3',
    },
    {
        age: '9 месяцев',
        nightSleep: '10 - 12 часов',
        daySleep: '2 - 3 часа',
        countSleep: '2 - 3',
    },
    {
        age: 'от 10 месяцев до 1 года',
        nightSleep: '10 - 12 часов',
        daySleep: '2 - 3 часа',
        countSleep: '2',
    },
    {
        age: 'от 1 года до 1 года 6 месяцев',
        nightSleep: '10 - 12 часов',
        daySleep: '1,5 - 3 часа',
        countSleep: '1 - 2',
    },
    {
        age: 'от 1 года 6 месяцев до 3 лет',
        nightSleep: '10 - 11 часов',
        daySleep: '1,5 - 2 часа',
        countSleep: '1',
    },
]

const _recommendationListenUS = [
    {
        age: 'от 0 до 1',
        nightSleep: '8 -  9 hours',
        daySleep: '7 - 9 hours',
        countSleep: '3 - 6',
    },
    {
        age: '1 month',
        nightSleep: '8 - 9 hours',
        daySleep: '7 - 9 hours',
        countSleep: '3 - 6',
    },
    {
        age: '2 months',
        nightSleep: '8 - 9 hours',
        daySleep: '7 - 9 hours',
        countSleep: '3 - 6',
    },
    {
        age: '3 months',
        nightSleep: '9 - 10 hours',
        daySleep: '4 - 5 hours',
        countSleep: '3 - 5',
    },
    {
        age: '4 months',
        nightSleep: '10 - 11 hours',
        daySleep: '4 - 5 hours',
        countSleep: '2 - 3',
    },
    {
        age: '5 months',
        nightSleep: '10 - 12 hours',
        daySleep: '3 - 4 hours',
        countSleep: '2 - 3',
    },
    {
        age: '6 months',
        nightSleep: '10 - 12 hours',
        daySleep: '3 - 4 hours',
        countSleep: '2 - 3',
    },
    {
        age: '7 months',
        nightSleep: '10 - 12 hours',
        daySleep: '3 - 3,5 hours',
        countSleep: '2 - 3',
    },
    {
        age: '8 months',
        nightSleep: '10 - 12 hours',
        daySleep: '3 - 3,5 hours',
        countSleep: '2 - 3',
    },
    {
        age: '9 months',
        nightSleep: '10 - 12 hours',
        daySleep: '2 - 3 hours',
        countSleep: '2 - 3',
    },
    {
        age: 'from 10 months to 1 year',
        nightSleep: '10 - 12 hours',
        daySleep: '2 - 3 hours',
        countSleep: '2',
    },
    {
        age: 'from 1 to 1 year 6 months',
        nightSleep: '10 - 12 hours',
        daySleep: '1,5 - 3 hours',
        countSleep: '1 - 2',
    },
    {
        age: 'from 1 year 6 months to 3 years',
        nightSleep: '10 - 11 hours',
        daySleep: '1,5 - 2 hours',
        countSleep: '1',
    },
]

const RecommendationScreen = () => {


    const {params} = useRoute();
    const {theme} = params ? params : {};

    const languages = useSelector( ({app}) => app.languages);
    const recommendationList = languages.fns_locale === 'eu' ? _recommendationListenUS : _recommendationListRu

    return (
        <ScrollView style={{...styles.recommendationContainer, backgroundColor: theme.background}}>
            {recommendationList.map((recommendation, index) => (
                <View style={styles.recommendationItem} key={index}>
                    <Text style={{...styles.recommendationTitle, color: theme && theme.text}}>{languages.age}: <Text style={styles.recommendationValue}>{recommendation.age}</Text></Text>
                    <Text style={{...styles.recommendationTitle, color: theme && theme.text}}>{languages.night_sleep}: <Text style={styles.recommendationValue}>{recommendation.nightSleep}</Text></Text>
                    <Text style={{...styles.recommendationTitle, color: theme && theme.text}}>{languages.day_sleep}: <Text style={styles.recommendationValue}>{recommendation.daySleep}</Text></Text>
                    <Text style={{...styles.recommendationTitle, color: theme && theme.text}}>{languages.day_sleep_count}: <Text style={styles.recommendationValue}>{recommendation.countSleep}</Text></Text>
                </View>
            ))}
        </ScrollView>
    )
}

export default RecommendationScreen
