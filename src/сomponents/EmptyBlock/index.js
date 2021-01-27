import React from "react";
import {Text, View} from "react-native";

import {styles} from "./styles";

const EmptyBlock = ({emptyText}) => {
    return (
        <View>
            <Text style={styles.emptyText}>{emptyText}</Text>
        </View>
    )
}

export default EmptyBlock
