import React from 'react'
import {useEffect} from "react";

import {connect} from 'react-redux'

//Reducers
import {setLanguagesTC, setLaunchTC, setNightTimeTC, setTheme,setActiveSettingsTC} from '../../../redux/reducers/appReducer'

import LaunchScreen from "../index";
import {initChildren} from "../../../redux/reducers/childReducer";
import {createDefaultInfo} from "../../../redux/reducers/directoryReducer";

import {lightMode} from "../../../core/colors";

const mapStateToProps = ({app}) => ({
    isLaunched: app.isLaunched,
    languages: app.languages,
    active: app.activeSettings
})

export default connect(mapStateToProps, {setLaunchTC, setLanguagesTC, setNightTimeTC, initChildren, createDefaultInfo, setTheme,setActiveSettingsTC})( ({initChildren, setNightTimeTC, isLaunched, setLaunchTC, setLanguagesTC, languages, createDefaultInfo, setTheme,active,setActiveSettingsTC}) => {


    useEffect(() => {
        setLanguagesTC()
    }, [languages]);

    useEffect(() => {
        setLaunchTC()
        setNightTimeTC('start')
        setNightTimeTC('end')
        initChildren()
        createDefaultInfo('places')
        createDefaultInfo('tags');
        setTheme(lightMode);
    }, [isLaunched])

    return <LaunchScreen isLaunched={isLaunched} setLaunchTC={setLaunchTC} active={active}/>
})

