import React from 'react'
import {DreamComment, NewDream} from "../../screens";
import {useRoute} from "@react-navigation/native";
import {useTopTabNavigator} from "../../hooks/useTopTabNavigator";
import {useSelector} from "react-redux";


const screens = (params, languages) => [
    {
        name: 'Dream',
        component: () => {
            const {date, dream, isNew} = params;
            return <NewDream isNew={isNew} date={date} dream={dream}/>
        },
        options: {title: `${languages.dream}`}
    },
    {
        name: 'DreamComment',
        component: () => {
            const {date, dream, isNew} = params
            return <DreamComment isNew={isNew} date={date} dream={dream}/>
        },
        options: {title: `${languages.comment}`}
    },
]

const DreamTabNavigator = () => {

    const {params} = useRoute()

    const languages = useSelector( ({app}) => app.languages)

    const navigator = useTopTabNavigator(screens(params || {}, languages))

    return navigator
}

export default DreamTabNavigator
