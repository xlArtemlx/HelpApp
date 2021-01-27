import React from "react";
import {View} from "react-native";
import {DayItem} from "../index";

import {styles} from './styles'

const DaysOfWeek = ({days, padding, theme}) => {
    return (
        <View style={styles.days}>
            {
                days && days.map( (day, index) => {
                    return <DayItem padding={padding} key={index} day={day} theme={theme}/>
                } )
            }
        </View>
    )
}

export default DaysOfWeek
