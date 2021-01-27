import {StyleSheet} from 'react-native'

export const styles = StyleSheet.create({
    date: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        paddingVertical: 8,
        paddingHorizontal: 20
    },
    textDate:{
        alignItems: 'center'
    },
    textDay: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
    },
    arrowIcon: {
        width: 24,
        height: 24,
    },
    iconCalendar: {
        width: 24,
        height: 24,
        marginRight: 30
    },
    buttonsRight: {
        justifyContent: 'center',
        flexDirection: 'row',
    }
})
