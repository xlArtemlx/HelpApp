import {View} from "react-native";
import React from "react";

import {CoordinateColumn} from "../index";

import {styles} from "./styles";
import moment from "moment";


//Функция для получения снов по дню, для отрисовки в конкретной колонке
const _getDreamsByDay = (dreams, day) => {

    const filteredDreams = []

    dreams.forEach(dream => {
        filteredDreams.push(...dream.dream.filter((dream) => {
                const dreamStartDate = dream.startDate
                const weekDay = moment(day).format('MMM DD YYYY') //DateTime.fromJSDate(day).toLocaleString(DateTime.DATE_MED)
                return dreamStartDate === weekDay
            })
        )
    })

    return filteredDreams
}

const Coordinate = ({dreams, weeks, offset, languages}) => {
    return (
        <View>

            <View style={styles.columnsContainer}>
                {
                    weeks.map((day, index) => <CoordinateColumn languages={languages} key={index} offset={offset} dreams={_getDreamsByDay(dreams, day)}/>)
                }
            </View>


        </View>
    )
}

export default Coordinate
