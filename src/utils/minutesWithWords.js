export const timeWithWords = (languages, time, type, br = ' ') => {

    const sTime = time.toString()
   
    if(sTime.startsWith('0') && sTime.endsWith('0')) return ''

    if(sTime.endsWith('1')) return `${time}${br}${languages[type][0]}`
    else if(sTime.endsWith('10') || sTime.endsWith('11') || sTime.endsWith('12') || sTime.endsWith('13') || sTime.endsWith('14') || sTime.endsWith('15') || sTime.endsWith('16') || sTime.endsWith('17') || sTime.endsWith('18') || sTime.endsWith('19') || sTime.endsWith('20')) return `${time}${br}${languages[type][2]}`
    else if(sTime.endsWith('2') || sTime.endsWith('3') || sTime.endsWith('4')) return `${time}${br}${languages[type][1]}`
    else return `${time}${br}${languages[type][2]}`
}

