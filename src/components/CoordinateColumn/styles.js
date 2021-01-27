import {StyleSheet} from 'react-native'

export const styles = StyleSheet.create({
    column: {
        height: 420,
        width: 40,
        marginHorizontal: 5,
     
        position: 'relative',
        overflow: 'hidden',
        borderColor: "#fff",
        borderWidth: 1
    },
    dreamDiagram: {
        position: 'absolute',
   
        width: 40,
        
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
