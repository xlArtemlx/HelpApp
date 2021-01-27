import {Text, TouchableOpacity} from "react-native";
import React from "react";

import {styles} from "./styles";

const Button = ({style, pressHandler, buttonText}) => {
    return (
        <TouchableOpacity style={{...style, ...styles.button, }} onPress={pressHandler}>
            <Text style={styles.buttonText}>{buttonText}</Text>
        </TouchableOpacity>
    )
}

export default Button
