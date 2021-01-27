import {StyleSheet} from 'react-native'
import {accent, main} from "../../core/colors";

export const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        backgroundColor: '#F4F0F8'
    },
    heading: {
        fontSize: 14,
        fontWeight: 'bold',
        marginVertical: 10,
        color: main
    },
    timeItem: {
        marginHorizontal: 30
    },
    times: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginTop: 5,
        marginBottom: 15
    },
    placesBlock: {
        marginVertical: 10
    },
    places: {
        flexDirection: 'row',
    },
    timeOfDayLabel: {
        textAlign: 'center',
        paddingVertical: 8,
        paddingHorizontal: 25,
        marginRight: 5,
        fontSize: 15,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    label: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 7,
        borderRadius: 3,
        marginRight: 5,
    },
    labelFocused: {
        backgroundColor: accent
    },
    isDreamFinish: {
        marginTop: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    sectionDirectory: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    countFeedingContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    counterFeeding: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    counterButton: {
        padding: 3,
        borderRadius: 2,
        backgroundColor: '#fff'
    },
    counterText: {
        fontWeight: 'bold',
        fontSize: 17,
        marginHorizontal: 7
    },
    buttonText: {
        color: main,
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },

    errorContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: '#ff0045',
        padding: 5,
        marginTop: 10,
        borderRadius: 5
    },

    errorText: {
        color: '#fff'
    },

    errorImage: {
        backgroundColor: '#fff',
        borderRadius: 50,
        padding: 3
    },

    errorContainerText: {
        marginHorizontal: 8
    }
})
