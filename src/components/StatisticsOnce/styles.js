import {StyleSheet} from 'react-native'

export const styles = StyleSheet.create({
    statisticsOnce: {
        maxHeight: 200,
        backgroundColor: '#fff',
    },
    statisticsOnceTextList: {
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderStyle: 'solid',
        borderColor: "#F5F5F5",
        borderBottomWidth: 1,
    },
    statisticsOnceTextBox :{
        
    },
    statisticsOnceFirst: {
        marginLeft: 8,
        marginRight: 8,
        paddingVertical: 8,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    statisticsOnceItemLine: {
        borderRadius: 10,
        margin: 5,
    },
    statisticsOnceItemBox: {
        paddingHorizontal: 15,
        borderRadius: 3,
        height: 70,
        width: 170,
        margin: 3,
    },

    timesContainer: {
        borderRadius: 3,
        padding: 3,
    },
    statisticsOnceSecond: {
        flex:1,
    },
    modalContainer:{
        justifyContent: 'flex-end',
        alignItems: 'center',
        margin: 0,
    },

    column: {
        height: 420,
        width: 35,
        marginHorizontal: 5,
        backgroundColor: "#fff",
        position: 'relative',
        overflow: 'hidden'
    },
    dreamDiagram: {
        position: 'absolute',
        marginVertical: 10,
        width: 35,
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
