import React from 'react'
import {SettingsGeneralScreen, SettingsStatisticsScreen} from "../../screens";
import {useTopTabNavigator} from "../../hooks/useTopTabNavigator";
import {useSelector} from "react-redux";

const screens = languages => [
    {
        name: 'General',
        component: SettingsGeneralScreen,
        options: {title: `${languages.settings_general}`}
    },
    {
        name: 'SettingsDream',
        component: SettingsStatisticsScreen,
        options: {title: `${languages.dreams}`}
    },
    {
        name: 'View',
        component: SettingsStatisticsScreen,
        options: {title: `${languages.settings_statistics}`}
    },
]

const SettingsTabNavigator = () => {

    const languages = useSelector( ({app}) => app.languages)

    const navigation = useTopTabNavigator(screens(languages))

    return navigation;
}

export default SettingsTabNavigator
