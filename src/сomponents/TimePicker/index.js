import {View} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import React from "react";
import {useNavigation, useRoute} from "@react-navigation/native";
import moment from "moment";

const TimePicker = () => {

    const {params} = useRoute()
    const {type, updateDreamTime} = params

    const {navigate} = useNavigation();

    const hideDatePicker = (newDate) => {
        updateDreamTime(type, moment(newDate).format('HH:mm:ss'))
        navigate('NewDream');
    };

    const handleConfirm = (date) => {
        const newDate = moment(date);
        hideDatePicker(newDate);
    };

    return (
        <View style={{marginTop: 30}}>
            <DateTimePickerModal
                isVisible={true}
                mode="time"
                onConfirm={handleConfirm}
                onCancel={() => navigate('NewDream')}
                is24Hour={true}
            />
        </View>
    );
}

export default TimePicker
