import React from "react";

import {TabsNavigator} from "../../navigators/TabsNavigator";
import {NavigationContainer} from "@react-navigation/native";


import {CreateChild} from "../../screens";


const LaunchScreen = ({isLaunched, setLaunchTC}) => {
    return (
        <NavigationContainer>
            {
                isLaunched
                    ? <TabsNavigator />
                    : <CreateChild setLaunchTC={setLaunchTC}/>
            }

        </NavigationContainer>
    )
}

export default LaunchScreen
