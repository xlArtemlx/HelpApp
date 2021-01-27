import {StyleSheet} from 'react-native'

export const styles = StyleSheet.create({
    childContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    childItem: {
        paddingVertical: 10,
        backgroundColor: '#fff',
        borderColor: '#DFDFDF',
        borderBottomWidth: 1,
        borderStyle: 'solid'
    },
    childImage: {
        width: 32,
        height: 32,
        marginRight: 20
    },
    childNameText: {
        fontSize: 18,
        marginRight: 10
    },
    childBirthdayText: {
        fontSize: 14,
    },
    checkIcon: {
        flex: 1,
        flexDirection: "row",
        justifyContent: 'flex-end'
    }
})
