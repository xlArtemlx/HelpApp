import React from "react";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";

import {main, accent, mock_header} from '../core/colors'

const {Navigator, Screen} = createMaterialTopTabNavigator();

export const useTopTabNavigator = (screens, tabBarOptions, initRoute) => {
    return (
        <Navigator
            initialRouteName={initRoute || screens[0].name}
            tabBarPosition='top'
            tabBarOptions={tabBarOptions ||{
                activeTintColor: '#fff',
                indicatorStyle: {backgroundColor: accent, height: 4},
                labelStyle: { fontSize: 12, fontWeight: 'bold'},
                style: { backgroundColor: main },
            }}
        >
            {
                screens.map( (screen, index) => {
                    if(typeof screen.component === 'function'){
                        return <Screen
                            key={index}
                            name={screen.name}
                            options={screen.options}
                        >{screen.component}</Screen>
                    }

                    return <Screen
                        key={index}
                        name={screen.name}
                        component={screen.component}
                        options={screen.options}
                    />
                })
            }
        </Navigator>
    )
}
