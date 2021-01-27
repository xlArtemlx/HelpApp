import {StyleSheet} from 'react-native'

import {main} from "../../core/colors";

export const styles = StyleSheet.create({
    placeLabel: {
        // fontSize: 14,
        fontWeight: 'bold',
        color: "#000",
        borderRadius: 4,
        backgroundColor: '#fff',
    },
    focused: {
        backgroundColor: main,
        color: '#fff'
    }
})
