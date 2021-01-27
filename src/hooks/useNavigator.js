import React from "react";
import {Text} from "native-base";
import {createStackNavigator} from "@react-navigation/stack";

import {main} from '../core/colors'

const {Navigator, Screen} = createStackNavigator();

export const useNavigator = (screens, headerTitle, screenOptions) => {
    return (
        <Navigator
            screenOptions={{
                headerTitle: () => <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 18}}>{headerTitle || ''}</Text>,
                headerStyle: {
                    backgroundColor: main,
                    elevation: 0
                },
                headerTintColor: '#fff'
            }}
        >
            {
                screens.map( (screen, index) => (
                    <Screen
                        key={index}
                        name={screen.name}
                        component={screen.component}
                        options={screen.options}
                    />
                ) )
            }
        </Navigator>
    )
}
