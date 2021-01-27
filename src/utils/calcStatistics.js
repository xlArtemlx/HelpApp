import {convertDateFromTime} from "./convertFromTime";
import {differenceInMinutes} from "date-fns";
import moment from "moment";

const _toPositive = number => Math.sign(number) === -1 ? number * -1 : number

export const _separateMinutes = (diffMinute, diffHour) => {

    let tempHour = Math.floor(diffMinute / 60)
    let diffMinutes = diffMinute - tempHour * 60
    let diffHours = diffHour + tempHour


    return {
        hours: diffHours,
        minutes: diffMinutes
    }

}

export const getDreamByType = (type, dreams) => {

    return dreams.filter(dream => dream.timeOfDay === type)

}

export const getDreamByTypeWeeks = (type, dreams) => {
  
    return dreams.map(el => ({dream: el.dream.filter( item => item.timeOfDay === type )}))
   
}


export const calcAverage = ({totalMinutes}, dreamCount) => {

    let avg = 0
    if (totalMinutes) avg = Math.floor(totalMinutes / dreamCount)

    let avgHour = _separateMinutes(avg, 0).hours
    let avgMinutes = _separateMinutes(avg, 0).minutes

    return {
        minutes: avgMinutes,
        hours: avgHour,
        totalMinutes: avg,
    }
}
export const calcAverageWeeks = ({totalMinutes, dreamCount}) => {

    let avg = 0
    if (totalMinutes) avg = Math.floor(totalMinutes / dreamCount)

    let avgHour = _separateMinutes(avg, 0).hours
    let avgMinutes = _separateMinutes(avg, 0).minutes
    return {
        minutes: avgMinutes,
        hours: avgHour,
    }
}


export const calcWakefulness = (dreams,totalMinutesWakefulness) => {
    let count = dreams.length - 1
    let totalWakefulness = 0
    
    


     if (dreams && dreams.length) {
        dreams.forEach((dream, index) => {
            let num = 0
            if(dream.wakefulness && dream.wakefulness.inMinutes > 0){ num = dream.wakefulness.inMinutes}
            const wakefulness =  num ;
            totalWakefulness += parseInt(wakefulness)
            let currentTime = moment().local().format('L') === moment(dream.dateOfDream).format('L')
        
            
          

            if( index === 0 && dream.started === false && currentTime){
                let now = moment().local().format('HH:mm')
                let total =  (Number(now.split(':')[0]) * 60 + Number(now.split(':')[1])) - (Number(dream.endTime.split(':')[0]) * 60 + Number(dream.endTime.split(':')[1])) 
                totalWakefulness +=parseInt(total)
                
            } else if(typeof dream === 'object' && dream.started && dreams.length > 0 ){
              if(dreams[1]){
                 
                let newEndTime = dreams[1].endTime ?  dreams[1].endTime :'00:00'
                let total = (Number(dream.startTime.split(':')[0]) * 60 + Number(dream.startTime.split(':')[1])) - (Number(newEndTime.split(':')[0]) * 60 + Number(newEndTime.split(':')[1]))
                totalWakefulness +=parseInt(total)
              }
                
            }

            if(totalMinutesWakefulness && currentTime){
                let currentTime = new Date();
                let currentHour = currentTime.getHours();
                currentHour > 9 ? null : totalWakefulness  +=parseInt(totalMinutesWakefulness)
            }
             

        })
    }

   
 
    
 
    return _separateMinutes(_toPositive(totalWakefulness), 0)
}

export const calcWakefulnessAverageDream = (dreams) => {
    let totalWakefulness = 0
    let diffMinute = 0
    let diffHours = 0
   

     if (dreams && dreams.length > 0 ) {
        dreams.forEach((dream,index) => {
            let num = 0
            if(dream.wakefulness && dream.wakefulness.inMinutes > 0){ num = dream.wakefulness.inMinutes}
            const wakefulness =  num ;
            totalWakefulness += parseInt(wakefulness)
            let currentTime = moment().local().format('L') === moment(dream.dateOfDream).format('L')

            if( index === 0 && dream.started === false && currentTime && dream.endTime){
                let now = moment().local().format('HH:mm')
                let total =  (Number(now.split(':')[0]) * 60 + Number(now.split(':')[1])) - (Number(dream.endTime.split(':')[0]) * 60 + Number(dream.endTime.split(':')[1])) 
                totalWakefulness +=parseInt(total)
                
            } else if(dreams && dream.started && dreams.length > 0 ){
                if(dreams[1]){
                    let newEndTime = dreams[1].endTime ?  dreams[1].endTime :'00:00'
                    let total = (Number(dream.startTime.split(':')[0]) * 60 + Number(dream.startTime.split(':')[1])) - (Number(newEndTime.split(':')[0]) * 60 + Number(newEndTime.split(':')[1]))
                    totalWakefulness +=parseInt(total)
                }
            }
        })
        let tempHour = Math.floor(totalWakefulness/ 60)
        diffMinute = totalWakefulness - tempHour * 60
        diffHours = 0 + tempHour
    }

 
    return {
        minutes: diffMinute,
        hours: diffHours,
        totalMinutes:totalWakefulness
    }
}


export const calcWakefulnessAverage = (dreams) => {

    let arr = []
    let avgMass = []

     if (dreams && dreams.length) {
        dreams.forEach(el =>{
            let nums = 0
            el.dream.forEach(dream => {
                let wakefulness = dream.wakefulness && _toPositive(dream.wakefulness.inMinutes);             
                arr.push(_toPositive(wakefulness))
                nums += _toPositive(wakefulness)
            })
            let count = Math.floor(nums / el.dream.length)
                avgMass.push(count)
        })
    }


    let myArray = arr.filter(function(x) {
        return x !== undefined && x !== null; 
    });

    const sum = myArray.reduce((partial_sum, a) => partial_sum + a,0); 
    let dreamCount = myArray.length
    let totalMinutes = sum
    let newAvgMass = avgMass.filter(el => isNaN(el) ? false : true  )
    

    return {
        totalMinutes : totalMinutes,
        dreamCount: dreamCount,
        avgMass: newAvgMass,
        minutesMass: myArray,
    }

}


export const timeDifference = (startTime, endTime) => {
    const startDate = convertDateFromTime(startTime)
    const endDate = convertDateFromTime(endTime)
    return differenceInMinutes(endDate, startDate)
}

export const calcTotalSleep = (dream) => {
   
    let diffMinute = 0
    let diffHours = 0
    let totalMinutes = 0
    let newStartTime = '';
    let newEndTime = '';

    dream.length && dream.forEach(item => {
      
        if (item.startTime && item.endTime) {

            newStartTime = item.startTime;
            newEndTime = item.endTime;

            if (item.startTime > item.endTime) {
                const start = item.startTime.split(':');
                const startHours = +start[0] - 12;
                newStartTime = startHours + ':' + start[1];


                const end = item.endTime.split(':');
                const endHours = +end[0] + 12;
                newEndTime = endHours + ':' + end[1];
            }

            diffMinute += _toPositive(timeDifference(newStartTime, newEndTime))
            totalMinutes += _toPositive(timeDifference(newStartTime, newEndTime))

            if(diffMinute > 60) {
                diffHours = _separateMinutes(diffMinute, diffHours).hours
                diffMinute = _separateMinutes(diffMinute, diffHours).minutes
            }

        } else if (item.startTime) {

            newStartTime = item.startTime;
            newEndTime = moment().local().format('LT');

            if (item.startTime > item.endTime) {
                const start = item.startTime.split(':');
                const startHours = +start[0] - 12;
                newStartTime = startHours + ':' + start[1];


                const end = item.endTime.split(':');
                const endHours = +end[0] + 12;
                newEndTime = endHours + ':' + end[1];
            }

            diffMinute += _toPositive(timeDifference(newStartTime, newEndTime))
            totalMinutes += _toPositive(timeDifference(newStartTime, newEndTime))

            if(diffMinute > 60) {
                diffHours = _separateMinutes(diffMinute, diffHours).hours
                diffMinute = _separateMinutes(diffMinute, diffHours).minutes
            }

        }
    })
 

    return {
        minutes: diffMinute,
        hours: diffHours,
        totalMinutes
    }
}




export const calcMediana = ({minutesMass, avgMass},type) => {
 
 
    let avg = 0;
    let mass = type === 'average' ?  avgMass :  minutesMass;
    let avgHour = 0;
    let avgMinutes = 0 ;

    if(mass.length > 0 ){
        
        let arrayHalf = mass.length / 2
        let sorted = [].concat(mass).sort((a,b) => a - b)
        avg = mass.length % 2 === 0 ? (sorted[arrayHalf] + sorted[arrayHalf + 1]) / 2 : sorted[~~(arrayHalf)]

       isNaN(avg)&&avgMass=== true ? avg = avgMass.reduce((a, b) => (a + b)) / avgMass.length: avg
        

         avgHour = _separateMinutes(avg, 0).hours
        avgMinutes = _separateMinutes(avg, 0).minutes
    }
     
 

    return {
        minutes: Math.floor(avgMinutes),
        hours: Math.floor(avgHour)
    }
}




export const countAverage = (dreams, type) => {
   
    const count = [0]
    let average = 0

    if(type === 'average'){

        dreams.forEach(el => count.push(el.dream.length))
        average = count.reduce((a, b) => (a + b)) / count.length
         
    } else if (type === 'mediana'){
        dreams.forEach(el => count.push(el.dream.length))

        let arrayHalf = count.length / 2
        let sorted = [].concat(count).sort((a,b) => a - b)
        
        average = count.length % 2 === 0
        ? (sorted[arrayHalf] + sorted[arrayHalf + 1]) / 2
        : sorted[~~(arrayHalf)]
        
    } 

    
  return Math.floor(average)
    
}



export const totalTime = (dreams = 0) => {


    let diffMinute = 0
    let diffHours = 0
    let totalMinutes = 0
    let newStartTime = '';
    let newEndTime = '';
    let totalMinutesMass = [];
    let countDream = [];
    let avgMass = [];

  
            dreams.length && dreams.forEach(el =>{
                countDream.push(el.dream.length);
                let nums = 0
                el.dream.forEach(item => {
                    if (item.startTime && item.endTime) {
            
                        newStartTime = item.startTime;
                        newEndTime = item.endTime;
            
                        if (item.startTime > item.endTime) {
                            const start = item.startTime.split(':');
                            const startHours = +start[0] - 12;
                            newStartTime = startHours + ':' + start[1];
            
            
                            const end = item.endTime.split(':');
                            const endHours = +end[0] + 12;
                            newEndTime = endHours + ':' + end[1];
                        }
            
                        diffMinute += _toPositive(timeDifference(newStartTime, newEndTime))
                        totalMinutes += _toPositive(timeDifference(newStartTime, newEndTime))
                        totalMinutesMass.push(_toPositive(timeDifference(newStartTime, newEndTime)))
                        nums +=  _toPositive(timeDifference(newStartTime, newEndTime))
            
                        if(diffMinute > 60) {
                            diffHours = _separateMinutes(diffMinute, diffHours).hours
                            diffMinute = _separateMinutes(diffMinute, diffHours).minutes
                        }
            
                    }
                })
                let count = Math.floor(nums / el.dream.length)
                avgMass.push(count)
               });
       

    const newCountDream = countDream.filter(el => el !== 0 ) 
    const newAvgMass = avgMass.filter(el => isNaN(el) ? false : true  )


    return {
        minutes: diffMinute,
        hours: diffHours,
        totalMinutes,
        minutesMass: totalMinutesMass,
        dreamCount: newCountDream.length,
        avgMass: newAvgMass,
    }


}

export const calcAvgforAverage = ({avgMass}) =>  {
    let dreamCount;
    if(avgMass) dreamCount = avgMass.length 

    let avg = 0
    let avgHour = 0
    let avgMinutes = 0
    if(avgMass.length > 0){
        avg = avgMass.reduce((a, b) => (a + b)) / dreamCount;
        avgHour = _separateMinutes(avg, 0).hours
        avgMinutes = Math.floor(_separateMinutes(avg, 0).minutes)
    }

    return {
        minutes: avgMinutes,
        hours: avgHour,
    }
    

}

export const createAverageArrays = (dreams,dreamsTwoWeeks,dreamsThreeWeeks,dreamsMonth,type) => {

    return {
        averageWeeks: [type === 'average' ? calcAvgforAverage(totalTime(dreams)):calcAverageWeeks(totalTime(dreams)), calcMediana(totalTime(dreams),type)],
        averageTwoWeeks: [ type === 'average' ? calcAvgforAverage(totalTime(dreamsTwoWeeks)):calcAverageWeeks(totalTime(dreamsTwoWeeks)),calcMediana(totalTime(dreamsTwoWeeks),type) ],
        averageThreeWeeks: [ type === 'average' ? calcAvgforAverage(totalTime(dreamsThreeWeeks)):calcAverageWeeks(totalTime(dreamsThreeWeeks)),calcMediana(totalTime(dreamsThreeWeeks),type)],
        averageMonth: [ type === 'average' ? calcAvgforAverage(totalTime(dreamsMonth)):calcAverageWeeks(totalTime(dreamsMonth)),calcMediana(totalTime(dreamsMonth),type)]
    }

}

export const createAvgArrayWakefulness = (dreams,dreamsTwoWeeks,dreamsThreeWeeks,dreamsMonth,type) => {
    return {
        averageWeeks:[type === 'average' ? calcAvgforAverage(calcWakefulnessAverage(dreams)):calcAverageWeeks(calcWakefulnessAverage(dreams)), calcMediana(calcWakefulnessAverage(dreams),type)],
        averageTwoWeeks:[type === 'average' ? calcAvgforAverage(calcWakefulnessAverage(dreamsTwoWeeks)):calcAverageWeeks(calcWakefulnessAverage(dreamsTwoWeeks)), calcMediana(calcWakefulnessAverage(dreamsTwoWeeks),type)],
        averageThreeWeeks:[type === 'average' ? calcAvgforAverage(calcWakefulnessAverage(dreamsThreeWeeks)):calcAverageWeeks(calcWakefulnessAverage(dreamsThreeWeeks)), calcMediana(calcWakefulnessAverage(dreamsThreeWeeks),type)],
        averageMonth:[type === 'average' ? calcAvgforAverage(calcWakefulnessAverage(dreamsMonth)):calcAverageWeeks(calcWakefulnessAverage(dreamsMonth)), calcMediana(calcWakefulnessAverage(dreamsMonth),type)],
    }
}

export const createAvgCountDream = (dreams,dreamsTwoWeeks,dreamsThreeWeeks,dreamsMonth,type) => {

    return {

        averageWeeks: [countAverage(dreams,'average'),countAverage(dreams,'mediana')],
        averageTwoWeeks: [countAverage(dreamsTwoWeeks,'average'),countAverage(dreamsTwoWeeks,'mediana')],
        averageThreeWeeks: [countAverage(dreamsThreeWeeks,'average'),countAverage(dreamsThreeWeeks,'mediana')],
        averageMonth: [countAverage(dreamsMonth,'average'),countAverage(dreamsMonth,'mediana')],

    }
 
}



