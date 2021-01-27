import AsyncStorage from '@react-native-community/async-storage';

const SET_IS_LAUNCHED = 'app/SET_IS_LAUNCHED'
const SET_STATISTICS_VIEW = 'app/SET_STATISTICS_VIEW'
const SET_START_NIGHT_SLEEP = 'app/SET_START_NIGHT_SLEEP'
const SET_END_NIGHT_SLEEP = 'app/SET_END_NIGHT_SLEEP'
const SET_LANGUAGES = 'app/SET_LANGUAGES'
const SET_ACTIVE_LANGUAGE = 'app/SET_ACTIVE_LANGUAGE'
const SET_ACTIVE_THEME = 'app/SET_ACTIVE_THEME'
const SET_ACTIVE_SETTINGS = 'app/SET_ACTIVE_SETTINGS'

import {ru} from '../../translations/ru'
import {en} from '../../translations/en'
import moment from "moment";

let initialState = {
    isLaunched: false,
    statisticsView: [],
    startNightSleep: moment().set('hour', 20).set('minute', 0).format("HH:mm"),
    endNightSleep: moment().set('hour', 6).set('minute', 0).format("HH:mm"),
    languages: ru,
    activeLanguage: '',
    activeTheme: {},
    activeSettings: null,
};

export const appReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_IS_LAUNCHED: {
            return {
                ...state,
                isLaunched: action.isLaunched
            }
        }
        case SET_STATISTICS_VIEW: {
            return {
                ...state,
                statisticsView: action.statisticsView
            }
        }
        case SET_START_NIGHT_SLEEP: {
            return {
                ...state,
                startNightSleep: action.startNightSleep
            }
        }
        case SET_END_NIGHT_SLEEP: {
            return {
                ...state,
                endNightSleep: action.endNightSleep
            }
        }
        case SET_LANGUAGES: {
            return {
                ...state,
                languages: action.languages
            }
        }
        case SET_ACTIVE_LANGUAGE: {
            return {
                ...state,
                activeLanguage: action.activeLanguage
            }
        }
        case  SET_ACTIVE_THEME:
            return {
                ...state,
                activeTheme: action.themeMode
        }
        case  SET_ACTIVE_SETTINGS:
            return {
                ...state,
                activeSettings: action.active
        }
        default:
            return state
    }
}


export const setIsLaunched = isLaunched => ({type: SET_IS_LAUNCHED, isLaunched});
export const setStatisticsView = statisticsView => ({type: SET_STATISTICS_VIEW, statisticsView});
export const setStartNightSleep = startNightSleep => ({type: SET_START_NIGHT_SLEEP, startNightSleep});
export const setEndNightSleep = endNightSleep => ({type: SET_END_NIGHT_SLEEP, endNightSleep});
export const setLanguages = languages => ({type: SET_LANGUAGES, languages});
export const setActiveLanguages = activeLanguage => ({type: SET_ACTIVE_LANGUAGE, activeLanguage});
export const setActiveTheme = themeMode => ({type: SET_ACTIVE_THEME, themeMode});
export const setActiveSettings = active => ({type: SET_ACTIVE_SETTINGS, active});

export const setActiveLanguageTC = language => async dispatch => {

    await AsyncStorage.setItem('@active_language', language)

    dispatch(setActiveLanguages(language))
    moment.locale(language)
    dispatch(setLanguagesTC())
}

export const setLanguagesTC = () => async (dispatch) => {

    const activeLanguage = await AsyncStorage.getItem('@active_language')
    dispatch(setActiveLanguages(activeLanguage))
    switch (activeLanguage) {
        case 'ru':
            dispatch(setLanguages(ru))
            break
        case 'en':
            dispatch(setLanguages(en))
            break
        default:
            dispatch(setLanguages(ru))
    }
}

export const setLaunchTC = () => async dispatch => {

    const appLaunched = await AsyncStorage.getItem('@appLaunched_key')
    const children = await AsyncStorage.getItem('@children')

    if(!appLaunched && children) {
        await AsyncStorage.setItem('@appLaunched_key', 'true')
        dispatch(setIsLaunched(true))
    }

    dispatch(setIsLaunched(!!appLaunched))

}
export const setActiveSettingsTC = (name) => async dispatch => {
            dispatch(setActiveSettings(name))
}
export const setStatisticsViewTC = statisticsView => async dispatch => {

    // await AsyncStorage.removeItem('@statisticsView')

    const storageStatisticsView = JSON.parse(await AsyncStorage.getItem('@statisticsView'))

    if(!storageStatisticsView) {
        await AsyncStorage.setItem('@statisticsView', JSON.stringify([statisticsView]))
    }else {
        const isExist = !!storageStatisticsView.find( ({value}) => value === statisticsView.value )
        if(isExist) {
            const updatedSettings = storageStatisticsView.filter( ({value}) => value !== statisticsView.value )
            await AsyncStorage.setItem('@statisticsView', JSON.stringify(updatedSettings))
        }else{
            await AsyncStorage.setItem('@statisticsView', JSON.stringify(storageStatisticsView.concat(statisticsView)))
        }
    }

    dispatch(setStatisticsView(JSON.parse(await AsyncStorage.getItem('@statisticsView'))) || [])


}
export const setNightTimeTC = (type, time) => async (dispatch, getState) => {

    // await AsyncStorage.removeItem(`@${type}NightSleep`)
    const t = time ? time : type === 'start' ? getState().app.startNightSleep : getState().app.endNightSleep

    await AsyncStorage.setItem(`@${type}NightSleep`, JSON.stringify(t))

    type === 'start'
        ? dispatch(setStartNightSleep(t))
        : dispatch(setEndNightSleep(t))

}
export const getNightTimeTC = (type) => async dispatch => {

    const nightTime = JSON.parse(await AsyncStorage.getItem(`@${type}NightSleep`))

    type === 'start'
        ? dispatch(setStartNightSleep(nightTime))
        : dispatch(setEndNightSleep(nightTime))


}
export const getStatisticsViewTC = () => async dispatch => {

    const storageStatisticsView = await AsyncStorage.getItem('@statisticsView')

    dispatch(setStatisticsView(JSON.parse(storageStatisticsView) || []))
}

export const setTheme = (mode) => async (dispatch) => {
    await AsyncStorage.setItem(`@themeMode`, JSON.stringify(mode));
    const colorTheme = JSON.parse(await AsyncStorage.getItem('@themeMode'));
    dispatch(setActiveTheme(colorTheme));
};