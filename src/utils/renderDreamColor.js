
export const renderTotalSleepColor = (tag, amountOfDays, totalSleep,countDaySleep,indicatorAbove) => {
    const {hours, minutes} = totalSleep;
    const sleepTime = +hours + +minutes/60;


   

   if (amountOfDays <= 90) {
       // от 0 до 3x месяцев
       if (tag === 'total_sleep' || tag === 'total_sleep_oneday') {
           if (sleepTime >= 15 && sleepTime <= 18) {
               return "#11bf14"
           } else if (sleepTime < 15) {
               return "#F43F34"
           } else if (indicatorAbove && sleepTime > 18) {
            return "#ffbc00"
           }
       } else if (tag === 'total_day_sleep' || tag === 'total_day_sleep_oneday') {
            if (sleepTime >= 7 && sleepTime <= 9) {
                return "#11bf14"
            } else if (sleepTime < 7 ) {
                return "#F43F34"
            } else if (sleepTime > 9 && indicatorAbove) {
                return "#ffbc00"
            } 
       } else if (tag === 'total_night_sleep' || tag === 'total_night_sleep_oneday') {
           if (sleepTime >= 8 && sleepTime <= 9) {
               return "#11bf14"
           } else if (sleepTime < 8 ) {
               return "#F43F34"
           }  else if (sleepTime > 9 && indicatorAbove ) {
            return "#ffbc00"
           }
       } else if (tag === 'total_daytime_dreams' || tag === 'day_sleep_count_oneday' || tag === 'night_sleep_count_oneday') {

            if (countDaySleep >= 3 && countDaySleep <= 6) {
                return "#11bf14"
            } else if (countDaySleep < 3 ) {
                return "#F43F34"
            } else if (countDaySleep === 0 ) {
                return "#fff"
            } else if (indicatorAbove && countDaySleep > 6){
                return "#ffbc00"
            }
        } else if (tag === 'average_night_sleep' || tag === 'average_day_sleep' || tag === 'average_sleep' || tag === 'day_sleep_count' || tag === 'total_daytime_dreams') {
           return '#fff'
       }
   } else if (amountOfDays <= 120) {
       /// до 4-х месяцев
       if (tag === 'total_sleep'  || tag === 'total_sleep_oneday') {
           if (sleepTime >= 13 && sleepTime <= 15) {
               return "#11bf14"
           } else if (sleepTime < 13) {
               return "#F43F34"
           }  else if (sleepTime > 15 && indicatorAbove) {
            return "#ffbc00"
           }
       } else if (tag === 'total_day_sleep' || tag === 'total_day_sleep_oneday') {
           if (sleepTime >= 4 && sleepTime <= 5) {
               return "#11bf14"
           } else if (sleepTime < 4 ) {
               return "#F43F34"
           }   else if ( sleepTime > 5 && indicatorAbove) {
            return "#ffbc00"
           }
       } else if (tag === 'total_night_sleep' || tag === 'total_night_sleep_oneday') {
           if (sleepTime >= 9 && sleepTime <= 10) {
               return "#11bf14"
           } else if (sleepTime < 9) {
               return "#F43F34"
           } else if (sleepTime > 10 && indicatorAbove) {
            return "#ffbc00"
           }
       }  else if (tag === 'total_daytime_dreams' || tag === 'day_sleep_count_oneday' || tag === 'night_sleep_count_oneday') {
            if (countDaySleep >= 3 && countDaySleep <= 6) {
                return "#11bf14"
            } else if (countDaySleep === 0 ) {
                return "#fff"
            } else if (countDaySleep < 3) {
                return "#F43F34"
            } else if (countDaySleep > 6 && indicatorAbove) {
                return "#ffbc00"
            }
        } else if (tag === 'average_night_sleep' || tag === 'average_day_sleep' || tag === 'average_sleep' ||  tag === 'day_sleep_count') {
           return '#fff'
       }
   } else if (amountOfDays <= 150) {
       //до 5-ти месяцев
       if (tag === 'total_sleep'  || tag === 'total_sleep_oneday') {
           if (sleepTime >= 14 && sleepTime <= 16) {
               return "#11bf14"
           } else if (sleepTime < 14) {
               return "#F43F34"
           } else if (sleepTime > 16 && indicatorAbove) {
            return "#ffbc00"
           }
       } else if (tag === 'total_day_sleep' || tag === 'total_day_sleep_oneday') {
           if (sleepTime >= 4 && sleepTime <= 5) {
               return "#11bf14"
           } else if (sleepTime < 4 ) {
               return "#F43F34"
           } else if ( sleepTime > 5 && indicatorAbove) {
            return "#ffbc00"
           }
       } else if (tag === 'total_night_sleep' || tag === 'total_night_sleep_oneday') {
           if (sleepTime >= 10 && sleepTime <= 11) {
               return "#11bf14"
           } else if (sleepTime < 10 ) {
               return "#F43F34"
           } else if ( sleepTime > 11 && indicatorAbove) {
            return "#ffbc00"
           }
       }  else if (tag === 'total_daytime_dreams'|| tag === 'day_sleep_count_oneday' || tag === 'night_sleep_count_oneday') {
            if (countDaySleep >= 2 && countDaySleep <= 3) {
                return "#11bf14"
            } else if (countDaySleep === 0 ) {
                return "#fff"
            } else if (countDaySleep < 2 ) {
                return "#F43F34"
            } else if ( countDaySleep > 3 ) {
                return "#ffbc00"
            }
          } else if (tag === 'average_night_sleep' || tag === 'average_day_sleep' || tag === 'average_sleep' || tag === 'day_sleep_count') {
           return '#fff'
       }

   } else if (amountOfDays <= 210) {
       //до 7-ми месяцев
       if (tag === 'total_sleep'  || tag === 'total_sleep_oneday') {
           if (sleepTime >= 13 && sleepTime <= 16) {
               return "#11bf14"
           } else if (sleepTime < 13) {
               return "#F43F34"
           } else if (sleepTime > 16 && indicatorAbove) {
            return "#ffbc00"
           }
       } else if (tag === 'total_day_sleep' || tag === 'total_day_sleep_oneday') {
           if (sleepTime >= 3 && sleepTime <= 4) {
               return "#11bf14"
           } else if (sleepTime < 3) {
               return "#F43F34"
           } else if ( sleepTime > 4 && indicatorAbove) {
            return "#ffbc00"
           }
       } else if (tag === 'total_night_sleep' || tag === 'total_night_sleep_oneday') {
           if (sleepTime >= 10 && sleepTime <= 12) {
               return "#11bf14"
           } else if (sleepTime < 10 ) {
             return "#F43F34"
           } else if ( sleepTime > 12 && indicatorAbove) {
            return "#ffbc00"
           }
       }  else if (tag === 'total_daytime_dreams' || tag === 'day_sleep_count_oneday' || tag === 'night_sleep_count_oneday') {
            if (countDaySleep >= 2 && countDaySleep <= 3) {
                return "#11bf14"
            } else if (countDaySleep === 0 ) {
                return "#fff"
            } else if (countDaySleep < 2) {
                return "#F43F34"
            } else if (countDaySleep > 3  && indicatorAbove) {
                return "#ffbc00"
            }
        } else if (tag === 'average_night_sleep' || tag === 'average_day_sleep' || tag === 'average_sleep' || tag === 'day_sleep_count') {
           return '#fff'
       }

   }  else if (amountOfDays <= 270) {
       //до 9-ти месяцев
       if (tag === 'total_sleep'  || tag === 'total_sleep_oneday') {
           if (sleepTime >= 13 && sleepTime <= 15.5) {
               return "#11bf14"
           } else if (sleepTime < 13) {
               return "#F43F34"
           } else if (sleepTime > 15.5 && indicatorAbove) {
            return "#ffbc00"
           }
       } else if (tag === 'total_day_sleep' || tag === 'total_day_sleep_oneday') {
           if (sleepTime >= 3 && sleepTime <= 3.5) {
               return "#11bf14"
           } else if (sleepTime < 3) {
               return "#F43F34"
           } else if (sleepTime > 3.5 && indicatorAbove) {
            return "#ffbc00"
           }
       } else if (tag === 'total_night_sleep' || tag === 'total_night_sleep_oneday') {
           if (sleepTime >= 10 && sleepTime <= 12) {
               return "#11bf14"
           } else if (sleepTime < 10) {
               return "#F43F34"
           } else if (sleepTime > 12 && indicatorAbove) {
            return "#ffbc00"
           }
       }  else if (tag === 'total_daytime_dreams' || tag === 'day_sleep_count_oneday' || tag === 'night_sleep_count_oneday') {
            if (countDaySleep >= 2 && countDaySleep <= 3) {
                return "#11bf14"
            } else if (countDaySleep === 0 ) {
                return "#fff"
            } else if (countDaySleep < 2) {
                return "#F43F34"
            } else if (countDaySleep > 3 && indicatorAbove) {
                return "#ffbc00"
            } else if (countDaySleep === 0 ) {
                return "#fff"
            }
       } else if (tag === 'average_night_sleep' || tag === 'average_day_sleep' || tag === 'average_sleep' || tag === 'day_sleep_count') {
           return '#fff'
       }

   } else if (amountOfDays <= 360) {
       //до года
       if (tag === 'total_sleep'  || tag === 'total_sleep_oneday') {
           if (sleepTime >= 12 && sleepTime <= 15) {
               return "#11bf14"
           } else if (sleepTime < 12) {
               return  "#F43F34"
           } else if (sleepTime > 15 && indicatorAbove) {
            return "#ffbc00"
           } 
       } else if (tag === 'total_day_sleep' || tag === 'total_day_sleep_oneday') {
           if (sleepTime >= 2 && sleepTime <= 3) {
               return "#11bf14"
           } else if (sleepTime < 2) {
               return  "#F43F34"
           } else if (sleepTime > 3 && indicatorAbove) {
            return "#ffbc00"
           }
       } else if (tag === 'total_night_sleep' || tag === 'total_night_sleep_oneday') {
           if (sleepTime >= 10 && sleepTime <= 12) {
               return "#11bf14"
           } else if (sleepTime < 10) {
               return "#F43F34"
           } else if (sleepTime > 12 && indicatorAbove) {
            return "#ffbc00"
           }
       }  else if (tag === 'total_daytime_dreams' || tag === 'day_sleep_count_oneday' || tag === 'night_sleep_count_oneday') {
            if (countDaySleep ===  2) {
                return "#11bf14"
            } else if (countDaySleep === 0 ) {
                return "#fff"
            } else if (countDaySleep < 2) {
                return "#F43F34"
            } else if (countDaySleep > 3 && indicatorAbove) {
                return "#ffbc00"
            } 
       } else if (tag === 'average_night_sleep' || tag === 'average_day_sleep' || tag === 'average_sleep' || tag === 'day_sleep_count') {
           return '#fff'
       }

   } else if (amountOfDays <= 540) {
       // от года до 1.5 года
       if (tag === 'total_sleep'  || tag === 'total_sleep_oneday') {
           if (sleepTime >= 11.5 && sleepTime <= 15) {
               return "#11bf14"
           } else if (sleepTime < 11.5) {
               return "#F43F34"
           }  else if (sleepTime > 15 && indicatorAbove) {
            return "#ffbc00"
           }
       } else if (tag === 'total_day_sleep' || tag === 'total_day_sleep_oneday') {
           if (sleepTime >= 1.5 && sleepTime <= 3) {
               return "#11bf14"
           } else if (sleepTime < 1.5) {
               return "#F43F34"
           }  else if (sleepTime > 3 && indicatorAbove) {
            return "#ffbc00"
           }
       } else if (tag === 'total_night_sleep' || tag === 'total_night_sleep_oneday') {
           if (sleepTime >= 10 && sleepTime <= 12) {
               return "#11bf14"
           } else if (sleepTime < 10 ) {
               return "#F43F34"
           } else if ( sleepTime > 12 && indicatorAbove) {
            return "#ffbc00"
           }
       }  else if (tag === 'total_daytime_dreams'|| tag === 'day_sleep_count_oneday' || tag === 'night_sleep_count_oneday') {
            if (countDaySleep === 1 ) {
                return "#11bf14"
            } else if (countDaySleep === 0 ) {
                return "#fff"
            } else if (countDaySleep > 1 && indicatorAbove ) {
                return "#ffbc00"
            }
       } else if (tag === 'average_night_sleep' || tag === 'average_day_sleep' || tag === 'average_sleep' || tag === 'day_sleep_count') {
           return '#fff'
       }

   } else {
       if (tag === 'total_sleep'  || tag === 'total_sleep_oneday') {
           if (sleepTime >= 11.5 && sleepTime <= 13) {
               return "#11bf14"
           } else if (sleepTime < 11.5) {
               return "#F43F34"
           } else if (sleepTime > 13 && indicatorAbove) {
            return "#ffbc00"
        }
       } else if (tag === 'total_day_sleep' || tag === 'total_day_sleep_oneday') {
           if (sleepTime >= 1.5 && sleepTime <= 2) {
               return "#11bf14"
           } else if (sleepTime < 1.5) {
               return "#F43F34"
           } else if (sleepTime > 2 && indicatorAbove) {
            return "#ffbc00"
           }
       } else if (tag === 'total_night_sleep' || tag === 'total_night_sleep_oneday') {
           if (sleepTime >= 10 && sleepTime <= 11) {
               return "#11bf14"
           } else if (sleepTime < 10) {
               return "#F43F34"
           } else if (sleepTime > 11 && indicatorAbove) {
            return "#ffbc00"
           }
       } else if (tag === 'total_daytime_dreams' || tag === 'day_sleep_count_oneday' || tag === 'night_sleep_count_oneday') {
            if (countDaySleep === 1 ) {
                return "#11bf14"
            } else if (countDaySleep === 0 ) {
                return "#fff"
            } else if (countDaySleep > 1 && indicatorAbove ) {
                return "#ffbc00"
            }
      } else if (tag === 'average_night_sleep' || tag === 'average_day_sleep' || tag === 'average_sleep' || tag === 'day_sleep_count') {
           return '#fff'
       }
   }
   return "#fff";
};