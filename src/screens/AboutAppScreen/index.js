import React from 'react'

import {Text, View, TouchableOpacity, Image, Linking, Alert} from 'react-native'
import {useSelector} from "react-redux";

import {useRoute} from "@react-navigation/native";

import {styles} from './styles'

const _sendEmail = async () => {

    const targetEmail = 'obeycats18@gmail.com'
    const subject = 'Дневник малыша: Сон'
    const url = `mailto:${targetEmail}?subject=${subject}`

    if (await Linking.canOpenURL(url)) {
        await Linking.openURL(url)
    } else {
        Alert.alert('Невозможно открыть ссылку', 'На вашем устройстве невозможно открыть эту ссылку')
    }


}

const _openMarket = async () => {

    const packageId = 'com.lordofsmiles.BabyDream';
    const url = `market://details?id=${packageId}`;

    if(await Linking.canOpenURL(url)){
        await Linking.openURL(`market://details?id=${packageId}`);
    }else {
        Alert.alert('Невозможно открыть ссылку',  'На вашем устройстве невозможно открыть эту ссылку')
    }
}

const AboutAppScreen = () => {

    const {params} = useRoute();
    const {theme} = params ? params : {};

    const languages = useSelector(({app}) => app.languages)

    return(
        <View style={{...styles.about_container, backgroundColor: theme.background}}>
            <Text style={styles.baby_diary}>{languages.baby_diary}</Text>
            <Text style={{...styles.version, color: theme.text}}>{languages.version}: 2020.06.24</Text>
            <Text style={{...styles.about_app_desc, color: theme.text}}>{languages.about_app_desc}</Text>
            <View style={{...styles.buttonsBlock, }}>
                <TouchableOpacity style={{...styles.aboutButton, backgroundColor: theme.navigator}} onPress={_openMarket}>
                    <Image style={styles.aboutButtonIcon} source={require('../../images/icons/ic_rate.png')}/>
                    <Text style={{color: theme.text}}>{languages.rate_app}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{...styles.aboutButton, backgroundColor: theme.navigator}} onPress={_sendEmail}>
                    <Image style={styles.aboutButtonIcon} source={require('../../images/icons/ic_feedback.png')}/>
                    <Text style={{color: theme.text}}>{languages.send_feedback}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default AboutAppScreen
