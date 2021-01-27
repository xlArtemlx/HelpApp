import React from "react";
import {View, Text} from "react-native";
import {renderTime} from "../../utils/renderTime";




const DreamTotalSleepWeek = ({valueAverageWeeks,languages,statisticsView}) => {
 
const value =['1_month','3_weeks','2_weeks','1_week']
const isDisableWeeks = !!statisticsView.find( (setting) => setting.value === value[3] )
const isDisableTwoWeeks = !!statisticsView.find( (setting) => setting.value === value[2] )
const isDisableThreeWeeks = !!statisticsView.find( (setting) => setting.value === value[1] )
const isDisableMonth = !!statisticsView.find( (setting) => setting.value === value[0] )
const isDisableAverage = !!isDisableWeeks && !!isDisableTwoWeeks && !!isDisableThreeWeeks && !!isDisableMonth ? false : true 
const isDisableMediana = !!isDisableWeeks && !!isDisableTwoWeeks && !!isDisableThreeWeeks && !!isDisableMonth ? false : true 
const isDisableAll = !isDisableAverage && !isDisableMediana ? false : true 

    const {averageWeeks,averageTwoWeeks,averageThreeWeeks,averageMonth} = valueAverageWeeks

    const render = (el,languages,index) => {

        const {minutes, hours} = el
        return (
                <View key ={index}>
                {
                    (minutes || hours || typeof(el) === 'number' ) ? <View >
                            {
                                (minutes || hours)
                                    ? <Text style={{ fontWeight: 'bold', color: 'black'}}>{renderTime(el, languages, '\n', false)}</Text>
                                    : <Text style={{ fontWeight: 'bold', color: 'black'}}>{el}</Text>
                            }

                        </View> : <Text>  Н/Д</Text>
                }
                
                </View>
        )
    }

return (
        <View>
        { isDisableAll &&
            <View style={{backgroundColor:'white', margin: 5, borderRadius: 5,borderColor: 'black'}}>
                <View style={{flexDirection:'row', justifyContent: 'space-between', marginTop: 5}}>
                    <View>
                        <Text>                    </Text>
                    </View>
                    {isDisableAverage && <Text>Среднее</Text>}
                    { isDisableMediana && <Text>Медиана</Text>}
                </View>
                <View style={{justifyContent: 'space-between', marginTop: 5}}>
                    <View style={{flexDirection:'row', justifyContent: 'space-between',margin: 5}}>
                        {!isDisableWeeks && <Text>Неделя:   </Text>}
                        { !isDisableWeeks &&
                        averageWeeks.map((el,index) => render(el,languages,index))
                        }
                    </View>
                    <View style={{flexDirection:'row' , justifyContent: 'space-between',margin: 5}}> 
                        {!isDisableTwoWeeks && <Text>2 Недели:</Text>}
                        { !isDisableTwoWeeks &&
                        averageTwoWeeks.map((el,index) => render(el,languages,index))
                        }
                    </View>
                <View style={{flexDirection:'row' , justifyContent: 'space-between',margin: 5}}>
                        {!isDisableThreeWeeks && <Text>3 Недели:</Text>}
                        { !isDisableThreeWeeks &&
                        averageThreeWeeks.map((el,index) => render(el,languages,index))
                        }
                </View>
                    <View style={{flexDirection:'row' , justifyContent: 'space-between',margin: 5}}>
                        {!isDisableMonth && <Text>Месяц:     </Text>}
                        { !isDisableMonth &&
                        averageMonth.map((el,index) => render(el,languages,index))
                        }
                    </View>

                </View>
        
            </View>
    
        }
        </View>
    )
}

export default DreamTotalSleepWeek








