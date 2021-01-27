import React, {useEffect} from "react";

import {connect} from "react-redux";

import {initChildren, changeChild} from '../../../redux/reducers/childReducer'
import {setLanguagesTC,setActiveSettingsTC} from "../../../redux/reducers/appReducer";

import SettingsScreen from "../index";
import {useNavigation} from "@react-navigation/native";

const mapStateToProps = (({child, app}) => ({
    children: child.children,
    loading: child.loading,
    activeChild: child.activeChild,
    languages: app.languages,
    theme: app.activeTheme
}))

export default connect(mapStateToProps, {initChildren, changeChild, setLanguagesTC,setActiveSettingsTC}) ( ({children, initChildren, loading, activeChild, changeChild, languages, setLanguagesTC, theme,setActiveSettingsTC}) => {

    const navigation = useNavigation()

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            initChildren()
            setLanguagesTC()
            setActiveSettingsTC('Setting')
        });
        return unsubscribe
    }, [navigation, children, activeChild, languages])


    return <SettingsScreen languages={languages} loading={loading} activeChild={activeChild} changeChild={changeChild} children={children} theme={theme} setActiveSettingsTC={setActiveSettingsTC}/>

})
