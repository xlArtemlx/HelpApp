import React, {useState} from "react";

import {Text, View, TouchableOpacity, Image, ScrollView, Switch,Button} from 'react-native'
//import DatePicker from "react-native-datepicker";
import DateTimePicker from '@react-native-community/datetimepicker'


import {styles} from './styles'
import moment from "moment";
import {Feather} from "@expo/vector-icons";

import {darkMode, lightMode} from "../../core/colors";

import {connectActionSheet, useActionSheet} from '@expo/react-native-action-sheet'
import { setEndNightSleep } from "../../redux/reducers/appReducer";

const _onOpenActionSheet = ({showActionSheetWithOptions, setTheme,languages}) => {
    
    

    const options = [languages.light, languages.dark, languages.cancel];
    const cancelButtonIndex = 2;
    const icons = [
        <Image style={styles.actionSheetIcon} source={require('../../images/day.png')}/>,
        <Image style={styles.actionSheetIcon} source={require('../../images/night.png')}/>,
        <Image style={styles.actionSheetIcon} source={require('../../images/icons/ic_arrow_left.png')}/>
    ];

    showActionSheetWithOptions(
        {
            options,
            cancelButtonIndex,
            icons
        },

        buttonIndex => {
            if (buttonIndex === 0) {
                setTheme(lightMode);
            } else if (buttonIndex === 1) {
                setTheme(darkMode)
            }
        },
    );
};

const languagesSettings = languages => ([
    {
        value: 'en',
        title: languages.language_us
    },
    {
        value: 'ru',
        title: languages.language_ru
    },
])

const datePickerStyle = {

}

const _settingsAdditionals = languages => [
    {
        title: `${languages.feeding}`,
        value: 'feeding',
    },
    {
        title: `${languages.tags}`,
        value: 'tags'
    },
];

const _renderSettings = (setting, theme, enableAdds,index) => {

    const [isEnabled, setIsEnabled] = useState(true);

    const toggleEnableAdds = () => {
        setIsEnabled(!isEnabled);
        enableAdds(setting.value)
    };

    return (
        <View key={index}>
            <View  style={{...styles.settingStatisticItem, paddingVertical: 15, backgroundColor: theme.navigator}}>
                <Text style={{color: theme.text}}>{setting.title}</Text>
                <Switch
                    onValueChange={toggleEnableAdds}
                    value={isEnabled}>
                </Switch>
            </View>
        </View>
    )

};

const SettingsGeneralScreen = ({endNightSleep, startNightSleep, setNightTimeTC, languages, activeLanguage, setActiveLanguageTC, setTheme, theme, enableAdds}) => {


    const {showActionSheetWithOptions} = useActionSheet();
    const startNightSleepTC = typeof(startNightSleep) === 'string'  ?  new Date().setHours(20, 0) : startNightSleep
    const endNightSleepTC = typeof (endNightSleep) === 'string' ? new Date().setHours(6, 0) : endNightSleep 


    const [startTimeS,setStartTimeS] = useState(startNightSleepTC);
    const [endTimeS,setEndTimeS] = useState(endNightSleepTC);

    const [showStart, setShowStart] = useState(false);
    const [showEnd, setShowEnd] = useState(false);




    const _handleLanguagePress = value => {
        setActiveLanguageTC(value)
    }


    const _handleDateChangeStart = (event, date) => {
        const type = 'start'
           if(date){
            setNightTimeTC(type, date)
            setShowStart(false)
            setStartTimeS(date)
           }
        
    }
    const _handleDateChangeEnd = (event, date) => {
        const type = 'end'
        if(date){
            setNightTimeTC(type, date)
            setShowEnd(false)
            setEndTimeS(date)
        }else {
            setNightTimeTC(type, endTimeS)
            setShowEnd(false)
            setEndTimeS(endTimeS)
        }
    }

    const showTimepickerStart = () => {
        setShowStart(true)
      };
    const showTimepickerEnd = () => {
        setShowEnd(true)
      };



    return (
        <ScrollView style={{...styles.settingStatisticsContainer, backgroundColor: theme.background}}>
            <View>
                <Text style={styles.settingsSectionTitle}>{languages.decor}</Text>
                <View style={{marginTop: 10, marginBottom: 20}}>
                    <TouchableOpacity onPress={() => _onOpenActionSheet({
                        showActionSheetWithOptions,
                        setTheme,
                        languages
                    })}
                        style={{...styles.settingStatisticItem, paddingVertical: 15, backgroundColor: theme.navigator}}>
                        <Text style={{color: theme.text}}>{languages.color_scheme}</Text>
                        <Text style={{color: theme.text, opacity: 0.5}}>
                            {theme.text === 'black' ? languages.light : languages.dark}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View>
                <Text style={styles.settingsSectionTitle}>{languages.night_sleep}</Text>
                <Text style={styles.settingsDescription}>{languages.setting_general_desc}</Text>
                <TouchableOpacity onPress={showTimepickerStart}>
                    <View style={{...styles.settingStatisticItem, paddingVertical: 15, backgroundColor: theme.navigator}}>
                        <Text style={{...styles.formInputText, color: theme.text}}>{languages.nighttime_start}</Text>
                        <Text style={{...styles.settingsTimePicker,...datePickerStyle,color: theme.text, opacity: 0.5}}>
                            {new Date(startTimeS).getHours()} : {new Date(startTimeS).getMinutes()}
                        </Text>
                        {
                            showStart ? <DateTimePicker
                            style={{width: 50}}
                            customStyles={{
                                ...styles.settingsTimePicker,
                                ...datePickerStyle
                            }}
                            showIcon={false}
                            mode='time'
                            value={startTimeS}
                            confirmBtnText="Выбрать"
                            cancelBtnText="Отмена"
                            onChange={_handleDateChangeStart}
                            style={{justifyContent:'space-between'}}
                        /> : <View></View>
                        }
                        
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={showTimepickerEnd}>
                    <View style={{...styles.settingStatisticItem, paddingVertical: 15, backgroundColor: theme.navigator}}>
                        <Text style={{...styles.formInputText, color: theme.text}}>{languages.nighttime_end}</Text>
                        <Text style={{...styles.settingsTimePicker,...datePickerStyle,color: theme.text, opacity: 0.5 , alignSelf:'flex-end'}}>
                        {new Date(endTimeS).getHours()} : {new Date(endTimeS).getMinutes()}
                        </Text>
                        {
                            showEnd ? <DateTimePicker
                            style={{width: 50}}
                            customStyles={{
                                ...styles.settingsTimePicker,
                                ...datePickerStyle
                            }}
                            showIcon={false}
                            mode='time'
                            value={endTimeS}
                            confirmBtnText="Выбрать"
                            cancelBtnText="Отмена"
                            onChange={_handleDateChangeEnd}
                        /> : <Text></Text>
                        }
                    </View>
                </TouchableOpacity>
            </View>

            <View style={{marginTop: 20, marginBottom: 20}}>
                <Text style={{...styles.settingsSectionTitle, marginBottom: 10}}>{languages.language_title}</Text>
                {
                    languagesSettings(languages).map((language, index) => (
                        <TouchableOpacity onPress={() => _handleLanguagePress(language.value)}
                                          style={{...styles.settingStatisticItem, paddingVertical: 15, backgroundColor: theme.navigator}} key ={index}>
                            <Text style={{color: theme.text}}>{language.title}</Text>
                            {
                                (language.value === activeLanguage) && <View style={styles.checkIcon}>
                                    <Feather name="check" size={20} color={theme.text}/>
                                </View>
                            }
                        </TouchableOpacity>
                    ))
                }
            </View>
            <View style={{marginBottom: 25}}>
                <Text style={{...styles.settingsSectionTitle, marginBottom: 10}}>{languages.additional}</Text>
                {
                    _settingsAdditionals(languages).map((setting, index) => _renderSettings(setting, theme, enableAdds,index))
                }
            </View>
        </ScrollView>
    )
}

export default connectActionSheet(SettingsGeneralScreen)
