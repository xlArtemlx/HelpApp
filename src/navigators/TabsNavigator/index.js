import React,{useState} from "react";
import {Image} from 'react-native'
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";

//Navigators
import {HomeNavigator} from '../HomeNavigator'
import {StatisticsNavigation} from "../StatisticsNavigation";

//Screens
import {SettingsNavigator} from "../SettingsNavigator";
import {useSelector} from "react-redux";


const {Navigator, Screen} = createBottomTabNavigator();

export const TabsNavigator = () => {

    const languages = useSelector( ({app}) => app.languages);
    const theme = useSelector( ({app}) => app.activeTheme);
     const active = useSelector( ({app}) => app.activeSettings);


    const[visible,setVisible] = useState('')
 

    const bottomTab = () => {
        if(active === 'View' || active === 'SettingsView'
        || active === 'Reservation' || active === 'Recommendations'
        || active === 'Directory' || active === 'AboutApp') {
            return false
        } else {
            return true
        }
    }


  

    return (
        <Navigator
            initialRouteName="Feed"
            tabBarOptions={{
                activeTintColor: '#255F92',
                tabBarIcon: {opacity: 1},
                tabStyle: {
                    backgroundColor: theme.navigator,
                    top: -1,
                    borderTopWidth: 1,
                    borderColor: theme.borderColor
                },
                labelStyle: {
                    marginBottom: 3
                }
            }}
        >
            <Screen
                name="Main"
                component={HomeNavigator}
                options={{
                    tabBarLabel: `${languages.dreams}`,
                    tabBarIcon: ({focused, color, size}) => {

                        let iconStyle = focused ?  styles.tabBarIconFocused :  styles.tabBarIconUnFocused

                        return <Image style={{...styles.tabBarIcon, ...iconStyle}} source={require('../../images/icons/ic_tab_sleep.png')}/>
                    },
                }}
            />
            <Screen
                name="Statistics"
                component={StatisticsNavigation}
                options={{
                    tabBarLabel: `${languages.statistics}`,
                    tabBarIcon: ({focused, color, size}) => {

                        let iconStyle = focused ?  styles.tabBarIconFocused :  styles.tabBarIconUnFocused

                        return <Image style={{...styles.tabBarIcon, ...iconStyle}} source={require('../../images/icons/ic_tab_stats.png')}/>
                    },
                }}
            />
            <Screen
                name="Settings"
                component={SettingsNavigator}
                options={{
                    tabBarVisible: bottomTab(),
                    tabBarLabel: `${languages.settings}`,
                    tabBarIcon: ({focused, color, size}) => {

                        let iconStyle = focused ?  styles.tabBarIconFocused :  styles.tabBarIconUnFocused

                        return <Image style={{...styles.tabBarIcon, ...iconStyle}} source={require('../../images/icons/ic_tab_about.png')}/>
                    },
                }}
            />
        </Navigator>
    );
}

const styles = {
    tabBarIcon: {
        width: 24,
        height: 24,
    },
    tabBarIconFocused:{
        opacity: 1,
        tintColor: '#255F92'
    },
    tabBarIconUnFocused:{
        opacity: 0.5,
        tintColor: '#6d6d74'
    }
};
