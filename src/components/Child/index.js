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

const _onOpenActionSheet = ({showActionSheetWithOptions, child, dispatch, changeChild, navigate,languages}) => {

    

    const options = [languages.select, languages.delete, languages.edit, languages.cancel];
  
    const cancelButtonIndex = 3;
    const icons = [
        <Image style={styles.actionSheetIcon} source={require('../../images/icons/ic_check.png')}/>,
        <Image style={styles.actionSheetIcon} source={require('../../images/icons/ic_delete.png')}/>,
        <Image style={styles.actionSheetIcon} source={require('../../images/icons/ic_edit.png')}/>,
        <Image style={styles.actionSheetIcon} source={require('../../images/icons/ic_arrow_left.png')}/>
    ];

    showActionSheetWithOptions(
        {
            options,
            cancelButtonIndex,
            icons
        },
        buttonIndex => {
            if (buttonIndex === 1) dispatch(deleteChild(child.id))
            if (buttonIndex === 0) {
                changeChild(child)
            }
            if(buttonIndex === 2) navigate('AddChild', {goToBack: true, navigate, child})

        },
    );
};

const Child = ({child, activeChild, changeChild, languages, navigate, theme}) => {

    const {showActionSheetWithOptions} = useActionSheet();

    const dispatch = useDispatch()

    return (
        <TouchableOpacity onPress={() => _onOpenActionSheet({
            showActionSheetWithOptions,
            child,
            dispatch,
            activeChild,
            changeChild,
            navigate,
            languages
        })}
            style={{...styles.childItem, backgroundColor: theme && theme.navigator}}
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
                        <Text style={{...styles.childNameText, color: theme && theme.text}}>{child.name}</Text>
                    </Text>
                    <Text>
                        <Text style={{...styles.childBirthdayText, color: theme && theme.text}}>{_renderAge(child.date, languages)}</Text>
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
