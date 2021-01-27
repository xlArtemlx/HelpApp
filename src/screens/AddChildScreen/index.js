import React from 'react'
import {View} from "react-native";
import {CenterBlock, CreateChildForm} from "../../components";
import {useRoute} from "@react-navigation/native";

import {styles} from './styles'
import {useSelector} from "react-redux";


const AddChild = () => {

    const {params} = useRoute();
    const {goToBack, navigate, child} = params;

    return(
        <CenterBlock style={styles.centerBlock}>
            <View style={styles.createChildFormContainer}>
                <CreateChildForm goToBack={goToBack} navigate={navigate} child={child}/>
            </View>
        </CenterBlock>
    )
}

export default AddChild
