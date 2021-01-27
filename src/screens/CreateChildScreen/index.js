import React  from 'react'
import {View, Text, Dimensions} from "react-native";
import {CreateChildForm} from "../../components";

import {styles} from './styles'

const deviceHeight = Dimensions.get('window').height

const CreateChild = ({children, setLaunchTC}) => {
    return(
        <View style={[{height: deviceHeight}, styles.createChildContainer ]}>
            <Text style={styles.createFormTitle}>Введите имя вашего малыша. Позже вы сможете добавлять сны и вести статистику</Text>
            <Text style={styles.createFormDesc}>Позже вы сможете добавить еще малышей и переключаться между ними в процессе работы приложения</Text>
            <CreateChildForm children={children} setLaunchTC={setLaunchTC}/>
        </View>

    )
}

export default CreateChild
