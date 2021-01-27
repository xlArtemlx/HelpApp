import {View, ActivityIndicator} from "react-native";
import * as React from "react";
import {DiagramScreen} from "../index";
import {SwitchMonth, DaysOfWeek, DreamStatistic, CenterBlock} from "../../components";

const StatisticsScreen = ({nextActiveDate, prevActiveDate, dreams, weeks, setWeeksTC, tableMode, loading, statisticsView, languages, theme, activeChild, indicator,dreamsMonth,dreamsTwoWeeks,dreamsThreeWeeks,indicatorAbove}) => {


    return (
        <View style={{flex: 1, backgroundColor: theme.background}}>
            <SwitchMonth setWeeksTC={setWeeksTC} weeks={weeks} nextActiveDate={nextActiveDate} prevActiveDate={prevActiveDate} theme={theme}/>
            <DaysOfWeek days={weeks} padding={tableMode ? 24: 17} theme={theme}/>
            {
                tableMode
                    ? (
                         <DreamStatistic languages={languages} statisticsView={statisticsView} dreams={dreams} theme={theme} birthday={activeChild.date} indicator={indicator} dreamsMonth={dreamsMonth} 
                                              dreamsTwoWeeks={dreamsTwoWeeks} dreamsThreeWeeks={dreamsThreeWeeks} indicatorAbove={indicatorAbove}
                                />
                        )
                    : <DiagramScreen languages={languages}/>
            }

        </View>
    );
}

export default StatisticsScreen
