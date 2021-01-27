import React, {useEffect} from "react";

import {connect} from 'react-redux'

import {useNavigation} from "@react-navigation/native";
import {setWeeksTC, setDreamsTC} from "../../../redux/reducers/statisticsReducer";
import Diagram from "../index";
import moment from "moment";

const mapStateToProps = (({statistics}) => ({
    weeks: statistics.weeks,
    dreams: statistics.dreams,
    activeDate: statistics.activeDate,
    loading: statistics.loading,
}))

export default connect(mapStateToProps, {
    setWeeksTC,
    setDreamsTC
})(({dreams, weeks, setWeeksTC, activeDate, languages}) => {
  

    const navigation = useNavigation()

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setWeeksTC(moment().local())
        });
        return unsubscribe
    }, [navigation, activeDate, weeks])

    return <Diagram
        languages={languages}
        dreams={dreams}
        weeks={weeks}
    />
})
