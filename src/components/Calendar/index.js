import {View} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import React from "react";
import {useNavigation} from "@react-navigation/native";

import {setEndDate, setStartDate} from "../../redux/reducers/timeReducer";
import {useDispatch} from "react-redux";
import moment from "moment";

const Calendar = ({route}) => {

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const {setDate, updateDreamTime, type, timeOfDay} = route.params;

    const hideDatePicker = (newDate) => {

        if(updateDreamTime) {
            updateDreamTime(type, moment(newDate).format('DD MMM'))

        }else {
            type === 'startDate'
                ? dispatch(setStartDate(newDate))
                : dispatch(setEndDate(newDate))
        }

        navigation.goBack()

        // if (type === 'startDate'){
        //     updateDreamTime(type, newDate)
        //
        //     navigation.goBack();
        // }
        // else if(type === 'endDate'){
        //     dispatch(setEndDate(newDate))
        //     navigation.goBack();
        // }
        // else navigation.navigate('Home');
    };

    const handleConfirm = (date) => {
        const newDate = moment(date);
        hideDatePicker(newDate);
        setDate ? setDate(newDate) : null
    };

    return (
        <View style={{marginTop: 30}}>
            <DateTimePickerModal
                isVisible={true}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
                is24Hour={true}
                maximumDate={timeOfDay === 'day' ? new Date() : (new Date()).setDate((new Date()).getDate() + 1)}
            />
        </View>
    );
}


export default Calendar
