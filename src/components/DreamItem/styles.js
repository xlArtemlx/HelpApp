import {StyleSheet} from 'react-native'

export const styles = StyleSheet.create({
    dream: {
        marginVertical: 3,
        padding: 8,
        borderStyle: 'solid',
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingRight: 50
    },
    timeBlock: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 20,
        borderStyle: 'solid',
        borderRightWidth: 1,
        paddingRight: 10,
        borderColor: '#E1E1E1'
    },
    distanceBlock: {
        marginBottom: 5
    },
    distanceText: {
        fontWeight: 'bold',
        fontSize: 17
    },
    placeBlock: {
        alignItems: 'flex-start',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },

    commentBlock: {
        width: '90%',
        marginTop: 5
    },

    commentBlockText: {
      color: '#919191'
    },

    timeIcon: {
        width: 24,
        height: 24,
        marginVertical: 5
    },
    wakefulnessText: {
        marginVertical: 5,
        marginLeft: 10
    },
    wakefulnessValue: {
        fontWeight: 'bold',
    },
})
