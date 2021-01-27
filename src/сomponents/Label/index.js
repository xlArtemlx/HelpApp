import React from "react";
import {Text} from "react-native";

import {styles} from './styles'

const _styles = (focused, style) => {
    return {
        ...style,
        ...styles.placeLabel,
        ...focused && styles.focused
    }
}

const Label = ({style, place, focused, children}) => {
    return (
        <Text style={_styles(focused, style)}>{children && children}{place}</Text>
    )
}

export default Label
