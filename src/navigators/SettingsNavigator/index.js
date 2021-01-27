import React from "react";

import {AboutAppScreen, AddChildScreen, RecommendationScreen, SettingsScreen, ReservationScreen} from "../../screens";
import {Text, TouchableOpacity, Image, Alert} from "react-native";
import SettingsTabNavigator from "../SettingsTabNavigator";
import {useNavigator} from "../../hooks/useNavigator";
import DirectoryTabNavigator from "../DirectoryTabNavigator";
import {useSelector} from "react-redux";

const _createAlert = languages => Alert.alert(
    languages.reference,
    languages.reference_text,
    [

        {text: "OK"}
    ],
    {cancelable: true}
)

const screens = languages => [
    {
        name: 'Settings',
        component: SettingsScreen,
        options: {headerTitle: () => <Text style={styles.navTitle}>{languages.settings}</Text>}
    },
    {
        name: 'AddChild',
        component: AddChildScreen,
        options: {headerTitle: () => <Text style={styles.navTitle}>{languages.adding_child}</Text>}
    },
    {
        name: 'Directory',
        component: DirectoryTabNavigator,
        options: {headerTitle: () => <Text style={styles.navTitle}>{languages.ref_book}</Text>}
    },
    {
        name: 'Recommendations',
        component: RecommendationScreen,
        options: {
            headerTitle: () => <Text style={styles.navTitle}>{languages.recommendation}</Text>,
            headerRight: () => (
                <TouchableOpacity onPress={() => _createAlert(languages)} style={{marginRight: 10}}>
                    <Image source={require('../../images/icons/ic_help.png')}
                           style={{tintColor: '#fff', width: 24, height: 24}}/>
                </TouchableOpacity>
            )
        }
    },
    {
        name: 'SettingsView',
        component: SettingsTabNavigator,
        options: {headerTitle: () => <Text style={styles.navTitle}>{languages.settings}</Text>}
    },

    {
        name: 'Reservation',
        component: ReservationScreen,
        options: {headerTitle: () => <Text style={styles.navTitle}>{languages.reservation}</Text>}
    },

    {
        name: 'AboutApp',
        component: AboutAppScreen,
        options: {headerTitle: () => <Text style={styles.navTitle}>{languages.about_app}</Text>}
    },
]

export const SettingsNavigator = () => {

    const languages = useSelector(({app}) => app.languages)
    const navigator = useNavigator(screens(languages))

    return navigator
}

const styles = {
    navTitle: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18
    }
}
