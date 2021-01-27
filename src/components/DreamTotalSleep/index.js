import React from "react";
import {View, Text} from "react-native";

import {styles} from "./styles";
import {renderTime} from "../../utils/renderTime";
import {renderTotalSleepColor} from "../../utils/renderDreamColor";

import { differenceInDays } from 'date-fns'

const DreamTotalSleep = ({totalSleep, countDream, languages, tag, birthday, indicator,indicatorAbove,dream}) => {


    const {minutes, hours} = totalSleep;
    const amountOfDays = differenceInDays(new Date(), new Date(birthday));

  
   const countDaySleep = countDream  ? countDream : 0

  
    return(
        <View style={{...styles.dreamTotalSleep, backgroundColor: (minutes || hours || totalSleep === 0) ? indicator ?
                renderTotalSleepColor(tag, amountOfDays, totalSleep,countDaySleep,indicatorAbove) : '#fff' : '#ffffff'}}>
            {
                (minutes || hours || countDream) ? <View style={styles.dreamTotalSleepFilled}>
                        {
                            (minutes || hours)
                                ? <Text style={{...styles.dreamTotalSleepFilled, fontWeight: 'bold', color: 'black'}}>{renderTime(totalSleep, languages, '\n', true)}</Text>
                                : <Text style={{...styles.dreamTotalSleepFilled, fontWeight: 'bold', color: 'black'}}>{countDream}</Text>
                        }

                    </View> : <Text>Н/Д</Text>
            }
            
        </View>
    )
}

export default DreamTotalSleep
