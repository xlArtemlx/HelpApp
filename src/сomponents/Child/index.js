import React  from "react";
import {Image, View, Text, TouchableOpacity} from "react-native";

import {connectActionSheet, useActionSheet} from '@expo/react-native-action-sheet'
import { formatDistanceStrict } from 'date-fns'
import {deleteChild} from '../../redux/reducers/childReducer'

import {styles} from './styles'
import {useDispatch} from "react-redux";
import {ru, enUS} from "date-fns/locale";

const _renderAge = (date, languages) => {
    return formatDistanceStrict(
        new Date(),
        new Date(date),
        {locale: languages.fns_locale === 'eu' ? enUS : ru}
    )
}

const _onOpenActionSheet = ({showActionSheetWithOptions, child, dispatch, changeChild}) => {

    const options = ['Выбрать', 'Удалить', 'Отменить'];
    const cancelButtonIndex = 2;

    showActionSheetWithOptions(
        {
            options,
            cancelButtonIndex
        },
        buttonIndex => {
            if (buttonIndex === 1) dispatch(deleteChild(child.id))
            if (buttonIndex === 0) {
                changeChild(child)
            }
        },
    );
};

const Child = ({child, activeChild, changeChild, languages}) => {

    const {showActionSheetWithOptions} = useActionSheet();

    const dispatch = useDispatch()

    return (
        <TouchableOpacity onPress={() => _onOpenActionSheet({
            showActionSheetWithOptions,
            child,
            dispatch,
            activeChild,
            changeChild
        })}
            style={styles.childItem}
        >
            <View style={styles.childContainer}>
                <View>
                    {
                        child.gender === 'male'
                            ? <Image style={styles.childImage} source={require('../../images/icons/ic_boy.png')}/>
                            : <Image style={styles.childImage} source={require('../../images/icons/ic_girl.png')}/>
                    }
                </View>
                <View>
                    <Text>
                        <Text style={styles.childNameText}>{child.name}</Text>
                    </Text>
                    <Text>
                        <Text style={styles.childBirthdayText}>{_renderAge(child.date, languages)}</Text>
                    </Text>
                </View>
                {
                    activeChild && child.id === activeChild.id &&
                    <View style={styles.checkIcon}>
                        <Image source={require('../../images/icons/ic_check.png')} style={{width: 26, height: 26}}/>
                    </View>
                }

            </View>
        </TouchableOpacity>
    )
}

export default connectActionSheet(Child)
