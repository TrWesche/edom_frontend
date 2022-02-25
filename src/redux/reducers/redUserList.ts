import { Action } from "redux";
import { UserObjectProps } from "../../interfaces/globalInterfaces";
import {
    USER_LIST_ACTIONS,
    ERROR
} from "../actionDictionary";

const INITIAL_STATE: Array<UserObjectProps | undefined> = [];

interface reduxAction extends Action {
    payload?: object
}

const redUserList = (state = INITIAL_STATE, action: reduxAction) => {
    let userList;
    switch (action.type){
        case USER_LIST_ACTIONS.START_USER_LIST_LOAD:
            userList = {...INITIAL_STATE, isProcessing: true};
            return userList;
        case USER_LIST_ACTIONS.FINISH_USER_LIST_LOAD:
            userList = {...action.payload, isProcessing: false};  
            return userList;
        case USER_LIST_ACTIONS.START_GROUP_USER_LIST_LOAD:
            userList = {...INITIAL_STATE, isProcessing: true};
            return userList;
        case USER_LIST_ACTIONS.FINISH_GROUP_USER_LIST_LOAD:
            userList = {...action.payload, isProcessing: false};  
            return userList;
        case ERROR:
            return {...INITIAL_STATE, isProcessing: false, error: true};
        default:
            return {...state, isProcessing: false};
    }
}

export default redUserList;