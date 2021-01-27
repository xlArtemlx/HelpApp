import React from "react";
import {Text} from "react-native";

import {styles} from './styles'

const _styles = (focused, style, tag) => {
    return {
        ...style,
        ...styles.placeLabel,
        ...focused && styles.focused,
        ...tag && styles.tag
    }
}

const Label = ({style, place, focused, children, tag, languages, feed}) => {
    return (
        <Text style={_styles(focused, style, tag)}>{feed && languages.count_feeding + ': '}{children && children}{place}</Text>
    )
}

export default Label
