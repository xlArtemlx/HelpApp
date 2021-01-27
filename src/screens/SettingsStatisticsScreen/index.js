import React, {useState} from "react";

import {Text, Switch, View, ScrollView} from 'react-native'

import { useRoute } from '@react-navigation/native';

import {styles} from './styles';

const _settingsStatisticsTable = languages => [
    {
        title: `${languages.total_sleep}`,
        value: 'total_sleep',
    },
    {
        title: `${languages.total_day_sleep}`,
        value: 'total_day_sleep'
    },
    {
        title: `${languages.total_night_sleep}`,
        value: 'total_night_sleep'
    },
    {
        title: `${languages.average_sleep}`,
        value: 'average_sleep'
    },
    {
        title: `${languages.average_day_sleep}`,
        value: 'average_day_sleep'
    },
    {
        title: `${languages.average_night_sleep}`,
        value: 'average_night_sleep'
    },
    {
        title: `${languages.total_wakefulness}`,
        value: 'total_wakefulness'
    },
    {
        title: `${languages.total_wakefulness_night}`,
        value: 'total_wakefulness_night'
    },
    {
        title: `${languages.total_wakefulness_night_average}`,
        value: 'total_wakefulness_average_night'
    },
    {
        title: `${languages.total_wakefulness_day}`,
        value: 'total_wakefulness_day'
    },
    {
        title: `${languages.total_wakefulness_day_average}`,
        value: 'total_wakefulness_average_day'
    },
    {
        title: `${languages.total_daytime_dreams}`,
        value:  'total_daytime_dreams'
    },
]
const _settingsStatistics = languages => [
    {
        title: `${languages.total_sleep}`,
        value: 'total_sleep_oneday',
    },
    {
        title: `${languages.total_day_sleep}`,
        value: 'total_day_sleep_oneday'
    },
    {
        title: `${languages.total_night_sleep}`,
        value: 'total_night_sleep_oneday'
    },
    {
        title: `${languages.average_sleep}`,
        value: 'average_sleep_oneday'
    },
    {
        title: `${languages.average_day_sleep}`,
        value: 'average_day_sleep_oneday'
    },
    {
        title: `${languages.average_night_sleep}`,
        value: 'average_night_sleep_oneday'
    },
    {
        title: `${languages.total_wakefulness}`,
        value: 'total_wakefulness_oneday'
    },
    {
        title: `${languages.total_wakefulness_night}`,
        value: 'total_wakefulness_night_oneday'
    },
    {
        title: `${languages.total_wakefulness_night_average}`,
        value: 'total_wakefulness_average_night_oneday'
    },
    {
        title: `${languages.total_wakefulness_day}`,
        value: 'total_wakefulness_day_oneday'
    },
    {
        title: `${languages.total_wakefulness_day_average}`,
        value: 'total_wakefulness_average_day_oneday'
    },
    {
        title: `${languages.total_daytime_dreams}`,
        value:  'total_daytime_dreams_oneday'
    },
    {
        title: `${languages.day_sleep_count}`,
        value:  'day_sleep_count_oneday'
    },
    {
        title: `${languages.night_sleep_count}`,
        value:  'night_sleep_count_oneday'
    },
]
const _settingTable = languages => [
    {
        title: `1 ${languages.week.toLowerCase()}`,
        value: '1_week',
    },
    {
        title: `2 ${languages.weeks.toLowerCase()}`,
        value: '2_weeks',
    },
    {
        title: `3 ${languages.weeks.toLowerCase()}`,
        value: '3_weeks',
    },
    {
        title: `${languages.month}`,
        value: '1_month',
    },
]

const _renderSettings = (setting, index, _handleSettingsUpdate, statisticsView, theme) => {
    const [isEnabled, setIsEnabled] = useState(statisticsView
        ? !!!statisticsView.find(({value}) => setting.value === value)
        : true
    )

    const _toggleEnable = () => {
        setIsEnabled(!isEnabled)
        _handleSettingsUpdate(setting.value)
    }


    return (
        <View style={{...styles.settingStatisticItem, backgroundColor: theme.navigator}} key={index}>
            <Text style={{color: theme.text}}>{setting.title}</Text>
            <Switch
                onValueChange={_toggleEnable}
                value={isEnabled}
            />
        </View>
    )
};


const toggleColorIndicator = (dreamColor, setDreamColor, statisticColor, setStatisticColor, route, setDreamColorStatistic, setStatisticColorStatistic,isVisible,setIsVisible) => {
    if (route.name === 'SettingsDream') {
        setDreamColor(!dreamColor);
        setDreamColorStatistic(!dreamColor);
            setIsVisible(!isVisible)
    } else if (route.name === 'View') {
        setStatisticColor(!statisticColor);
        setStatisticColorStatistic(!statisticColor)
        setIsVisible(!isVisible)
    }
};
const toggleColorIndicatorAbove = (dreamColorAbove, setDreamColorAbove, statisticColorAbove, setStatisticColorAbove, route, setDreamColorStatisticAbove, setStatisticColorStatisticAbove) => {

    if (route.name === 'SettingsDream') {
        setDreamColorAbove(!dreamColorAbove);
        setDreamColorStatisticAbove(!dreamColorAbove);
    } else if (route.name === 'View') {
        setStatisticColorAbove(!statisticColorAbove);
        setStatisticColorStatisticAbove(!statisticColorAbove)
    }
};

const toggleGestures = (gesture, setGesture, setGestureActive) => {
    setGesture(!gesture);
    setGestureActive(!gesture);
};


const SettingsStatisticsScreen = ({statisticsView, setStatisticsViewTC, languages, theme, setDreamColorStatistic, setGestureActive, setStatisticColorStatistic,setDreamColorStatisticAbove,setStatisticColorStatisticAbove}) => {

    const route = useRoute();

    const [dreamColor, setDreamColor] = useState(false);
    const [statisticColor, setStatisticColor] = useState(false);
    const [dreamColorAbove, setDreamColorAbove] = useState(false);
    const [statisticColorAbove, setStatisticColorAbove] = useState(false);

    const [isVisible,setIsVisible] = useState(false)

    const [gesture, setGesture] = useState(false);

    const _handleSettingsUpdate = (settingValue) => {

        const updatedSettings = _settingsStatistics(languages).find(({value}) => value === settingValue)
        setStatisticsViewTC(updatedSettings)
    }
    
    const _handleSettingsUpdateTable = (settingValue) => {

        const updatedSettings = _settingsStatisticsTable(languages).find(({value}) => value === settingValue)
        setStatisticsViewTC(updatedSettings)
    }



    return (
        <ScrollView style={{...styles.settingStatisticsContainer, backgroundColor: theme.background}}>

            {
                route.name === 'SettingsDream' ? <View>
                    <Text style={{...styles.settingsSectionTitle}}>{languages.list_control}</Text>
                    <View style={{...styles.settingStatisticItem, backgroundColor: theme.navigator, marginBottom: 20}}>
                        <Text style={{color: theme.text}}>{languages.change_gestures}</Text>
                        <Switch
                            onValueChange={ () => toggleGestures(gesture, setGesture, setGestureActive)}
                            value={gesture}
                        />
                    </View>
                </View> : null
            }
        

            { route.name === 'SettingsDream' ?
                <>
                <Text style={{...styles.settingsSectionTitle}}>{languages.color_indication}</Text>
                <View style={{...styles.settingStatisticItem, backgroundColor: theme.navigator, marginBottom: 20}}>
                <Text style={{color: theme.text}}>{languages.colored_statistics_indicators}</Text>
                    <Switch
                        onValueChange={ () => toggleColorIndicator(
                            dreamColor, setDreamColor,
                            statisticColor, setStatisticColor,
                            route, setDreamColorStatistic,
                            setStatisticColorStatistic,
                            isVisible,setIsVisible)}
                        value={route.name === 'SettingsDream' ? dreamColor : statisticColor}
                    />
                </View>
                { isVisible &&
                    <View style={{...styles.settingStatisticItem, backgroundColor: theme.navigator, marginBottom: 20}}>
                    <Text style={{color: theme.text}}>{languages.highlight_above_normal}</Text>
                        <Switch
                            onValueChange={ () => toggleColorIndicatorAbove(
                                dreamColorAbove, setDreamColorAbove,
                                statisticColorAbove, setStatisticColorAbove,
                                route, setDreamColorStatisticAbove,
                                setStatisticColorStatisticAbove)}
                            value={route.name === 'SettingsDream' ? dreamColorAbove : statisticColorAbove}
                        />
                    </View>
                }
                </> : null
            }
            
            

            <Text style={{...styles.settingsSectionTitle}}>{languages.display_statistics}</Text>
            <View style={{marginTop: 10}}>
             { route.name === 'SettingsDream' ?
                
                _settingsStatistics(languages).map((setting, index) => _renderSettings(setting, index, _handleSettingsUpdate, statisticsView, theme))
                 :
                 <>
                 <View>
                     {_settingTable(languages).map((setting,index) => _renderSettings(setting,index,_handleSettingsUpdateTable,statisticsView,theme))}
                 </View>
                 <View style={{...styles.settingStatisticItem, backgroundColor: theme.navigator,}}>
                    <Text style={{color: theme.text}}>{languages.colored_statistics_indicators}</Text>
                        <Switch
                            onValueChange={ () => toggleColorIndicator(
                                dreamColor, setDreamColor,
                                statisticColor, setStatisticColor,
                                route, setDreamColorStatistic,
                                setStatisticColorStatistic,
                                isVisible,setIsVisible)}
                            value={route.name === 'SettingsDream' ? dreamColor : statisticColor}
                        />
                </View>
                { isVisible &&
                    <View style={{...styles.settingStatisticItem, backgroundColor: theme.navigator}}>
                    <Text style={{color: theme.text}}>{languages.highlight_above_normal}</Text>
                    <Switch
                        onValueChange={ () => toggleColorIndicatorAbove(
                            dreamColorAbove, setDreamColorAbove,
                            statisticColorAbove, setStatisticColorAbove,
                            route, setDreamColorStatisticAbove,
                            setStatisticColorStatisticAbove)}
                        value={route.name === 'SettingsDream' ? dreamColorAbove : statisticColorAbove}
                    />
                    </View>
                }
                 <View>
                     {_settingsStatisticsTable(languages).map((setting, index) => _renderSettings(setting, index, _handleSettingsUpdateTable, statisticsView, theme))}
                 </View>
                 </>
                
                
            
            }
            </View>
        </ScrollView>
    )
}

export default SettingsStatisticsScreen
