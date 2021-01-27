import React, {useEffect} from 'react'
import {ActivityIndicator} from 'react-native'

import {connect} from "react-redux";
import {getDataTC, startDreamTC, endDreamTC} from "../../../redux/reducers/mainReducer";

import MainScreen from '../index'
import {useNavigation} from "@react-navigation/native";
import {CenterBlock} from "../../../components";
import {getStatisticsViewTC} from "../../../redux/reducers/appReducer";
import {initChildren, changeChild} from "../../../redux/reducers/childReducer";


const mapStateToProps = ({date, app, child, statistics}) => {

    return {
        date: date.date,
        dreams: date.dreams,
        dreamsYest: date.dreamYest,
        dreamTomorrow: date.dreamTomorrow,
        isLoading: date.isLoading,
        statisticsView: app.statisticsView,
        children: child.children,
        activeChild: child.activeChild,
        theme: app.activeTheme,
        indicator: statistics.colorDreamIndicator,
        gesture: statistics.gesture,
        indicatorAbove: statistics.colorDreamIndicatorAbove,
    }
}

export default connect(mapStateToProps, {
    getDataTC,
    startDreamTC,
    endDreamTC,
    getStatisticsViewTC,
    initChildren,
    changeChild,
})(({date, dreams, getDataTC, startDreamTC, endDreamTC, isLoading, statisticsView, getStatisticsViewTC, initChildren, children, activeChild, changeChild, theme, indicator, gesture,indicatorAbove,dreamsYest,dreamTomorrow}) => {

    const navigation = useNavigation()
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getDataTC(date)
           
            getStatisticsViewTC()
        });
        return unsubscribe
    }, [navigation, dreams,dreamsYest,dreamTomorrow])

    useEffect(() => {
        getDataTC(date);
    }, [activeChild]);



    return (
        !isLoading
            ? <MainScreen
                date={date}
                dreams={dreams}
                startDreamTC={startDreamTC}
                endDreamTC={endDreamTC}
                statisticsView={statisticsView}
                children={children}
                activeChild={activeChild}
                changeChild={changeChild}
                theme={theme}
                indicator={indicator}
                gesture={gesture}
                indicatorAbove={indicatorAbove}
                dreamsYest={dreamsYest}
                dreamTomorrow={dreamTomorrow}
            /> 
            : <CenterBlock><ActivityIndicator size="large" color="#1768AF" /></CenterBlock>
    )

})
