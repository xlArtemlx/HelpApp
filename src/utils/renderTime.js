import {timeWithWords} from "./minutesWithWords";

export const renderTime = (time, languages, br = ' ', isStatisticsScreen = false) => {

    const {minutes, hours} = time

    if(isStatisticsScreen) {
        if(hours > 0 || minutes > 0) return `${timeWithWords(languages, hours, 'hours', '\n')} ${hours > 0 ? '\n' : ''}${timeWithWords(languages, minutes, 'minutes', '\n')}`
        else return ''
    }

    let timeHour = '00'
    let timeMinutes = '00'

    if (hours || minutes) {
        timeHour = (hours >= 10)
            ? `${hours}`
            : `0${hours}`
        timeMinutes = (minutes >= 10)
            ? `${minutes}`
            : `0${minutes}`
    }

    return `${timeHour ? timeHour : ''}:${timeMinutes ? timeMinutes : ''}`

}



