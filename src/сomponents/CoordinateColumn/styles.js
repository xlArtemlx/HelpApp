import {StyleSheet} from 'react-native'

export const styles = StyleSheet.create({
    column: {
        height: 600,
        width: 40,
        marginHorizontal: 5,
        backgroundColor: "#fff",
        position: 'relative'
    },
    dreamDiagram: {
        position: 'absolute',
        marginVertical: 10,
        width: 40,
        borderRadius: 3
    },
    modalContainer: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        margin: 0,
    },
    modalContent: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: '#fff',
        padding: 15
    },
    modalDate: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    modalSleepTime: {
        marginVertical: 10
    },
    placeContainer: {
    }
})
