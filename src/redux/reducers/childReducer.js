import AsyncStorage from '@react-native-community/async-storage';

const SET_CHILDREN = 'child/SET_CHILDREN'
const SET_LOADING = 'child/SET_LOADING'
const SET_ACTIVE_CHILD = 'child/SET_ACTIVE_CHILD'

const initialState = {
    children: [],
    activeChild: null,
    loading: false
};

export const childReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_CHILDREN: {
            return {
                ...state,
                children: action.children
            }
        }
        case SET_LOADING: {
            return {
                ...state,
                loading: action.loading
            }
        }
        case SET_ACTIVE_CHILD: {
            return {
                ...state,
                activeChild: action.child
            }
        }
        default:
            return state
    }
}


export const setChildren = children => ({type: SET_CHILDREN, children});
export const setLoading = loading => ({type: SET_LOADING, loading});
export const setActiveChild = child => ({type: SET_ACTIVE_CHILD, child});

export const initChildren = () => async dispatch => {
    // await AsyncStorage.removeItem('@children')
    // await AsyncStorage.removeItem('@appLaunched_key')
    // await AsyncStorage.clear()
    const activeChild = JSON.parse(await AsyncStorage.getItem('@active_child'))

    dispatch(setLoading(true))
    AsyncStorage.getItem('@children').then( (children) => {
        const storageChildren = JSON.parse(children)
        dispatch(setChildren(storageChildren))
        dispatch(changeChild(activeChild || storageChildren[0]))
        dispatch(setLoading(false))
    })

}

export const createChildren = payload => async dispatch => {
    const child = {
        ...payload,
        id: `${+new Date()}`
    }

    const storageChildren = JSON.parse(await AsyncStorage.getItem('@children'))

    if(!storageChildren) {
        await AsyncStorage.setItem('@children', JSON.stringify([child]))
    }else{
        const jsonChildren = storageChildren && storageChildren.length && storageChildren.concat(child)
        await AsyncStorage.setItem('@children', JSON.stringify(jsonChildren))

    }
    await AsyncStorage.setItem('@appLaunched_key', 'true')

    // dispatch(changeChild(storageChildren[0]))
}

export const deleteChild = id => async dispatch => {
    const storageChildren = JSON.parse(await AsyncStorage.getItem('@children'))

    const updatedChildren = storageChildren.filter( child => child.id.toString() !== id.toString())

    await AsyncStorage.setItem('@children', JSON.stringify(updatedChildren))

    dispatch(setChildren(updatedChildren))
}

export const changeChild = child => async dispatch => {
    const storageChildren = JSON.parse(await AsyncStorage.getItem('@children'))
    if(storageChildren) {
        let activeChild

        if(child) {
            activeChild = storageChildren.find( c => c.id === child.id) || storageChildren[0]
        }else{
            activeChild = storageChildren[0]
        }
        await AsyncStorage.setItem('@active_child', JSON.stringify(activeChild))
        dispatch(setActiveChild(activeChild))
    }
}

export const editChild = payload => async dispatch=> {
    const storageChildren = JSON.parse(await AsyncStorage.getItem('@children'));
    const editingChild = storageChildren.map(child => {
        if(child.id === payload.id) {
            child.name = payload.name;
            child.date = payload.date;
            child.gender = payload.gender;
        }
        return child;
    })

    await AsyncStorage.setItem('@children', JSON.stringify(editingChild));

}