import React, {useState} from "react";
import {createStackNavigator} from "@react-navigation/stack";
import {Statistics} from "../../screens";
import {TouchableOpacity, Text} from "react-native";
import {useSelector} from "react-redux";
import {mock_header} from "../../core/colors";

const {Navigator, Screen} = createStackNavigator();

export const StatisticsNavigation = () => {
    const languages = useSelector( ({app}) => app.languages);
    const theme = useSelector( ({app}) => app.activeTheme);

    const [tableMode, setTableMode] = useState(true)

    return (
        <Navigator
            screenOptions={{
                headerTitle: () => <Text style={{fontSize: 18, color: theme.text}}>{languages.statistics}</Text>,
                headerRight: () => (
                    <TouchableOpacity style={{marginRight: 20}} onPress={() => setTableMode(!tableMode)}>
                        <Text style={{color: theme.text, fontWeight: 'bold', textTransform: 'uppercase'}}>{
                            tableMode ? languages.diagram : languages.table
                        }</Text>
                    </TouchableOpacity>
                ),
                headerStyle: {
                    backgroundColor: theme.navigator
                }
            }}
        >
            <Screen name="Statistics" >
                {
                    props => <Statistics {...props} tableMode={tableMode}/>
                }
            </Screen>
        </Navigator>
    );
}
