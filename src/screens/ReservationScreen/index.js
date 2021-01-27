import React, {useEffect} from 'react'

import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as DocumentPicker from 'expo-document-picker';

import {View, Text, ScrollView, TouchableOpacity, ActivityIndicator} from "react-native";
import {CenterBlock} from "../../components";

import {styles} from './style';

import moment from 'moment'
import {useNavigation} from "@react-navigation/native";

const compileFile = (dreams, children, tags, places) => {

    return {
        backupDate: new Date(),
        dreams: setAllDreams(dreams),
        children: children,
        tags: tags,
        places: places
    }
};

const setAllDreams = (dreams) => {
    const allDreams = [];

    dreams.forEach(dream => {
        allDreams.push(...dream.dream.map((dream) => {
                return dream
            })
        )
    });
    return allDreams;
};

const makeBackup = async (dreams, children, tags, places, setDaysTC) => {
    const backupDreams = await setDaysTC(children);
    let fileUri = FileSystem.documentDirectory + `dream_diary.txt`;
    await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(compileFile(backupDreams, children, tags, places)), { encoding: FileSystem.EncodingType.UTF8 });
    await Sharing.shareAsync(fileUri)
};

const uploadBackup = async (addInfo, navigate, addDreams, children) => {
    await DocumentPicker.getDocumentAsync({
        type: 'text/*'
    }).then((data) => FileSystem.readAsStringAsync(data.uri)).then(async data => {
         await addInfo('children', JSON.parse(data).children);
         await addInfo('tags', JSON.parse(data).tags);
         await addInfo('places', JSON.parse(data).places);
         await addDreams(JSON.parse(data).dreams, JSON.parse(data).children, children)
    });
};

const ReservationScreen = ({dreams, loading, theme, languages, children, tags, places, addInfo, setDaysTC, date, addDreams}) => {

    const {navigate} = useNavigation();

    return (
        <ScrollView contentContainerStyle={styles.backupContainer}>
            {
                loading ? <CenterBlock res ><ActivityIndicator size="large" color="#1768AF" /></CenterBlock> : null

            }
            <View style={{height: '100%'}}>
                <TouchableOpacity style={styles.copyBtn} onPress={() => makeBackup(dreams, children, tags, places, setDaysTC)} disabled={loading}>
                    <Text style={styles.copyBtnText}>{languages.create_copy}</Text>
                </TouchableOpacity>
                <Text style={styles.hint}>{languages.create_copy_info}</Text>
                <TouchableOpacity style={styles.copyBtn} onPress={() => uploadBackup(addInfo, navigate, addDreams, children)} disabled={loading}>
                    <Text style={styles.copyBtnText}>{languages.load_copy}</Text>
                </TouchableOpacity>
                <Text style={styles.hint}>{languages.load_copy_info}</Text>
            </View>

        </ScrollView>
    )
}

export default ReservationScreen
