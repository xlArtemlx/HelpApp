import React, {useState,useEffect} from "react";
import {Text, View, ScrollView, TouchableOpacity,Dimensions} from "react-native";
import moment from "moment";
import {useDispatch, useSelector} from "react-redux";
import {
    getDataTC,
    setDateSuccess,
    removeDreamTC,
} from "../../redux/reducers/mainReducer";

import {renderTime} from '../../utils/renderTime'

import GestureRecognizer from 'react-native-swipe-gestures';

import {DateNumber, EmptyBlock, StatisticsOnce, Button, DreamItem, CenterBlock} from "../../components";
import{ _separateMinutes} from '../../utils/calcStatistics'


import Modal from 'react-native-modal';
import {Label} from "../index";

import {styles} from './styles'
import { Octicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height


const _renderDreams =  (dreams, languages, date, theme ,yestEndTime,_handleButtonPress,deletDream) => {
    const dateDream = moment(date).format('DD MMM')
        const returnEndTime = (index) => {
            if(dreams[index+1]){
               if(!dreams[index+1].started){
                   return dreams[index+1].endTime
              }
            }
        }
        const lastDreamStarted = (index,dream) =>{
            if(dreams[index-1]){
                return dreams[index] && dreams[index-1].started ? true : false
            }
        }
    

 return dreams.map((dream, index) => (dream && 
    <DreamItem 
        _handleButtonPress={_handleButtonPress}
        lastDreamStarted={lastDreamStarted(index,dream)} 
        dreamCount={dreams.length} 
        index={index} 
        prevEndTime={returnEndTime(index)} 
        key={dream.id} 
        languages={languages} 
        dream={dream} 
        date={date}
        dateDream={date}
        theme={theme} 
        yestEndTime={yestEndTime}
        deletDream={deletDream}/> ))
}



const _renderDreamsTomorrow = (dreams, dreamTomorrow, languages, date, theme ,_handleButtonPress,deletDream) => {
    const dateDream = moment(date).add(1, 'days')
    const filterDreams = dreamTomorrow.filter(el => {
        if(el.startTime < "06:00" && el.timeOfDay === 'night') {
            return true
        }
    })
    const prevDreamStarted = () => {
        const count = dreams.length - 1
        return dreams.length && dreams[count].started ? true : false
    }

    const lastDreamStarted = (index,dream) =>{
        if(filterDreams[index-1]){
            return filterDreams[index-1] && filterDreams[index-1].started ? true : false
        }
    }
    const returnEndTime = (index,dream) => {
        if(filterDreams[index+1]){
            if(!filterDreams[index+1].started){
                return  filterDreams[index+1].endTime
            }
        }
    }

    const yestEndTime = (index) => {
         if(dreams && dreams.length && dreams[0]){
             if(!dreams[0].started){
                return dreams[0].endTime
             }
         }
    }

    return filterDreams.map((dream, index) => (dream && 
            
            <DreamItem 
            prevEndTime={returnEndTime(index,dream)} 
            prevDreamStarted = {prevDreamStarted()} 
            lastDreamStarted={lastDreamStarted(index,dream)} _
            handleButtonPress={_handleButtonPress} 
            dreamCount={filterDreams.length} 
            index={index}  
            key={dream.id} 
            languages={languages} 
            dream={dream} 
            dateDream={dateDream} 
            date={date} 
            theme={theme} 
            yestEndTime={yestEndTime(index)}
            deletDream={deletDream} /> ))
}

const _renderYestNightDream =  (dreams,dreamsYest, totalMinutesWakefulness,  languages, date, theme,_handleButtonPress,deletDream) => {
    const dateDream = moment(date).add(-1, 'days')
   

           let tempHour = Math.floor(totalMinutesWakefulness/ 60)
           let diffMinutes = totalMinutesWakefulness - tempHour * 60
           let diffHours = 0 + tempHour
           let wakefulnessNight = renderTime(_separateMinutes(diffMinutes,diffHours),languages, ' ', true)

           const lastDreamStarted = (index) =>{
            if(dreamsYest[index-1]){
                return dreamsYest[index] && dreamsYest[index-1].started ? true : false
            }
        }
        
        if(dreamsYest){
            return ( dreamsYest.map((dream, index) => (dream && 
                    <DreamItem 
                    lastDreamStarted={lastDreamStarted(index)}
                    key={dream.id} 
                    languages={languages} 
                    dream={dream}
                    dreamCount={dreamsYest.length} 
                    dateDream={dateDream} 
                    date={date} 
                    theme={theme} 
                    wakefulnessNight={wakefulnessNight} 
                    _handleButtonPress={_handleButtonPress}
                    deletDream={deletDream} /> 
                    )
                )
        ) 
        }
}




const sortDreamsByTime  = (dreams)  => {
    return dreams.sort((a, b) => a.startTime > b.startTime ? -1 : 1)
}

export const Main = ({date, dreams, startDreamTC, endDreamTC, statisticsView, children, activeChild, changeChild, theme, indicator, gesture, indicatorAbove,dreamsYest,dreamTomorrow}) => {


    const activeDream = dreams.find(dream => dream.started);
 

    const languages = useSelector(({app}) => app.languages)
    //const [dreamMode, setDreamMode] = useState(true);
    const dispatch = useDispatch();

    const [visible, setVisible] = useState(false)
    const [visibleDelete, setVisibleDelete] = useState(false)
    const [deleteItem, setDeleteItem] = useState({dateDream:'',id:'',startTime:'--:--',endTime:'--:--'})
    const [view, setViwe] = useState(false)
    let totalMinutesWakefulness;
    let dreamNightYest;
    let yestEndTime;

   
    if(dreamsYest) {
        dreamNightYest =  dreamsYest.filter((el,index) => index === 0 && el.timeOfDay === 'night')
        let firstDreamToday = dreams.filter((el,index) => index === (dreams.length -1) )
        if(dreamNightYest[0] !== undefined && firstDreamToday[0] !== undefined){
            yestEndTime = dreamNightYest[0].endTime
            totalMinutesWakefulness = 
            (Number(firstDreamToday[0].startTime.split(':')[0]) * 60 + 
            Number(firstDreamToday[0].startTime.split(':')[1])) + 1440 -(Number(dreamNightYest[0].endTime.split(':')[0]) * 60 + 
            Number(dreamNightYest[0].endTime.split(':')[1])) ;
        }
    }
    const filterDreamsNight = dreamsYest.filter(el => {
        if(el.startTime > "19:00" && el.timeOfDay === 'night') {
            return true
        }
    })



    const _handleButtonPress = () => {
        !activeDream ? startDreamTC(date) : endDreamTC(date, activeDream)
    }


    const getData = (date) => {

        dispatch(setDateSuccess(date))
        dispatch(getDataTC(date))
    
    }

    
 

    const handleActiveChild = (child) => {
        changeChild(child);
        setVisible(false);
    }

    const onSwipe = (side) => {
        if (gesture) {
            if (side === 'left') {
                if(!(date.format('DD MMM') === moment().local().format('DD MMM'))) {
                    getData(moment(date.add(1, 'days')))
                }
            } else {
                getData(moment(date.add(1, 'days')))
            }
        }
    }

    const changeViewLine = () => {
        setViwe(true)
    }
    const changeViewBlock = () => {
        setViwe(false)
    }
    const deletDream = (dateDream,id,startTime="--:--",endTime="--:--") => {
        setVisibleDelete(true)
        setDeleteItem(
            {
                dateDream:dateDream,
                id:id,
                startTime:startTime,
                endTime:endTime
            }
        )

    }
 

   

    return (
        <GestureRecognizer
            onSwipeLeft={() => onSwipe('left')}
            onSwipeRight={() =>onSwipe('right')}
            style={{...styles.main, backgroundColor: theme && theme.background}}>
            <View>
                <DateNumber date={date} setDate={getData} theme={theme}/>
            </View>
            {
                dreams && dreams.length
                    ? <ScrollView>
                        <View style={styles.dreams}>
                            {_renderDreamsTomorrow(sortDreamsByTime(dreams), dreamTomorrow, languages, date, theme,yestEndTime,_handleButtonPress,deletDream)}
                            {_renderDreams(sortDreamsByTime(dreams), languages, date, theme,yestEndTime,_handleButtonPress,deletDream)}
                            
                            { filterDreamsNight.length > 0 &&
                             <View>
                                 <Text style={styles.statisticsText}>Ночной сон за  {moment(date).add(-1,'day').format('DD MMMM')}</Text>
                            {_renderYestNightDream(sortDreamsByTime(filterDreamsNight),dreamsYest,totalMinutesWakefulness,languages, date, theme,_handleButtonPress,deletDream)}
                            </View>
                            }
                            
                        </View>
                        {
                            !!dreams.length && <View>
                                <View style ={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                                        <Text style={styles.statisticsText}>{languages.statistics} {date.format('DD MMMM')}</Text>
                                        <View style={{flexDirection:'row'}}>
                                            <TouchableOpacity onPress ={changeViewBlock}><Text style={styles.statisticsIcons}><AntDesign name="appstore-o" size={24} color={ view ? '#000080': '#FFD700'} /></Text></TouchableOpacity>
                                            <TouchableOpacity onPress ={changeViewLine}><Text style={styles.statisticsIcons}><Octicons name="three-bars" size={24} color={ view ?  '#FFD700':'#000080'} /></Text></TouchableOpacity>
                                        </View>
                                </View>
                                <View style={{ flexDirection:'row',margin: 5,}}>
                                      <StatisticsOnce  date={date} totalMinutesWakefulness={totalMinutesWakefulness} dreamTomorrow={dreamTomorrow}  dreamsYest={dreamsYest} statisticsView={statisticsView} languages={languages} dreams={dreams} theme={theme} birthday={activeChild && activeChild.date} indicator={indicator} view={view}  indicatorAbove={indicatorAbove}/>
                                </View>
                            </View>
                        }
                    </ScrollView>
                    : <CenterBlock><EmptyBlock emptyText={languages.empty_text} theme={theme}/></CenterBlock>
            }
            {
                date.date() === moment().local().date() && date.month() === moment().local().month()
                && <View style={styles.buttonBlock}>
                    {children && children.length > 1 &&
                    <TouchableOpacity style={styles.changeChildBtn} onPress={ () => setVisible(!visible)}>
                        <Text style={styles.changeChildBtnText}>{activeChild && activeChild.name}</Text>
                    </TouchableOpacity>}
                    {visible && <Modal
                        isVisible={visible}
                        onBackdropPress={() => setVisible(false)}
                        hideModalContentWhileAnimating
                        backdropOpacity={0.40}
                        style={styles.modalContainer}
                        animationIn={'none'}
                    >
                        <View style={styles.listOfChildrenContainer}>
                            <Text style={styles.headerText}>Выберите малыша</Text>
                            {children.map((child) =>
                                <TouchableOpacity
                                    onPress={() => handleActiveChild(child)}
                                    style={styles.childName}
                                    key={child.id}
                                >
                                    <Text style={styles.childNameText}>{child.name}</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    </Modal>}
                    { visibleDelete &&
               
                       <Modal isVisible={visibleDelete} onBackdropPress={() => setVisibleDelete(false)} style={{ justifyContent: 'flex-end',alignItems: 'center',margin: 0,}}>
                       

                            <View style={{
                                backgroundColor:'#fff',
                                width: deviceWidth,
                                height: deviceHeight / 9,
                            }}>
                                <Text style={{fontWeight:'bold',fontSize:20}}>Удаление</Text>
                                <Text>Вы действительно хотите удалить сон   {deleteItem.startTime}-{deleteItem.endTime}?</Text>
                                <View style={{flexDirection:'row', justifyContent:'space-around',margin:10}}>
                                    <TouchableOpacity onPress={()=>{dispatch(removeDreamTC(deleteItem.dateDream, deleteItem.id)),setVisibleDelete(false)  }} ><Text style={{fontWeight:'bold'}}>Да</Text></TouchableOpacity>
                                    <TouchableOpacity onPress={()=>setVisibleDelete(false)}><Text style={{fontWeight:'bold'}}>Нет</Text></TouchableOpacity>
                                </View>
                              
                            </View>
               
                           
                
                       </Modal>
        
                    }
                    <Button
                        style={styles.startOrEndSleepBtn}
                        buttonText={!activeDream  ? languages.start_sleep : languages.end_sleep}
                        pressHandler={_handleButtonPress}
                    />
                </View>
            }
        </GestureRecognizer>
    );
}

export default Main
