import {StyleSheet} from 'react-native'

export const styles = StyleSheet.create({
    columnsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    column: {
        height: 600,
        width: 40,
        marginHorizontal: 5,
        backgroundColor: "#ecf0f1",
        position: 'relative'
    },
    dreamDiagram: {
        position: 'absolute',
        marginVertical: 10,
        // left: 0,
        // right: 0,
        width: 40,
        backgroundColor: '#000'
    }
})
