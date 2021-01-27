import {Text, TouchableOpacity, StyleSheet, View} from "react-native";
import * as React from "react";
import {DateNumber} from "../сomponents";
import {DateTime} from "luxon";
import { useRoute, useNavigation } from "@react-navigation/native";

export const ScreenWithDreams = ({route, navigation}) => {

    const {params} = useRoute()
    const {navigate} = useNavigation()

    const {date, startTime, setEndTime} = params
    const endTime = DateTime.local().toFormat('hh:mm')

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('Calendar')}>
                <DateNumber date={date}/>
            </TouchableOpacity>

            <Text>{startTime}</Text>

            <TouchableOpacity
                onPress={() => {setEndTime(true);
                navigate('Home', {endTime})}}
            >
                <Text>ЗАВЕРШИТЬ СОН</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 30,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
})
