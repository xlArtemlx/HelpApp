import React from "react";
import {View, Text} from "react-native";

import {styles} from "./styles";
import {renderTime} from "../../utils/renderTime";

const DreamTotalSleep = ({totalSleep, countDream, languages}) => {
  
    const {minutes, hours} = totalSleep
    return(
        <View style={{...styles.dreamTotalSleep, backgroundColor: (minutes || hours) ? "#F43F34" : '#FFF'}}>
            {
                (minutes || hours) ? <View style={styles.dreamTotalSleepFilled}>
                        {
                            (minutes || hours)
                                ? <Text style={{...styles.dreamTotalSleepFilled, fontWeight: 'bold'}}>{renderTime(totalSleep, languages, '\n', true)}</Text>
                                : <Text style={{...styles.dreamTotalSleepFilled, fontWeight: 'bold'}}>{countDream}</Text>
                        }

                    </View> : null
            }
        </View>
    )
}

export default DreamTotalSleep
