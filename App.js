import React, {useState, useEffect} from 'react';
import {Provider} from 'react-redux';
import store from "./src/redux/store/store";
import * as Font from 'expo-font';
import {AppLoading} from 'expo';


import {ActionSheetProvider} from '@expo/react-native-action-sheet'


import {LaunchScreen} from "./src/screens";

export default function App() {
    console.disableYellowBox = true
    const [loading, setLoading] = useState(false);

 

    useEffect(() => {
        async function loadFonts() {
            await Font.loadAsync({
                Roboto: require('native-base/Fonts/Roboto.ttf'),
                Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
            });
        }

        loadFonts().then(() => setLoading(true))
    });

    useEffect(() => {
        async function loadFonts() {
            await Font.loadAsync({
                Roboto: require('native-base/Fonts/Roboto.ttf'),
                Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
            });
        }

        loadFonts().then(() => setLoading(true))
    });

    if (loading) {
        return (
            <Provider store={store}>
                <ActionSheetProvider>
                    <LaunchScreen/>
                </ActionSheetProvider>
            </Provider>
        );
    }
    return <AppLoading/>;
}
