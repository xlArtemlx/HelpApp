import {Dimensions, Text, TouchableOpacity, View} from "react-native";
import {styles} from "../screens/DirectoryScreen/styles";
import Modal from "react-native-modal";
import {CreateInfoForm} from "../components";
import React from "react";

const deviceWidth = Dimensions.get('window').width

export const renderCreateButton = (buttonText, type, pressHandler, visible, setVisible, style = {}) => {

    return (
        <View style={style}>
            <TouchableOpacity onPress={() => pressHandler(type, visible)}>
                <Text style={styles.buttonText}>{buttonText}</Text>
            </TouchableOpacity>
            {visible && <Modal
                isVisible={visible}
                onBackdropPress={() => setVisible(false)}
                hideModalContentWhileAnimating
                backdropOpacity={0.40}
                style={styles.modalContainer}
            >
                <View style={{
                    ...styles.modalContent,
                    width: deviceWidth - 40
                }}>
                    <CreateInfoForm visible={visible} type={type} setVisible={setVisible}/>
                </View>
            </Modal>}
        </View>
    )
}
