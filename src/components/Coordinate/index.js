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
                const dreamStartDate = dream.startDate;
                const dreamEndDate = dream.endDate;
                const weekDay = moment(day).format('DD MMM') //DateTime.fromJSDate(day).toLocaleString(DateTime.DATE_MED)
                return ( weekDay === dreamStartDate || weekDay === dreamEndDate) 
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
                    weeks.map((day, index) => <CoordinateColumn languages={languages} key={index} offset={offset} dreams={_getDreamsByDay(dreams, day)} day={day}/>)
                }
            </View>


        </View>
    )
}

export default Coordinate
