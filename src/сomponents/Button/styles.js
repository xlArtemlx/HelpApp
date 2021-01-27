import {StyleSheet} from 'react-native'

import {accent} from "../../core/colors";

export const styles = StyleSheet.create({
    button: {
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: accent,
        borderRadius: 7,
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        textTransform: 'uppercase'
    }

})
