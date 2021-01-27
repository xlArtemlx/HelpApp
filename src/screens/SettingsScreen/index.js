import React from "react";
import {Text, View, TouchableOpacity, ActivityIndicator, Image, ScrollView} from "react-native";
import {Button, CenterBlock, Child} from "../../components";


import {styles} from './styles'
import {useNavigation,useRoute} from "@react-navigation/native";


const _settingsSection = languages => ([
    {route: 'Reservation', img: require('../../images/icons/ic_cloud.png'), title: languages.reservation},
    {route: 'Recommendations', img: require('../../images/icons/ic_indicators.png'), title: languages.recommendation},
    {route: 'SettingsView', img: require('../../images/icons/ic_settings.png'), title: languages.settings},
    {route: 'Directory', img: require('../../images/icons/ic_data.png'), title: languages.ref_book},
    {route: 'AboutApp', img: require('../../images/icons/ic_help.png'), title: languages.about_app},
])

const SettingsScreen = ({children, loading, changeChild, activeChild, languages, theme,setActiveSettingsTC}) => {

    const {navigate} = useNavigation()
    const {name} = useRoute()

    const _handleClick = () => {
        navigate('AddChild', {goToBack: true, navigate})
    }

    const _handleNavigate = (path) => {
        navigate(path, {theme})
        setActiveSettingsTC(path)
    }

   

    return (
        <ScrollView style={{...styles.settingsContainer, backgroundColor: theme.background}}>
            <View style={styles.childrenBlock}>
                <Text style={styles.settingsSectionTitle}>{languages.children}</Text>
                <View>
                    {
                        loading
                            ? <CenterBlock><ActivityIndicator size="large" color="#e91e63" /></CenterBlock>
                            : children && children.map((child, index) => <Child languages={languages} changeChild={changeChild} activeChild={activeChild} key={index} child={child} navigate={navigate} theme={theme}/>)
                    }

                </View>
                <Button style={{marginHorizontal: 15, color: theme.text}} buttonText={languages.create_child} pressHandler={_handleClick}/>
            </View>

            <View>
                <Text style={styles.settingsSectionTitle}>{languages.additional}</Text>
                <View  style={{...styles.addBlock, backgroundColor: theme.background}}>

                    {
                        _settingsSection(languages).map( section => (
                            <TouchableOpacity onPress={() => _handleNavigate(section.route)} style={{...styles.settingsLink, backgroundColor: theme.navigator}} key={section.title}>
                                <Image style={styles.settingsLinkIcon} source={section.img}/>
                                <Text style={{color: theme.text}}>{section.title}</Text>
                            </TouchableOpacity>
                        ))
                    }

                </View>
            </View>
        </ScrollView>
    );
}

export default SettingsScreen
