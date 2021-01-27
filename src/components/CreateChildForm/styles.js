import {StyleSheet} from 'react-native'
import {main} from "../../core/colors";

export const styles = StyleSheet.create({
    createChildForm: {
        marginVertical: 20,
    },
    formInputText: {
        color: '#bdbdbd',
        marginLeft: 12,
        fontSize: 11,
        fontWeight: 'bold'
    },
    inputContainerFocused: {
        borderColor: main
    },
    formInput: {
        fontSize: 18,
        textAlign: 'left',
        paddingVertical: 5,
        paddingHorizontal: 12,
    },
    inputContainer: {
        paddingVertical: 5,
        marginVertical: 10,
        borderColor: '#979698',
        borderBottomWidth: 2,
        backgroundColor: '#fff',
        borderRadius: 5

    },
    gendersContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        marginTop: 10
    },
    genderButton: {
        paddingHorizontal: 20,
        paddingVertical: 8,
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 3,
        width: 150
    },
    genderButtonActive: {
        backgroundColor: main,
    },
    genderButtonText: {
        color: '#fff'
    },
    genderIcon: {
        width: 20,
        height: 20,
    },
    genderFocus: {
        tintColor: '#fff'
    },
    genderUnFocus: {
        tintColor: '#000'
    },

    datePickerShow: {
        width: '100%',
        height: 20,
        margin: 10
    },

    datePickerShowText: {
        fontSize: 18
    }

})
