import {combineReducers, createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {MainReducer} from "../reducers/mainReducer";
import {NewDreamScreenReducer} from "../reducers/timeReducer";
import {statisticsReducer} from "../reducers/statisticsReducer";
import {backupReducer} from "../reducers/backupReducer";
import {appReducer} from "../reducers/appReducer";
import {childReducer} from "../reducers/childReducer";
import {directoryReducer} from "../reducers/directoryReducer";

const reducers = combineReducers({
    date: MainReducer,
    time: NewDreamScreenReducer,
    statistics: statisticsReducer,
    app: appReducer,
    child: childReducer,
    directory: directoryReducer,
    backup: backupReducer
});

const store = createStore(reducers, applyMiddleware(thunk));

export default store

