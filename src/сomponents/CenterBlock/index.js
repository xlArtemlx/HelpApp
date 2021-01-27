import React from "react";
import {View} from 'react-native'
import {styles} from './styles'

const CenterBlock = ({children, style}) => {
    return(
        <View style={{...style, ...styles.centerBlock}}>
            {children}
        </View>
    )
}

export default CenterBlock
