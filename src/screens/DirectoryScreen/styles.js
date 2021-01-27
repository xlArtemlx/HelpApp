import {StyleSheet} from 'react-native'
import {main} from "../../core/colors";

export const styles = StyleSheet.create({
    directoryContainer: {
        backgroundColor: '#F4F0F8',
        paddingTop: 20,
        height: '100%'
    },
    formHeading:{
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10
    },
    createInfoButton: {
        marginHorizontal: 10
    },
    modalContent: {
        borderRadius: 3,
        backgroundColor: '#fff',
        padding: 15
    },
    modalContainer: {
        marginHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 0,
    },
    buttonText: {
        color: main,
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
    inputStyle: {
        paddingHorizontal: 3,
        paddingVertical: 10,
        borderStyle: 'solid',
        borderBottomWidth: 2,
        borderColor: '#1994B1',
        borderRadius: 3,
        marginBottom: 10
    },
    topLine: {
        flexDirection: 'row-reverse',
        alignItems: 'center'
    },

})
