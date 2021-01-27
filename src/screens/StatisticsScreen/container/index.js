import React, {useEffect} from "react";

import {connect} from 'react-redux'

import {useNavigation} from "@react-navigation/native";
import {setWeeksTC, setDreamsTC} from "../../../redux/reducers/statisticsReducer";
import {getStatisticsViewTC, setLanguagesTC} from "../../../redux/reducers/appReducer";
import StatisticsScreen from "../index";
import moment from "moment";

const mapStateToProps = (({statistics, app, child}) => ({
    weeks: statistics.weeks,
    dreams: statistics.dreams,
    prevActiveDate: statistics.prevActiveDate,
    nextActiveDate: statistics.nextActiveDate,
    loading: statistics.loading,
    statisticsView: app.statisticsView,
    languages: app.languages,
    theme: app.activeTheme,
    activeChild: child.activeChild,
    statisticIndicator: statistics.colorStatisticIndicator,
    dreamsMonth: statistics.dreamsMonth,
    dreamsTwoWeeks: statistics.dreamsTwoWeeks,
    dreamsThreeWeeks: statistics.dreamsThreeWeeks,
    statisticIndicatorAbove: statistics.colorStatisticIndicatorAbove
}))

export default connect(mapStateToProps, {
    setWeeksTC,
    setDreamsTC,
    getStatisticsViewTC,
    setLanguagesTC
})(({dreams, weeks, setWeeksTC, nextActiveDate, prevActiveDate, tableMode, loading, getStatisticsViewTC, statisticsView, setLanguagesTC, languages, theme, activeChild, statisticIndicator,dreamsMonth,dreamsTwoWeeks,dreamsThreeWeeks,statisticIndicatorAbove}) => {

    const navigation = useNavigation()

    useEffect(() => {
        setLanguagesTC()
    }, [languages])

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setWeeksTC(moment().local())
            getStatisticsViewTC()
        });
        return unsubscribe
    }, [navigation, nextActiveDate, prevActiveDate, weeks])

    return <StatisticsScreen
        weeks={weeks}
        prevActiveDate={prevActiveDate}
        nextActiveDate={nextActiveDate}
        dreams={dreams}
        setWeeksTC={setWeeksTC}
        tableMode={tableMode}
        loading={loading}
        statisticsView={statisticsView}
        languages={languages}
        theme={theme}
        activeChild={activeChild}
        indicator={statisticIndicator}
        dreamsMonth={dreamsMonth}
        dreamsTwoWeeks={dreamsTwoWeeks}
        dreamsThreeWeeks={dreamsThreeWeeks}
        indicatorAbove={statisticIndicatorAbove}
    />
})
