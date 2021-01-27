import React,{useState} from "react";

import { Text, View,TouchableOpacity,Dimensions} from 'react-native'
import {renderTime} from "../../utils/renderTime";

import {renderTotalSleepColor} from "../../utils/renderDreamColor";
import {_separateMinutes} from "../../utils/calcStatistics";
import {useSelector} from "react-redux";
import moment from "moment";

import Modal from 'react-native-modal';




import {styles} from './styles'


const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height



const StatisticsOnceItem = ({date,field,index,  statisticsView, theme, amountOfDays, indicator,view,indicatorAbove, languages}) =>{
  

    const statisticFlex = view ?  styles.statisticsOnceItemList : styles.statisticsOnceItemBox 
    const statisticFlexText = view ? styles.statisticsOnceTextList : null

    const time = typeof field.value === 'string' ? field.value.split(':') : null;
    const countDaySleep = typeof field.value === 'number' ? field.value : null
    const totalSleep = {
        hours: time && time[0],
        minutes: time && time[1]
    };
    const [visible,setVisible] = useState(false)
   
    const activeLanguage = useSelector( ({app}) => app.activeLanguage)


    const _toPositive = number => Math.sign(number) === -1 ? number * -1 : number

    
    const color = indicator ? renderTotalSleepColor(field.id, amountOfDays, totalSleep,countDaySleep,indicatorAbove) : null;


    const isDisable = !!statisticsView.find( setting => setting.value === field.id )
    const isDisableOut = field.value === "00:00" ? true : field.value === 0 ? true : false


    const {valueYest,valueTomorrow,valueDiffYest,valueDiffTomorrow} = field.valueYest


 
    let differenceYest = Math.sign(valueDiffYest) === 1 ? languages.less_by : languages.more_by
    let differenceTomorrow = Math.sign(valueDiffTomorrow) === 1 ? languages.less_by : languages.more_by


    return !isDisable &&  (
        <TouchableOpacity onPress={() => setVisible(!visible)}
        style={{...styles.dream, backgroundColor: theme.navigator}} key={index} style={{...statisticFlex, backgroundColor: theme.navigator}}>

        <View  style={statisticFlexText}>

            <Text style={{color: theme.text, alignSelf: 'flex-start'}}>{field.title}</Text>
            <Text style={{ ...styles.timesContainer,fontWeight: 'bold', color: 'black',backgroundColor: color, alignSelf: 'flex-end'}}>{field.value}</Text>
            

        </View>
        
        <View key={index}>
            <TouchableOpacity
                onPress={() => setVisible(!visible)}
            >

            {visible && <Modal
                            isVisible={visible}
                            onBackdropPress={() => setVisible(false)}
                            hideModalContentWhileAnimating
                            backdropOpacity={0.40}
                            style={styles.modalContainer}
                            >
                <View style={{
                    ...styles.modalContent,
                    width: deviceWidth,
                    height: deviceHeight / 6
                }}>
                    <Text style={{fontWeight: 'bold',fontSize:17, marginBottom: 3}}>{field.title}</Text>
                    <View style={{flexDirection:'row', justifyContent: 'space-between'}}>
                        { valueYest.totalMinutes === 0 || valueYest ===0 ? null :
                       

                            <View style={{width: '30%'}}>
                                <Text style={{margin:3}}>{moment(date).add(-1,'day').format('DD MMM')}</Text>
                                <Text style={{fontWeight: 'bold',margin:3}}>{typeof valueYest === 'number' ? valueYest :renderTime(valueYest, languages)}</Text>
                                {valueYest !== field.value &&
                                <>
                                <Text style={{opacity:0.5, }}>{differenceYest}</Text>
                                <Text style={{opacity:0.5,  }}>{typeof valueYest === 'number' ? _toPositive(valueDiffYest) : renderTime(_separateMinutes(_toPositive(valueDiffYest), 0),languages)}</Text>
                                </>
                                }
                            </View> 

                        }
                        <View style={{borderLeftColor: '#ababab', borderLeftWidth:1, width: '30%'}} >
                            <Text style={{margin:3}} >{date.locale(activeLanguage).format('DD MMM')}</Text>
                            <Text style={{fontWeight: 'bold',margin:3}}>{field.value}</Text>
                        </View>
                        { valueTomorrow.totalMinutes === 0 || valueTomorrow ===0 ? null :
                            <View  style={{borderLeftColor: '#ababab', borderLeftWidth:1, width: '30%'}}>
                                <Text style={{margin:3}}>{moment(date).add(1,'day').format('DD MMM')}</Text>
                                <Text style={{fontWeight: 'bold',margin:3}}>{typeof valueTomorrow === 'number' ? valueTomorrow :renderTime(valueTomorrow, languages)}</Text>
                                {valueTomorrow !== field.value && 
                                <>
                                    <Text style={{opacity:0.5 ,  }}>{differenceTomorrow}</Text>
                                    <Text style={{opacity:0.5 ,  }}>{typeof valueTomorrow === 'number' ? _toPositive(valueDiffTomorrow) :renderTime(_separateMinutes(_toPositive(valueDiffTomorrow), 0),languages)}</Text>
                                </>
                                }
                            </View>
                        }
                    </View>
                
                </View>
            </Modal>}
            </TouchableOpacity>
        </View>
        </TouchableOpacity>
    )

}



export default StatisticsOnceItem
