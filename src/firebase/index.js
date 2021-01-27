import firebase from "firebase";
import {formatDistanceStrict, differenceInMinutes} from 'date-fns'
import {ru, enUS} from 'date-fns/locale'
import {convertDateFromTime, } from "../utils/convertFromTime";
import AsyncStorage from "@react-native-community/async-storage";
import moment from "moment";
import "moment/locale/ru";


const ref = async (date) => {

    const d = moment.isMoment(date) ? date : moment(d);

    let activeChild = JSON.parse(await AsyncStorage.getItem('@active_child'))
    if(!activeChild) {
       activeChild = JSON.parse(await AsyncStorage.getItem('@children'))[0]
    }


            return firebase.database().ref(`${activeChild.id}/dateTime/${d.year()}/${d.month() + 1}/${d.date()}`)




    
}
const refChildren = () => firebase.database().ref('children')



const firebaseConfig = {
    apiKey: "AIzaSyDPOUwZI1_bgd2qZ_Q-pTQkMD19wFypLOk",
    authDomain: "fir-project-ef606.firebaseapp.com",
    databaseURL: "https://fir-project-ef606.firebaseio.com",
    projectId: "fir-project-ef606",
    storageBucket: "fir-project-ef606.appspot.com",
    messagingSenderId: "142535635992",
    appId: "1:142535635992:web:e24e3efa724ed2a5f77f6d",
    measurementId: "G-GDVPTJ4NQZ"
};

const _isDayOrNight = async time => {

    const date = convertDateFromTime(time)

    const startTime = JSON.parse(await AsyncStorage.getItem(`@startNightSleep`))
    const endTime = JSON.parse(await AsyncStorage.getItem(`@endNightSleep`))


    const startHours = parseInt(startTime.split(':')[0])
    const endHours = parseInt(endTime.split(':')[0])

    const hours = date.getHours()

    return hours > endHours && hours < startHours ? 'day' : 'night'
}

const _calcWakefulness = async (date, getOnce) => {

    const activeLanguages = await AsyncStorage.getItem('@active_language')

    const {dreams} = await getOnce(date);
    

    let endTime ;
    let startTime;
    let sortedDreams;

        sortedDreams = dreams.sort((a, b) => a.startTime > b.startTime ? -1 : 1);

        endTime = sortedDreams[1] && sortedDreams[1].endTime? sortedDreams[1].endTime
            : moment().local().format('HH:mm');
        startTime = sortedDreams[0] && sortedDreams[0].startTime ? sortedDreams[0].startTime
            : moment().local().format('HH:mm');


    const start = convertDateFromTime(startTime);
    const end = convertDateFromTime(endTime);

    return ({
        value: formatDistanceStrict(start, end, {locale: activeLanguages === 'en' ? enUS : ru}),
        inMinutes: differenceInMinutes(start, end)
    })

}




class Fire {

    constructor() {
        this._init()
    }

    _init = () => {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig)

        }
        console.log('Successfully inited');
        
    }



    setStartTime = async ({date, id, started, payload}, startTime, place = 'Кроватка') => {

        try {
            const startT = typeof startTime !== 'string' ? moment(startTime).format('HH:mm') : startTime;
            let activeChild = JSON.parse(await AsyncStorage.getItem('@active_child'));
            const dream = {
                id,
                startTime: startT,
                startDate: payload && payload.startDate || moment().local().format('DD MMM'),
                timeOfDay: await _isDayOrNight(startT),
                place: payload && payload.place || 'Кроватка',
                comment: payload && payload.comment || '',
                tags: payload && payload.tags || [],
                countFeeding: payload && payload.countFeeding || null,
                started,
                childId: activeChild.id,
                dateOfDream: date.toString()
            }
            //  AsyncStorage.setItem(`${date}`,JSON.stringify(dream))
            await (await ref(date))
                .child(id)
                .set(dream)
            return await this.getOnce(date)
        } catch (error) {
            console.log(error)
        }
    };
    setEndTime = async ({date, id, started}, endTime, endDate) => {

        try {
            const entT = typeof endTime !== 'string' ? moment(endTime).format('HH:mm') : endTime
            await (await ref(date))
                .child(id)
                .update({
                    endTime: entT,
                    endDate: endDate || moment().local().format('DD MMM'),
                    wakefulness: await _calcWakefulness(date, this.getOnce),
                    started
                })
            return await this.getOnce(date)
        } catch (error) {
            console.log(error)
        }
    };

    setBackupDream = async ({date, id, dream}) => {

      try {

          await(await ref(date))
              .child(id)
              .set(dream);
          return await this.getOnce(date)
      }  catch (error) {

          console.log(error)

      }

    };

    getOnce = async date => {
    
       
        try {
            
            const snapshot =  await(await ref(date)).once('value') 

            if (snapshot.hasChildren()) {
                return {dreams: Object.values(snapshot.val()).reverse()}
            }
            return ({dreams: []})
        } catch (error) {
            return ({dreams: []})
        }

    }

    delete = async (date, id) => {

        try {
            await (await ref(date))
                .child(id)
                .remove()

            return await this.getOnce(date)
        } catch (error) {
            console.log(error)
        }
    }

    getChildren = async () => {
        try {
            const snapshot = await refChildren().once('value')

            if (snapshot.hasChildren()) {
                return ({children: Object.values(snapshot.val()).reverse()})
            }

            return ({children: []})
        } catch (error) {
            console.log(error)
            return ({children: []})
        }
    }

    createChild = async payload => {

        await refChildren()
            .child(`/${payload.id}`)
            .set(payload)

        return await this.getChildren()
    }

    update = async (date, dream, id) => {
        await (await ref(date))
            .child(`/${id}`)
            .update({...dream, timeOfDay: !dream.timeOfDay ? await _isDayOrNight(dream.startTime) : dream.timeOfDay})
        
        // const newDream = {dream : {...dream, timeOfDay: !dream.timeOfDay ? await _isDayOrNight(dream.startTime) : dream.timeOfDay}}
        //  AsyncStorage.setItem(`${date}`,JSON.stringify(newDream))
        return await this.getOnce(date)

    }
}

export default new Fire();
