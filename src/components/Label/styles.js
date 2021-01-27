import {StyleSheet} from 'react-native'

import {main, accent} from "../../core/colors";

export const styles = StyleSheet.create({
    placeLabel: {
        // fontSize: 14,
        fontWeight: 'bold',
        color: "#000",
        borderRadius: 4,
        backgroundColor: '#fff',
        margin: 2
    },
    focused: {
        backgroundColor: main,
        color: '#fff'
    },

    tag: {
        backgroundColor: accent,
        color: '#fff'
    }
})
