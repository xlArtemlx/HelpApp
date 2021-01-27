import React, {useState} from "react";
import {AddTags, Main} from "../../screens";
import {Calendar, CreateInfoForm, TimePicker} from "../../components";
import DreamTabNavigator from "../DreamTabNavigator";
import {useNavigator} from "../../hooks/useNavigator";
import {useDispatch, useSelector} from "react-redux";
import {Text, View, TouchableOpacity, Image, Dimensions, Share} from "react-native";
import {useNavigation} from "@react-navigation/native";
import Modal from "react-native-modal";
import {useActionSheet} from '@expo/react-native-action-sheet';
import {endDreamTC} from "../../redux/reducers/mainReducer";
import {_statisticsSection} from "../../components/StatisticsOnce";
import Label from '../../components/Label/index'
import {accent} from "../../core/colors";

const styles = {
    editorText: {
        fontSize: 13,
        color: '#fff',
        marginRight: 15,
        textTransform: 'uppercase'
    },
    shareImage: {
        width: 26,
        height: 26
    },
    addImage: {
        width: 22,
        height: 22
    },
    headerButtons: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15
    },

    modalContent: {
        borderRadius: 3,
        backgroundColor: '#fff',
        padding: 15
    },
    modalContainer: {
        marginHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 0,
    },

    listOfShareContainer: {
        padding: 10,
        backgroundColor: '#fff'
    },

    headerText: {
        fontSize: 25
    },

    itemOfShare: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 10
    },

    itemOfShareText: {
        fontSize: 20
    },

    shareButton: {
        backgroundColor: accent,
        borderRadius: 4,
        marginVertical: 5
    }
}

const deviceWidth = Dimensions.get('window').width;

const _onOpenActionSheet = ({showActionSheetWithOptions, navigate, date, dream, dispatch,languages}) => {

    const options = [languages.finish_now, languages.edit, languages.add_new];
    const cancelButtonIndex = 3;
    const icons = [
        <Image style={{width: 30, height: 30}} source={require('../../images/icons/ic_check.png')}/>,
        <Image style={{width: 30, height: 30}} source={require('../../images/icons/ic_edit.png')}/>,
        <Image style={{width: 30, height: 30}} source={require('../../images/icons/ic_plus.png')}/>
    ];

    showActionSheetWithOptions(
        {
            options,
            cancelButtonIndex,
            icons
        },

        buttonIndex => {
            if (buttonIndex === 0) {
                dispatch(endDreamTC(date, dream))
            } else if (buttonIndex === 1) {
                navigate('NewDream', {date, dream})
            } else if (buttonIndex === 2) {
                navigate('NewDream', {isNew: true})
            }
        },
    );
};

export const _renderCreateButton = ({visible, setVisible, _handleButtonPressed}) => {

    return (
        <View style={{marginHorizontal: 20}}>
            <TouchableOpacity style={{marginRight: 15}} onPress={_handleButtonPressed}>
                <Image  style={[styles.addImage, {tintColor: '#fff'}]} source={require('../../images/icons/ic_plus.png')}/>
            </TouchableOpacity>
            {visible && <Modal
                isVisible={visible}
                onBackdropPress={() => setVisible(false)}
                hideModalContentWhileAnimating
                backdropOpacity={0.40}
                style={styles.modalContainer}
            >
                <View style={{
                    ...styles.modalContent,
                    width: deviceWidth - 40
                }}>
                    <CreateInfoForm visible={visible} type='tags' setVisible={setVisible}/>
                </View>
            </Modal>}
        </View>
    )
};

const handleEditorPress = (dream, navigate, date, showActionSheetWithOptions, dispatch,languages) => {
    dream ? _onOpenActionSheet({
        showActionSheetWithOptions,
        navigate,
        date,
        dream,
        dispatch,
        languages
    }) : navigate('NewDream', {isNew: true});
};


const _shareSettings = () => {
    return [
        {
            id: 'night_sleep',
            title: `Ночной сон: `
        },
        {
            id: 'wakefulness',
            title: `Бодрствование: `
        },
        {
            id: 'comments',
            title: `Комментарии: `
        },
        {
            id: 'statistic',
            title: `Статистика: `
        },
    ]
};

const yesOrNo = [{title: 'Да', value: 'yes'}, {title: 'Нет', value: 'no'}];

const onShare = async (date, dreams, languages, nightDream, wakefulness, comment, statistic, setVisible) => {

    if (dreams.length === 0) {
        alert('У вас нет ни одного сна');
    } else {
        try {
            const result = await Share.share({
                message:
                    date.local().format('DD MMM') + '\n' +
                    dreams.map(dream => {
                        return (
                            dream.timeOfDay === 'night' ? !nightDream ? '' : 'Ночной сон с ' + dream.startTime + ' до ' + dream.endTime + '\n' :
                                'Дневной сон c ' + dream.startTime + ' до ' + dream.endTime + ' *' + (comment ? dream.comment : '') + '*' + '\n' +
                                (wakefulness ? 'Бодрствование: ' + dream.wakefulness.value + '\n' : '')
                        )
                    }) + (statistic ? 'Статистика:' + '\n' + _statisticsSection(dreams, languages).map(field => {
                        return field.title + field.value + '\n'
                    }) : '')
            });
        } catch (error) {
            alert(error.message);
        }
    }
    setVisible(false)
};

const setShare = (setting, value, setNightDream, setWakefulness, setComment,  setStatistic) => {
    if (setting.id === 'night_sleep') {
        value.value === 'yes' ? setNightDream(true) : setNightDream(false)
    } else if (setting.id === 'wakefulness') {
        value.value === 'yes' ? setWakefulness(true) : setWakefulness(false)
    } else if (setting.id === 'comments') {
        value.value === 'yes' ? setComment(true) : setComment(false)
    } else if (setting.id === 'statistic') {
        value.value === 'yes' ? setStatistic(true) : setStatistic(false)
    }
};

const setFocus = (setting, value, nightDream, wakefulness, comment, statistic) => {
    if (setting.id === 'night_sleep') {
        return value.value === 'yes' ? nightDream : !nightDream
    } else if (setting.id === 'wakefulness') {
        return value.value === 'yes' ? wakefulness : !wakefulness
    } else if (setting.id === 'comments') {
        return value.value === 'yes' ? comment : !comment
    } else if (setting.id === 'statistic') {
        return value.value === 'yes' ? statistic : !statistic
    }
};

const screens = (languages, navigate, visible, setVisible, _handleButtonPressed, showActionSheetWithOptions, date, dream, dispatch, dreams,
                 nightDream, setNightDream,
                 wakefulness, setWakefulness,
                 comment, setComment,
                 statistic, setStatistic) => [
    {
        name: 'Home',
        component: Main,
        options: { headerRight: () => (
            <View style={styles.headerButtons}>
                <TouchableOpacity onPress={() => handleEditorPress(dream, navigate, date, showActionSheetWithOptions, dispatch,languages)}>
                    <Text style={styles.editorText}>{languages.editor_sleep}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setVisible(!visible)}>
                    <Image style={styles.shareImage} source={require('../../images/icons/ic_share.png')}/>
                </TouchableOpacity>
                {visible && <Modal
                    isVisible={visible}
                    onBackdropPress={() => setVisible(false)}
                    hideModalContentWhileAnimating
                    backdropOpacity={0.40}
                    style={styles.modalContainer}
                    animationIn={'none'}
                >
                    <View style={styles.listOfShareContainer}>
                        <Text style={styles.headerText}>Отчет за {date.local().format('DD MMM')}</Text>
                        {_shareSettings().map(setting => {
                            return (
                                <View style={styles.itemOfShare}>
                                    <Text style={styles.itemOfShareText}>{setting.title}</Text>
                                    <View style={{flexDirection: 'row'}}>
                                        {
                                            yesOrNo.map(value => {
                                                return (
                                                    <TouchableOpacity
                                                        activeOpacity={1}
                                                        onPress={() => setShare(setting, value, setNightDream, setWakefulness, setComment, setStatistic)}>
                                                        <Label style={{width: 50, padding: 5, borderWidth: 2}}
                                                               focused={setFocus(setting, value, nightDream, wakefulness, comment, statistic)}>
                                                            <Text>{value.title}</Text>
                                                        </Label>
                                                    </TouchableOpacity>
                                                )
                                            })
                                        }
                                    </View>
                                </View>
                            )
                        })}
                        <TouchableOpacity
                            style={styles.shareButton}
                            onPress={() => onShare(date, dreams, languages, nightDream, wakefulness, comment, statistic, setVisible)}>
                            <Text style={{fontSize: 20, color: '#fff', textAlign: 'center', padding: 3}}>Поделиться</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>}
            </View>

            ) }
    },
    {
        name: 'Calendar',
        component: Calendar,
        options: {}
    },
    {
        name: 'NewDream',
        component: DreamTabNavigator,
        options: {headerTitle: () => <Text style={{color: '#fff', fontWeight: 'bold'}}>{languages.editing}</Text>}
    },
    {
        name: 'SetTime',
        component: TimePicker,
        options: {}
    },
    {
        name: 'AddTags',
        component: AddTags,
        options: {
            headerTitle: () => <Text style={{color: '#fff', fontWeight: 'bold'}}>{languages.select_tag}</Text>,
            headerRight: () => _renderCreateButton({visible, setVisible, _handleButtonPressed})
        }
    }
]

export const HomeNavigator = () => {

    const {showActionSheetWithOptions} = useActionSheet();
    const dispatch = useDispatch();

    const {navigate} = useNavigation();
    const [visible, setVisible] = useState(false);
    const [nightDream, setNightDream] = useState(true);
    const [wakefulness, setWakefulness] = useState(true);
    const [comment, setComment] = useState(true);
    const [statistic, setStatistic] = useState(true);

    const _handleButtonPressed = () => setVisible(!visible);

    const languages = useSelector(({app}) => app.languages);
    const date = useSelector(({date}) => date.date);
    const dreams = useSelector(({date}) => date.dreams);
    const dream = dreams.find(dream => dream.started);


    const navigator = useNavigator(screens(
        languages, navigate, visible, setVisible, _handleButtonPressed,
        showActionSheetWithOptions, date, dream, dispatch, dreams,
        nightDream, setNightDream,
        wakefulness, setWakefulness,
        comment, setComment,
        statistic, setStatistic));

    return navigator
}
