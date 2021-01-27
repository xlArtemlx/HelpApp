import {StyleSheet} from 'react-native'
import {main} from "../../core/colors";

export const styles = StyleSheet.create({
    settingStatisticItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderColor: '#E1E1E1',
        borderStyle: 'solid',
        paddingVertical: 14,
        paddingHorizontal: 15,
        backgroundColor: "#fff",

    },
    settingsDescription: {
        fontSize: 11,
        marginVertical: 8,
        color: "#95a5a6",
        marginLeft: 15
    },
    settingStatisticsContainer: {
        paddingVertical: 20,
        height: '100%'
    },
    settingsSectionTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: main,
        marginLeft: 15
    },
    settingsTimePicker: {
        fontWeight: 'bold',
        color: '#E1E1E1',
    },

    actionSheetIcon: {
        width: 25,
        height: 25,
    }
})
