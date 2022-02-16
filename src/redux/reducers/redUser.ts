import { Action } from "redux";
import {
    USER_ACTIONS,
    ERROR
} from "../actionDictionary";

const INITIAL_STATE = {};

interface reduxAction extends Action {
    payload?: object
}

const targetUser = (state = INITIAL_STATE, action: reduxAction) => {
    let targetUser;
    switch (action.type){
        case USER_ACTIONS.START_PROFILE_LOAD:
            targetUser = {...state, isProcessing: true};
            return targetUser;
        case USER_ACTIONS.FINISH_PROFILE_LOAD_PRIVATE:
            targetUser = {...action.payload, isProcessing: false};  
            return targetUser;
        case USER_ACTIONS.FINISH_PROFILE_LOAD_PUBLIC:
            targetUser = {...action.payload, isProcessing: false};  
            return targetUser;
        case USER_ACTIONS.UPDATE_PROFILE:
            targetUser = {...action.payload, isProcessing: true};  
            return targetUser;
        case ERROR:
            return {...state, isProcessing: false, error: true};
        default:
            return {...state, isProcessing: false};
    }
}

export default targetUser;