import React from "react";
import {View} from "react-native";
import {Coordinate, TimeLine} from "../../components";

import {styles} from './styles'

const _getTimeLineLeft = (length) => {
    let count = 0;
    let array = new Array(length)

    for(let i = 0; i < length; i++) {

        array[i] = count < 10 ? `0${count}` : `${count}`

        count += 2
    }

    return array
}
const _getTimeLineRight = (length) => {
    let count = 1;
    let array = new Array(length)

    for(let i = 0; i < length; i++) {

        array[i] = count < 10 ? `0${count}` : `${count}`

        count += 2
    }

    return array
}

const _calcOffset = (height = 400) => {
    return height / 24
}

let timeLineLeft = _getTimeLineLeft(12);
let timeLineRight = _getTimeLineRight(12)

const Diagram = ({dreams, weeks, languages}) => {

    // Функция для подчсета единичного отрезка, по формуле height / 24 (часа в сутках)
    const offset = _calcOffset(400);

    return (
        <View style={styles.diagram}>
            <TimeLine offset={offset} timeLine={timeLineLeft}/>
            <Coordinate languages={languages} offset={offset} weeks={weeks} dreams={dreams}/>
            <TimeLine offset={offset} timeLine={timeLineRight}/>
        </View>
    )
}

export default Diagram
