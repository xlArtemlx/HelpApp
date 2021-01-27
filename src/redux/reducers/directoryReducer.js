import AsyncStorage from '@react-native-community/async-storage';

const SET_PLACES = 'directory/SET_PLACES';
const SET_TAGS = 'directory/SET_TAGS';
const SET_LOADING = 'directory/SET_LOADING';
const SET_DISABLE_FEEDING = 'directory/SET_DISABLE_FEEDING';
const SET_DISABLE_TAGS = 'directory/SET_DISABLE_TAGS';


const initialState = {
    places: [
        {
            id: 0,
            value: "Кроватка"
        },

        {
            id: 1,
            "value": "Коляска",
        },

        {
            id: 2,
            value: "Автомобиль",
        }
    ],
    tags: [
        {
            id: 0,
            value: "Быстро уснула"
        },

        {
            id: 1,
            value: "С плачем"
        },

        {
            id: 2,
            value: "Сопротивляясь укладыванию"
        }
    ],
    loading: false,
    disableFeeding: false,
    disableTags: false
};

export const directoryReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_PLACES: {
            return {
                ...state,
                places: action.places
            }
        }
        case SET_TAGS: {
            return {
                ...state,
                tags: action.tags
            }
        }
        case SET_LOADING: {
            return {
                ...state,
                loading: action.loading
            }
        }
        case SET_DISABLE_FEEDING: {
            return {
                ...state,
                disableFeeding: action.isEnable
            }
        }
        case SET_DISABLE_TAGS: {
            return {
                ...state,
                disableTags: action.isEnable
            }
        }
        default:
            return state
    }
}


export const setPlaces = places => ({type: SET_PLACES, places});
export const setTags = tags => ({type: SET_TAGS, tags});
export const setLoading = loading => ({type: SET_LOADING, loading});
export const setDisableFeeding = isEnable => ({type: SET_DISABLE_FEEDING, isEnable});
export const setDisableTags = isEnable => ({type: SET_DISABLE_TAGS, isEnable});

export const getInfo = type => async dispatch => {

    dispatch(setLoading(true));
    const storageInfo = JSON.parse(await AsyncStorage.getItem(`@${type}`) )

    if(storageInfo) {
        if(type === 'places') {
            dispatch(setPlaces(storageInfo))
        }else{
            dispatch(setTags(storageInfo))
        }
    }else {
        dispatch(setPlaces([]));
        dispatch(setTags([]))
    }
    dispatch(setLoading(false))

}

export const createInfo = (type, value) => async dispatch => {

    const info = {
        id: +new Date(),
        value
    }

    // await AsyncStorage.removeItem(`@${type}`)

    const storageInfo = await AsyncStorage.getItem(`@${type}`)

    if(!storageInfo) {
        await AsyncStorage.setItem(`@${type}`, JSON.stringify([info]))
    }else{
        const jsonChildren = storageInfo && storageInfo.length && JSON.parse(storageInfo).concat(info)
        await AsyncStorage.setItem(`@${type}`, JSON.stringify(jsonChildren));
    }

    dispatch(getInfo(type))

}

export const createDefaultInfo = (type) => async () => {
    await AsyncStorage.setItem(`@${type}`, JSON.stringify(initialState[type]));
};

export const editInfo = (type, value, id) => async dispatch => {

    // await AsyncStorage.removeItem(`@${type}`)
    const storageInfo = JSON.parse(await AsyncStorage.getItem(`@${type}`))

    const updatedStorage = storageInfo.map( info => {
        if(info.id === id) {
            info.value = value
        }

        return info
    } )

    await AsyncStorage.setItem(`@${type}`, JSON.stringify(updatedStorage))

    dispatch(getInfo(type))

}

export const deleteInfo = (type, value) => async dispatch => {
    const storageInfo = JSON.parse(await AsyncStorage.getItem(`@${type}`) )

    const updatedInfo = storageInfo.filter( p => p.value.toString() !== value.toString())

    await AsyncStorage.setItem(`@${type}`, JSON.stringify(updatedInfo))

    if(type === 'places') {
        dispatch(setPlaces(updatedInfo))
    }else{
        dispatch(setTags(updatedInfo))
    }

}

export const enableAdds = (value) => async (dispatch, getState) => {
    if (value === 'feeding') {
        dispatch(setDisableFeeding(!getState().directory.disableFeeding));
    } else {
        dispatch(setDisableTags(!getState().directory.disableTags));
    }
}
