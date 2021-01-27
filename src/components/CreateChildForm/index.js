import React, {useState} from "react";

import {Text, TextInput, View, TouchableOpacity, Dimensions, Image} from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import {Button} from '../index';

import {createChildren, editChild} from '../../redux/reducers/childReducer';

import {styles} from "./styles";
import {useDispatch, useSelector} from "react-redux";

const deviceWidth = Dimensions.get('window').width;

const genders = languages => [{title: `${languages.gender_female}`, value: 'female'}, {title: `${languages.gender_male}`, value: 'male'}];

const CreateChildForm = ({setLaunchTC, goToBack, navigate, child}) => {
    
    const languages = useSelector( ({app}) => app.languages);
    const [labelVisible, setLabelVisible] = useState(false);
    const [placeholder, setPlaceholder] = useState(languages.name);
    const [isFocus, setIsFocus] = useState(false);

    const dispatch = useDispatch();
    

    const [name, setName] = useState(child && child.name || '');
    const [date, setDate] = useState(child && new Date(child && child.date)|| new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [activeGender, setGender] = useState(child && child.gender || genders(languages)[0].value);

    const _handleNameChange = name => setName(name);
    const _handleGenderChange = gender => setGender(gender);

    const _handleDateChange = (event, selectedDate) => {
        setShow(Platform.OS === 'ios');
        if (selectedDate) {
            const currentDate = selectedDate;
            setDate(currentDate);
        }
        setShow(false);
    };

    const showMode = currentMode => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const DATE = date.toISOString().slice(0,10);

    const _handleInputFocused = () => {
        setLabelVisible(true);
        setPlaceholder('');
        setIsFocus(true)
    };

    const _handleCreate = () => {
        let valid = languages.valid_form
        if(name !== null && name.length < 3){ alert(valid)} 
        else if (!child) {
            const payload = {
                name,
                gender: activeGender,
                date
            };

            dispatch(createChildren(payload));
        } else {
            const payload = {
                id: child.id,
                name,
                gender: activeGender,
                date
            };
            dispatch(editChild(payload));
        }


        if(setLaunchTC) setLaunchTC();
        if(goToBack && navigate) {
            navigate('Settings')
        }
    };

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
                <TouchableOpacity style={styles.datePickerShow} onPress={showDatepicker}>
                    <Text style={styles.datePickerShowText}>{DATE}</Text>
                </TouchableOpacity>
                {show && (
                    <DateTimePicker
                        value={child && new Date(child.date) || date}
                        mode={mode}
                        display="default"
                        onChange={_handleDateChange}
                        maximumDate={new Date()}
                    />
                )}
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

            <View style={{marginTop: 110}}>
                <Button pressHandler={_handleCreate} buttonText={child && languages.save || languages.create}/>
            </View>
        </View>
    )
};

export default CreateChildForm
