import React, {useState} from "react";

import {Text, TextInput, View, TouchableOpacity, Dimensions, Image} from "react-native";
import DatePicker from "react-native-datepicker";
import {Button} from '../index'

import {createChildren} from '../../redux/reducers/childReducer'

import {styles} from "./styles";
import {useDispatch, useSelector} from "react-redux";

const deviceWidth = Dimensions.get('window').width

const genders = languages => [{title: `${languages.gender_female}`, value: 'female'}, {title: `${languages.gender_male}`, value: 'male'}]

const CreateChildForm = ({setLaunchTC, goToBack, navigate}) => {
    
    const languages = useSelector( ({app}) => app.languages)
    const [labelVisible, setLabelVisible] = useState(false)
    const [placeholder, setPlaceholder] = useState(languages.name)
    const [isFocus, setIsFocus] = useState(false)

    const dispatch = useDispatch()
    

    const [name, setName] = useState('')
    const [date, setDate] = useState(new Date())
    const [activeGender, setGender] = useState(genders(languages)[0].value)

    const _handleNameChange = name => setName(name)
    const _handleGenderChange = gender => setGender(gender)
    const _handleDateChange = date => setDate(date)

    const _handleInputFocused = () => {
        setLabelVisible(true)
        setPlaceholder('')
        setIsFocus(true)
    }

    const _handleCreate = () => {
        const payload = {
            name,
            gender: activeGender,
            date
        }

        dispatch(createChildren(payload))
        if(setLaunchTC) setLaunchTC()
        if(goToBack && navigate) {
            navigate('Settings')
        }
    }


    return (
        <View style={styles.createChildForm}>
            <View style={[styles.inputContainer, isFocus && styles.inputContainerFocused]}>
                <Text style={[styles.formInputText, !labelVisible && {display: 'none'}]}>{languages.name}</Text>
                <TextInput
                    blurOnSubmit
                    onFocus={_handleInputFocused}
                    style={styles.formInput}
                    value={name}
                    onChangeText={(text) => _handleNameChange(text)}
                    placeholder={placeholder}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.formInputText}>{languages.birthday}</Text>
                <DatePicker
                    style={{width: deviceWidth - 60}}
                    customStyles={{
                        dateInput: {...styles.formInput, borderWidth: 0},
                        dateText: {alignSelf: 'flex-start'}
                    }}
                    showIcon={false}
                    format='DD.MM.YYYY'
                    date={date}
                    placeholder="День рождения"
                    confirmBtnText="Выбрать"
                    cancelBtnText="Отмена"
                    onDateChange={_handleDateChange}
                />
            </View>
            <View style={styles.gendersContainer}>
                {genders(languages).map((gender, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[styles.genderButton, gender.value === activeGender && styles.genderButtonActive]}
                        onPress={() => _handleGenderChange(gender.value)}
                    >
                        <Text
                            style={gender.value === activeGender && {color: '#fff'}}
                        >
                            {
                                gender.value === 'male'
                                    ? <Image source={require('../../images/icons/ic_boy.png')} style={{...styles.genderIcon, ...gender.value === activeGender ? styles.genderFocus : styles.genderUnFocus}}/>
                                    : <Image source={require('../../images/icons/ic_girl.png')}  style={{...styles.genderIcon, ...gender.value === activeGender ? styles.genderFocus : styles.genderUnFocus}}/>
                            }
                            {gender.title}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <View style={{marginTop: 210}}>
                <Button pressHandler={_handleCreate} buttonText={languages.create}/>
            </View>
        </View>
    )
}

export default CreateChildForm
