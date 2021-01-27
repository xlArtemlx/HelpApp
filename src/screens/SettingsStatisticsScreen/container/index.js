import React, {useEffect} from 'react'

import {connect} from "react-redux";
import {getStatisticsViewTC, setStatisticsViewTC, setLanguagesTC} from "../../../redux/reducers/appReducer";
import {setDreamColorStatistic, setGestureActive, setStatisticColorStatistic,setDreamColorStatisticAbove, setStatisticColorStatisticAbove} from "../../../redux/reducers/statisticsReducer";

import SettingsStatisticsScreen from '../index'
import {useNavigation} from "@react-navigation/native";

const mapStateToProps = ({app}) => {
    return {
        statisticsView: app.statisticsView,
        languages: app.languages,
        theme: app.activeTheme
    }
}

export default connect(mapStateToProps, {
    getStatisticsViewTC,
    setStatisticsViewTC,
    setLanguagesTC,
    setDreamColorStatistic,
    setGestureActive,
    setStatisticColorStatistic,
    setDreamColorStatisticAbove, 
    setStatisticColorStatisticAbove,
})(({statisticsView, setLanguagesTC, getStatisticsViewTC, setStatisticsViewTC, languages, theme, setDreamColorStatistic, setGestureActive, setStatisticColorStatistic,setDreamColorStatisticAbove, setStatisticColorStatisticAbove}) => {

    const navigation = useNavigation()

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getStatisticsViewTC()
            setLanguagesTC()
        });
        return unsubscribe
    }, [navigation, statisticsView, languages])

    return (
        <SettingsStatisticsScreen
            languages={languages}
            statisticsView={statisticsView}
            setStatisticsViewTC={setStatisticsViewTC}
            theme={theme}
            setDreamColorStatistic={setDreamColorStatistic}
            setGestureActive={setGestureActive}
            setStatisticColorStatistic={setStatisticColorStatistic}
            setDreamColorStatisticAbove={setDreamColorStatisticAbove}
            setStatisticColorStatisticAbove={setStatisticColorStatisticAbove}
        />
    )

})
