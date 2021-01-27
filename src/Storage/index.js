import AsyncStorage from "@react-native-community/async-storage";



class Storage {
   async get(key){
    try {
        const res = await JSON.parse(AsyncStorage.getItem(`@${key}`))
        return res
      } catch (e) {
        console.log(e)
      }
    }

    async set(key,value){
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem(`@${key}`,jsonValue)
          } catch (e) {
            console.log(e)
          }

    }
    async update(key,newValue) {

    }
    async setStartTime(key,value) {
        try {
            let dreams = await JSON.parse(AsyncStorage.getItem(`@${key}`))
            if(dreams){
                dreams.push(value)
                const jsonValue = JSON.stringify(dreams)
                await AsyncStorage.setItem(`@${key}`,jsonValue)
            } else {
                const dreams = []
                dreams.push(value)
                const jsonValue = JSON.stringify(dreams)
                await AsyncStorage.setItem(`@${key}`,jsonValue)
            }
          } catch (e) {
            console.log(e)
          }
    }
    async setEndTime(key, newValue) {
        try {
            let dreams = await JSON.parse(AsyncStorage.getItem(`@${key}`))
            if(dreams){
                const dream = dream.length - 1
                const newDream = {...dream,...newValue}
                dreams.push(newDream)
                const jsonValue = JSON.stringify(dreams)
                await AsyncStorage.setItem(`@${key}`,jsonValue)
            }
          } catch (e) {
            console.log(e)
          }

    }

}

export default new Storage