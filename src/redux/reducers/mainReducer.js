import Fire from "../../firebase";
import moment from "moment";
import "moment/locale/ru";



const SET_DREAMS = 'mainScreen/SET_DREAMS';

const SET_TIME = 'mainScreen/SET_TIME';
const SET_DATE = 'mainScreen/SET_DATE';
const SET_ID = 'mainScreen/SET_ID';
const CLEAR_ID = 'mainScreen/CLEAR_ID';
const SET_LOADING = 'mainScreen/SET_LOADING';
const SET_DREAM = 'mainScreen/SET_DREAM';
const START_DREAM = 'mainScreen/START_DREAM';
const SET_DREAM_YEST = 'mainScreen/SET_DREAM_YEST';
const SET_DREAM_TOMORROW = 'mainScreen/SET_DREAM_TOMORROW';


let initialState = {
    dreams: [],
    currentDream: null,
    dreamYest: [],
    dreamTomorrow: [],
    date:  moment().local(),
    curTime: moment().local(),
    id: '',
    isLoading: false,
    startedDream: false,
};

export const MainReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_DREAMS: {
            return {
                ...state,
                dreams: action.dreams
            }
        }
        case SET_DREAM: {
            return {
                ...state,
                currentDream: action.dream
            }
        }
        case SET_DREAM_YEST: {
            return {
                ...state,
                dreamYest: action.dream
            }
        }
        case SET_DREAM_TOMORROW: {
            return {
                ...state,
                dreamTomorrow: action.dream
            }
        }
        case START_DREAM: {
            return {
                ...state,
                startedDream: action.started
            }
        }
        case SET_TIME:
            return {
                ...state,
                curTime: moment().local()
            };
        case SET_DATE:
            return {
                ...state,
                date: action.date
            };
        case SET_ID:
            return {
                ...state,
                id: +Date.now().toString()
            };
        case CLEAR_ID:
            return {
                ...state,
                id: ""
            };
        case SET_LOADING:
            return {
                ...state,
                isLoading: action.loading
            };
        default:
            return state
    }
}


export const setDreams = dreams => ({type: SET_DREAMS, dreams});
export const setDream = dream => ({type: SET_DREAM, dream});
export const setTimeSuccess = () => ({type: SET_TIME});
export const setDateSuccess = (date) => ({type: SET_DATE, date});
export const startDream = started => ({type: START_DREAM, started});
export const setDreamYest = dream => ({type: SET_DREAM_YEST, dream});
export const setDreamsTomorrow = dream => ({type: SET_DREAM_TOMORROW, dream});


export const setId = () => ({type: SET_ID});
export const clearId = () => ({type: CLEAR_ID});
export const setLoading = loading => ({type: SET_LOADING, loading});

export const getDreamYestTC = date => async (dispatch) => {
    let data= moment(date).add(-1, 'days')
    try {
        dispatch(setLoading(true));
        const {dreams} = await Fire.getOnce(data);
        if(dreams) {
            dispatch(setDreamYest(dreams));
            dispatch(setLoading(false))
        }

        return dreams
    }catch (error) {
        dispatch(setDreamsYest([]))
    }

};

export const getDreamTomorrowTC = date => async (dispatch) => {
     let data = moment(date).add(1, 'days');    
    try {
        dispatch(setLoading(true));
        const {dreams} = await Fire.getOnce(data);
        if(dreams) {
            dispatch(setDreamsTomorrow(dreams));
            dispatch(setLoading(false))
        }
        return dreams
    }catch (error) {
        dispatch(setDreamsTomorrow([]))
    }

};

export const getDataTC = date => async (dispatch) => {

    try {
        dispatch(setLoading(true));
        const {dreams} = await Fire.getOnce(date);
        if(dreams) {
            dispatch(setDreams(dreams));
            dispatch(setLoading(false));
            dispatch(getDreamYestTC(date))
            dispatch(getDreamTomorrowTC(date))
          
        }

        return dreams
    }catch (error) {
        dispatch(getDreamYestTC([]))
        dispatch(getDreamTomorrowTC([]))
        dispatch(setDreams([]))
      
    }


};



export const getCurrentDream = (date) => async dispatch => {
    const {dreams} = await Fire.getOnce(date);
    if(dreams) dispatch(setDream(dreams[0]))
}

export const startDreamTC = (date, payload, startTime) => async(dispatch, getState) => {

    dispatch(startDream(true));

    try {
        dispatch(setTimeSuccess());
        dispatch(setId());


        const {dreams} = await Fire.setStartTime({
            date, id: getState().date.id, started: getState().date.startedDream, payload
        }, startTime && startTime.startTime || getState().date.curTime
        );

        if(dreams) {
            dispatch(setDreams(dreams))
        }


    }catch (error) {
        console.log(error)
    }



};

export const endDreamTC = (date, payload) => async (dispatch, getState) => {

   dispatch(startDream(false));

    try{
        const {dreams} = await Fire.setEndTime({
            date, id: payload.id || getState().date.id, started: getState().date.startedDream
        }, payload && payload.endTime || moment().local(), payload && payload.endDate
        );

        if(dreams) {
            dispatch(setDreams(dreams));
            dispatch(clearId())
        }

    }catch (error) {
        console.log(error)
    }

};

export const removeDreamTC = (date, id) => async (dispatch) => {
    dispatch(startDream(false));
    try {

        const {dreams} = await Fire.delete(date, id);
        if(dreams) dispatch(setDreams(dreams))
    }catch (error) {
        console.log(error)
    }

};

export const updateDreamTC = (date, dream, id) => async (dispatch) => {
      
    try{
        await Fire.update(date, dream, id)
    }catch (error) {
        console.log(error)
    }
};








