import React, {useState} from "react";
import {View, TouchableOpacity, Text,  Dimensions} from "react-native";

import {timeDifference} from "../../utils/calcStatistics";
import Modal from 'react-native-modal';
import {Label} from "../index";

import {styles} from "./styles";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height

const _dreamStyle = ({startPoint, height, offset, timeOfDay}) => {
    return {
        ...styles.dreamDiagram,
        top: startPoint * offset,
        height: height ? height : 1,
        backgroundColor: timeOfDay === 'day' ? "#FF8500" : "#33006D"
    }
}

const _getDataForRender = (dream, offset) => {
    const startPoint = dream.startTime.split(':')[0]
    const endPoint = dream.endTime.split(':')[0]
    const diff = timeDifference(dream.startTime, dream.endTime) * offset

    const height = diff > 60 ? diff / 60 : diff

    return {
        startPoint: parseInt(startPoint),
        endPoint: parseInt(endPoint),
        height
    }
}

const _renderDay = (dreams, offset, languages) => {
    return dreams.map((dream, index) => {
        const {startPoint, height} = _getDataForRender(dream, offset)
        const [visible, setVisible] = useState(false)
        return (

            <View key={index}>
                <TouchableOpacity
                    style={_dreamStyle({startPoint, height, offset, timeOfDay: dream.timeOfDay})}
                    onPress={() => setVisible(!visible)}
                />

                {visible && <Modal
                    isVisible={visible}
                    onBackdropPress={() => setVisible(false)}
                    hideModalContentWhileAnimating
                    backdropOpacity={0.40}
                    style={styles.modalContainer}
                >
                    <View style={{
                        ...styles.modalContent,
                        width: deviceWidth,
                        height: deviceHeight / 6
                    }}>
                        <Text style={styles.modalDate}>{dream.startDate}</Text>
                        <Text style={styles.modalSleepTime}>{dream.timeOfDay === 'day' ? `${languages.day_sleep}: ` : `${languages.night_sleep}: `}{dream.startTime} - {dream.endTime}</Text>
                        <View style={styles.placeContainer}><Label style={{padding: 10}} focused place={dream.place} /></View>
                    </View>
                </Modal>}
            </View>
        )
    })


    // return renderDreams
}

const CoordinateColumn = ({dreams, offset, languages}) => {
    return (
        <View style={styles.column}>
            {_renderDay(dreams, offset, languages)}
        </View>
    )
}

export default CoordinateColumn
