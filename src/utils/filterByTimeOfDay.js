import {calcTotalSleep,totalTime} from "./calcStatistics";

export const filterByTimeOfDay = (dream, type) => {
    const dreamDay = dream.filter( item => item.timeOfDay === type )

    return calcTotalSleep(dreamDay)
}

export const filterByTimeOfDayWeeks = (dreams, type, stage) => {

    const dreamDay = dreams.map(el => ({dream: el.dream.filter( item => item.timeOfDay === type )}))

    return totalTime(dreamDay,stage)
}


