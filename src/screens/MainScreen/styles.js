import {StyleSheet} from 'react-native'
import React from "react";
import {main, accent} from "../../core/colors";

export const styles = StyleSheet.create({
    main: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#F4F0F8'
    },
    button: {
        backgroundColor: '#e91e63',
        marginBottom: 10
    },
    buttonBlock: {
        flexDirection: 'row',
        marginHorizontal: 20,
        marginBottom: 15,
        alignItems: 'center'
    },
    statisticsText: {
        marginLeft: 15,
        marginVertical: 7,
        fontWeight: 'bold',
        color: main
    },

    statisticsIcons: {
        marginRight: 15,
        marginVertical: 7,
        fontWeight: 'bold',
        color: main
    },

    changeChildBtn: {
        flex: 0.5,
        marginRight: 5,
        backgroundColor: main,
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff',
        borderRadius: 10,
        height: 40,
        top: 10
    },

    changeChildBtnText: {
        color: '#fff',
        textAlign: 'center'
    },

    startOrEndSleepBtn: {
        flex: 2
    },

    modalContainer: {
        alignItems: 'center'
    },

    listOfChildrenContainer: {
        paddingHorizontal: 40,
        paddingVertical: 20,
        width: '90%',
        backgroundColor: '#fff'
    },

    childName: {
        margin: 10
    },

    childNameText: {
        fontSize: 18
    },

    headerText: {
        fontSize: 20,
        fontWeight: 'bold'
    }
})
