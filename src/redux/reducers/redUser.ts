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
        case USER_ACTIONS.START_USER_LOAD:
            targetUser = {...state, isProcessing: true};
            return targetUser;
        case USER_ACTIONS.FINISH_USER_LOAD_PRIVATE:
            targetUser = {...action.payload, isProcessing: false};  
            return targetUser;
        case USER_ACTIONS.FINISH_USER_LOAD_PUBLIC:
            targetUser = {...action.payload, isProcessing: false};  
            return targetUser;
        case USER_ACTIONS.START_USER_UPDATE:
            targetUser = {...state, isProcessing: true};  
            return targetUser;
        case USER_ACTIONS.FINISH_USER_UPDATE:
            targetUser = {...action.payload, isProcessing: false};  
            return targetUser;
        case ERROR:
            return {...state, isProcessing: false, error: true};
        default:
            return {...state, isProcessing: false};
    }
}

export default targetUser;