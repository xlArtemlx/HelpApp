import React, {useEffect} from 'react'

import {ActivityIndicator} from 'react-native'

import {connect} from 'react-redux'

import {NewDreamScreen} from '../index'
import {CenterBlock} from "../../../components";
import {getInfo} from "../../../redux/reducers/directoryReducer";
import {setLanguagesTC} from "../../../redux/reducers/appReducer";
import {useNavigation} from "@react-navigation/native";
import {getCurrentDream, startDreamTC, endDreamTC} from "../../../redux/reducers/mainReducer";

const mapStateToProps = (({directory, app, date}) => ({
    places: directory.places,
    tags: directory.tags,
    languages: app.languages,
    theme: app.activeTheme,
    disableTags: directory.disableTags,
    disableFeeding: directory.disableFeeding,
    dreams: date.dreams,
    date: date.date
}))

export default connect(mapStateToProps, {
    getInfo,
    setLanguagesTC,
    getCurrentDream,
    startDreamTC,
    endDreamTC
})(({dream, date, isNew, getInfo, places, tags, setLanguagesTC, languages, startDreamTC, endDreamTC, theme, disableTags, disableFeeding, dreams}) => {

    const navigation = useNavigation()

    useEffect(() => {
        setLanguagesTC()
    }, [languages])

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getInfo('places')
            getInfo('tags')
        });
        return unsubscribe
    }, [navigation])


    return (
        dream || isNew
            ? <NewDreamScreen
                isNew={isNew}
                date={date}
                dream={dream}
                places={places}
                tags={tags}
                languages={languages}
                startDreamTC={startDreamTC}
                endDreamTC={endDreamTC}
                theme={theme}
                disableTags={disableTags}
                disableFeeding={disableFeeding}
                dreams={dreams}
            />
            : <CenterBlock><ActivityIndicator size="large" color="#e91e63"/></CenterBlock>
    )


})
