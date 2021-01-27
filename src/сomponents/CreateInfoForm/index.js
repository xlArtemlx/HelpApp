import React, {useState} from "react";
import {Text, TextInput, TouchableOpacity, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {createInfo, editInfo} from '../../redux/reducers/directoryReducer'

import {styles} from "./styles";

const CreateInfoForm = ({type, setVisible, id, editMode, infoValue}) => {

    const [value, setValue] = useState(infoValue ||'')
    const dispatch = useDispatch()
    const languages = useSelector( ({app}) => app.languages)

    const _handleTextChanged = value => setValue(value)

    const _handleEditInfo = () => {
        dispatch(editInfo(type, value, id))
        setVisible(false)
        setValue('')
    }

    const _handleCreateInfo = () => {
        dispatch(createInfo(type, value))
        setVisible(false)
        setValue('')
    }
    const _handleCancel = () => {
        setVisible(false)
        setValue('')
    }

    return (
        <View>
            <Text style={styles.formHeading}>
                {
                    editMode
                        ? type === 'places' ? `${languages.edit_form} ${languages.sleeping_places.toLowerCase()}` : `${languages.edit_form} ${languages.tag.toLowerCase()}`
                        : type === 'places' ? `${languages.new_place}` : `${languages.new_tag}`
                }</Text>
            <TextInput
                style={styles.inputStyle}
                value={value}
                onChangeText={_handleTextChanged}
            />
            <View style={styles.buttonPanel}>
                <TouchableOpacity style={styles.createInfoButton} onPress={editMode ? _handleEditInfo : _handleCreateInfo}>
                    <Text style={styles.buttonText}>{languages.create}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.createInfoButton} onPress={_handleCancel}>
                    <Text style={styles.buttonText}>{languages.cancel}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default CreateInfoForm
