import { Action } from "redux";
import {
    LOAD_USER_PROFILE,
    UPDATE_USER_PROFILE,
    ERROR
} from "../actionDictionary";

const INITIAL_STATE = {};

interface reduxAction extends Action {
    payload?: object
}

const redUserSecure = (state = INITIAL_STATE, action: reduxAction) => {
    let currentUser;
    switch (action.type){
        case LOAD_USER_PROFILE:
            currentUser = {...action.payload};  
            return currentUser;
        case UPDATE_USER_PROFILE:
            currentUser = {...action.payload};  
            return currentUser;
        case ERROR:
            return {...state, error: true};
        default:
            return state;
    }
}

export default redUserSecure;