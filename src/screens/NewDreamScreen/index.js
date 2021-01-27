import React, {useState} from 'react';
import {Text, TouchableOpacity, View, Image, Dimensions, ScrollView} from "react-native";
import CheckBox from '@react-native-community/checkbox';
import {updateDreamTC} from "../../redux/reducers/mainReducer";
import AsyncStorage from "@react-native-community/async-storage";
import {ru, enUS} from 'date-fns/locale'
import {useNavigation} from "@react-navigation/native";
import {useDispatch} from 'react-redux'

import {Label, TimeItem, Button,} from "../../components";
import {styles} from './style'
import {main} from "../../core/colors";
import {renderCreateButton} from "../../utils/renderDirectoryButton";
import {useRoute} from "@react-navigation/native";

import moment from "moment";
import { areIntervalsOverlapping, isWithinInterval,formatDistanceStrict, differenceInMinutes } from 'date-fns';

import {convertDateFromTime} from "../../utils/convertFromTime";
import { compose } from 'redux';


const deviceWidth = Dimensions.get('window').width;

const timeOfDay = [{title: 'Дневной', value: 'day'}, {title: 'Ночной', value: 'night'}];

export const NewDreamScreen = ({date, dream, places, tags, languages, isNew, startDreamTC, endDreamTC, theme, disableTags, disableFeeding, dreams}) => {

    const {params} = useRoute();
    const {comment} = params ? params : '...';
 
    const {place, id} = !isNew && dream;

    const savedTags = dream && dream.tags || [];
    const countDream = () => {
        if(!isNew){
            if(dream.startDate === moment(date).format('DD MMM')){
                return date
            }else if((dream.startDate > moment(date).format('DD MMM'))){
                return moment(date).add(1, 'days')

            }else if((dream.startDate < moment(date).format('DD MMM'))){
                return moment(date).add(-1, 'days')
            }
        }
    }
    const dateDream = isNew ? date : countDream();


    const [updatedDream, setUpdatedDream] = useState(dream || {startTime: moment(new Date()).format('HH:mm')})
    const [activePlace, setActivePlace] = useState(place || '')
    const [activeTags, setActiveTags] = useState(savedTags);
    const [activeTimeOfDay, setActiveTimeOfDay] = useState(!isNew ? (dream.timeOfDay || timeOfDay[0].value) : timeOfDay[0].value)
    const [isFinish, setIsFinish] = useState(!isNew ? (!!dream.endTime || false) : false)
    const [countFeeding, setCountFeeding] = useState(!isNew ? (dream.countFeeding || 0) : 0);
    const [commentText, setCommentText] = useState(dream && dream.comment || '...');
    const [errorText, setErrorText] = useState('');

    const [_id, setId] = useState(!isNew ? null : +new Date())

    const [isPlacesVisible, setIsPlacesVisible] = useState(false)
    const [isTagsVisible, setIsTagsVisible] = useState(false)


    const {navigate} = useNavigation();
    const dispatch = useDispatch();
    const activeDream = dreams.find(dream => dream.started);

    const handleModalVisible = (type) => type === 'places' ? setIsPlacesVisible(!isPlacesVisible) : setIsTagsVisible(!isTagsVisible)

    const handleCheckBoxChange = () => setIsFinish(!isFinish)
    const activeLanguages =  AsyncStorage.getItem('@active_language')
 

    const handleChangeCountFeeding = type => {
        let count = type === 'add' ? countFeeding + 1 : countFeeding - 1
        setCountFeeding(count)
    }

    const handleSelectTag = (tag) => {
        if (activeTags.find(aTag => aTag.id === tag.id)) {
            setTags(activeTags.filter(aTag => aTag.id !== tag.id))
        } else {
            setTags([...activeTags, tag])
        }
    }

    const updateDreamTime = (type, time) => {
        type === 'startTime' ? updatedDreamWakefulness(type,time) :setUpdatedDream({...updatedDream, [type]: time})
       
       
    }

    const setPlace = (place) => {
        setActivePlace(place)
    }
    const setTimeOfDay = (value) => {
        setActiveTimeOfDay(value)
    }

    const setTags = (tags) => {
        setActiveTags(tags)
    };


    const ind = dreams.findIndex(el => el.id === updatedDream.id)

    const updatedDreamWakefulness = (type,time) =>{

        if(type === 'startTime'){
            if(dreams[ind+1]){
                const end =  convertDateFromTime(dreams[ind+1].endTime); 
                const start = convertDateFromTime(updatedDream.startTime);
               
                    setUpdatedDream({...updatedDream,[type]: time, wakefulness: {
                    value: formatDistanceStrict(start, end, {locale: activeLanguages === 'en' ? enUS : ru}),
                    inMinutes: differenceInMinutes(start, end)
                }})
                
            }else {
                setUpdatedDream({...updatedDream, [type]: time})
            }
        } ;

    }

    const changeWakefulness =  (type) => {


        let start;
        let end;
        let wakefulness;

        if(type === 'endTime' && isFinish === true){
            if(dreams[ind-1] && !dreams[ind-1].started){
                start = convertDateFromTime(updatedDream.endTime);
                end =  convertDateFromTime(dreams[ind-1].startTime); 
              

                 wakefulness = {
                    value: formatDistanceStrict(start, end, {locale: activeLanguages === 'en' ? enUS : ru}),
                    inMinutes: differenceInMinutes(end, start)
                 }
                const payload = {
                    ...dreams[ind-1],
                    wakefulness: wakefulness
                };
               
        
                dispatch(updateDreamTC(dateDream, payload, dreams[ind-1].id));

            }
        } else if(type !== 'endTime' && isFinish === false ){
            if(dreams[ind-1] ){
                const payload = {
                    ...dreams[ind-1],
                    wakefulness : {
                        value: null,
                        inMinutes: null,
                     }
                };
               
        
                dispatch(updateDreamTC(dateDream, payload, dreams[ind-1].id));

            }


        }
    }


    const checkForOverlapFinished = () => {
        let startOfDream = convertDateFromTime(updatedDream.startTime);
        let endOfDream = convertDateFromTime(updatedDream.endTime);

        if (updatedDream.endTime < updatedDream.startTime) {
            endOfDream = (endOfDream).setDate(endOfDream.getDate() + 1)
        };

        let check = [];

        dreams.filter( d => d.id !== updatedDream.id).map((d) => {
            let start = convertDateFromTime(d.startTime);
            let end = convertDateFromTime(d.endTime);
            if (d.startTime > d.endTime) {
                end = (end).setDate(end.getDate() + 1)
            }
            return areIntervalsOverlapping(
                {start: startOfDream, end: endOfDream},
                {start: start, end: end})

        });

        return check.includes(true);
    };

    const checkForOverlap = () => {

        let check = dreams.filter( d => d.id !== updatedDream.id).map((d) => {
            let start = convertDateFromTime(d.startTime);
            let end = convertDateFromTime(d.endTime);
            if (d.startTime > d.endTime) {
                end = (end).setDate(end.getDate() + 1)
            }
            return isWithinInterval(
                convertDateFromTime(updatedDream.startTime),
                {start: start, end: end})
        });
        return check.includes(true);
    };
    



    const handleSave = () => {
       
        const payload = {
            ...updatedDream,
            place: activePlace,
            tags: activeTags,
            started: !isFinish,
            timeOfDay: activeTimeOfDay,
            countFeeding,
            comment: comment || dream && dream.comment || ''
        };
      
     

        if (isNew) {
            if (isFinish) {
                if ((activeTimeOfDay === 'night' || updatedDream.startTime < updatedDream.endTime)) {
                    if (!checkForOverlapFinished()) {
                        const nextDay = new Date((new Date(dateDream)).setDate((new Date(dateDream)).getDate() + 1)); //moment().local().format('DD MMM');
                        startDreamTC(dateDream, payload, {startTime : updatedDream.startTime});
                        endDreamTC(dateDream, {endTime: updatedDream.endTime, endDate: updatedDream.endDate});
                        if (activeTimeOfDay === 'night' && moment(nextDay).local().format('DD MMM') === updatedDream.endDate) {
                            startDreamTC(moment(nextDay).local(), payload, {startTime : updatedDream.startTime});
                            endDreamTC(moment(nextDay).local(), {endTime: updatedDream.endTime, endDate: updatedDream.endDate});
                        }
                        navigate('Home')
                    } else {
                        setErrorText('Время пересекается с уже существующим сном');
                    }
                } else {
                    setErrorText(languages.end_less_beginning_time);
                }
            } else {
                if (!checkForOverlap()) {
                    startDreamTC(dateDream, payload, {startTime : updatedDream.startTime});
                    navigate('Home')
                } else {
                    setErrorText('Время пересекается с уже существующим сном');
                }

            }
        } else {
            if (isFinish===true ) {
                if(updatedDream.startTime < updatedDream.endTime){
                    if ((activeTimeOfDay === 'night' || updatedDream.startTime < updatedDream.endTime)) {
                            if (!checkForOverlapFinished()) {
                            dispatch(updateDreamTC(dateDream, payload, id || _id));
                            endDreamTC(dateDream, {endTime: updatedDream.endTime, endDate: updatedDream.endDate});
                            navigate('Home')
                            } else {
                                setErrorText('Время пересекается с уже существующим сном');
                            }
                    } else {
                        setErrorText(languages.end_less_beginning_time);
                    }
                } else{
                    setErrorText('Если сон завершен, то нужно выбрать время окончания сна');
                }   

            } if(isFinish === false && !activeDream){ 
                if ((activeTimeOfDay === 'night' || updatedDream.startTime < updatedDream.endTime)) {
                    if (!checkForOverlapFinished()) {
                        const newPayload = {
                            ...updatedDream,
                            endTime: null,
                            endDate:null,
                            place: activePlace,
                            tags: activeTags,
                            started: true,
                            timeOfDay: activeTimeOfDay,
                            countFeeding,
                            comment: comment || dream && dream.comment || ''
                        };
                        dispatch(updateDreamTC(dateDream, newPayload, id || _id));
                        navigate('Home')
                    } else {
                        setErrorText('Время пересекается с уже существующим сном');
                    }
                } else {
                    setErrorText(languages.end_less_beginning_time);
                }
            } 
            // else {
            //     if (!checkForOverlap()) {
            //         dispatch(updateDreamTC(date, payload, id || _id));
            //         setIsFinish(false)
            //         navigate('Home')
            //     } else {
            //         setErrorText('Время пересекается с уже существующим сном');
            //     }
            // }
        }
    };

    return (
        <ScrollView style={{...styles.container, backgroundColor: theme.background}}>
            <View>
                <Text style={styles.heading}>{languages.edit_section_time_sleep}</Text>
                <View style={styles.times}>
                    <View style={styles.timeItem}>
                        <TimeItem
                            time={updatedDream && updatedDream.startTime}
                            date={updatedDream && updatedDream.startDate} type='start'
                            updateDreamTime={updateDreamTime}
                            theme={theme}
                            timeOfDay={activeTimeOfDay}
                        />
                    </View>
                    <View style={styles.timeItem}>
                        <TimeItem
                            disabled={!isFinish}
                            time={updatedDream && updatedDream.endTime}
                            date={updatedDream && updatedDream.endDate} type='end'
                            updateDreamTime={updateDreamTime}
                            theme={theme}
                            timeOfDay={activeTimeOfDay}
                        />
                        <View style={styles.isDreamFinish}>
                            <CheckBox
                                onValueChange={handleCheckBoxChange}
                                value={isFinish}
                                tintColors={main}
                                tintColor={main}
                            />
                            <Text style={{color: theme.text}}>Сон завершен?</Text>
                        </View>
                    </View>
                </View>
            </View>

            <View style={styles.placesBlock}>
                <Text style={styles.heading}>{languages.edit_section_time_of_day}</Text>
                <View style={styles.places}>
                    {timeOfDay.map(({value, title}, index) => (
                        <TouchableOpacity key={index} onPress={() => {
                            setTimeOfDay(value)
                        }}>
                            <Label style={{...styles.timeOfDayLabel, width: (deviceWidth / 2 - 20)}} place={title}
                                   focused={value === activeTimeOfDay}>
                                <Image
                                    style={{
                                        marginHorizontal: 5,
                                        width: 16,
                                        height: 16,
                                        tintColor: value === activeTimeOfDay ? '#fff' : '#000'
                                    }}
                                    source={value === 'day' ? require('../../images/icons/ic_day.png') : require('../../images/icons/ic_night.png')}
                                />
                            </Label>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
            <View style={styles.placesBlock}>
                <View style={styles.sectionDirectory}>
                    <Text style={styles.heading}>{languages.sleeping_places}</Text>
                    {renderCreateButton(languages.create, 'places', () => handleModalVisible('places'), isPlacesVisible, setIsPlacesVisible)}
                </View>
                <ScrollView
                    style={{...styles.places, paddingVertical: 10}}
                    horizontal={true}
                >
                    {places.map(({value}, index) => (
                        <TouchableOpacity key={index} onPress={() => {
                            setPlace(value)
                        }}>
                            <Label style={styles.label} place={value} focused={value === activePlace}/>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
            {!disableFeeding && !disableTags ? <View style={styles.sectionDirectory}>
                <Text style={styles.heading}>{languages.additional}</Text>
            </View> : null}
            {!disableFeeding ? <View style={styles.placesBlock}>
                <View style={styles.countFeedingContainer}>
                    <Text style={{color: theme.text}}>{languages.count_feeding}</Text>
                    <View style={styles.counterFeeding}>
                        <TouchableOpacity onPress={() => handleChangeCountFeeding('add')} style={styles.counterButton}>
                            <Image style={{width: 26, height: 26}} source={require('../../images/icons/ic_plus.png')}/>
                        </TouchableOpacity>
                        <Text style={{...styles.counterText, color: theme.text}}>{countFeeding}</Text>
                        {
                            countFeeding > 0 && <TouchableOpacity onPress={() => handleChangeCountFeeding('sub')}
                                                                  style={styles.counterButton}>
                                <Image style={{width: 26, height: 26}}
                                       source={require('../../images/icons/ic_minus.png')}/>
                            </TouchableOpacity>
                        }
                    </View>
                </View>
            </View> : null}
            {!disableTags ? <View style={styles.placesBlock}>
                <View style={styles.sectionDirectory}>
                    <Text style={styles.heading}>{languages.tags}</Text>
                    <TouchableOpacity onPress={() => navigate('AddTags', {activeTags, setTags})}>
                        <Text style={styles.buttonText}>{languages.add}</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView
                    style={{...styles.places, paddingVertical: 10}}
                    horizontal={true}
                >
                    {
                        activeTags.length
                            ? activeTags.map((tag, index) => (
                                <TouchableOpacity
                                    style={[styles.label, !!activeTags.find(v => tag.id === v.id) && styles.labelFocused]}
                                    key={index}
                                    onPress={() => handleSelectTag(tag)}
                                >
                                    <Text>{tag.value}</Text>
                                    {
                                        !!activeTags.find(v => tag.id === v.id) &&
                                        <Image
                                            style={{marginLeft: 5, width: 18, height: 18}}
                                            source={require('../../images/icons/ic_delete.png')}
                                        />
                                    }
                                </TouchableOpacity>
                            ))
                            : <View style={{flex: 1, alignItems: 'center', marginTop: 8}}>
                                <Text style={{color: theme.text}}>{languages.empty_tags}</Text>
                            </View>
                    }
                </ScrollView>
            </View> : null}
            <View>
                <Text style={styles.heading}>{languages.comment}</Text>
                <Text style={{color: theme.text}}>{comment || commentText || dream && dream.comment}</Text>
            </View>
            {
                errorText ? <View style={styles.errorContainer}>
                    <TouchableOpacity style={styles.errorImage} onPress={() => setErrorText('')}>
                        <Image style={{width: 15, height: 15}} source={require('../../images/icons/ic_delete.png')}/>
                    </TouchableOpacity>
                    <View style={styles.errorContainerText}>
                        <Text style={styles.errorText}>{errorText}</Text>
                    </View>
                </View> : null
            }
            <View>
                <Button pressHandler={handleSave} buttonText={languages.save}/>
            </View>
        </ScrollView>
    )
}
