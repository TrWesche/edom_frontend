import { Action } from "redux";
import { GroupObjectProps } from "../../interfaces/globalInterfaces";
import {
    GROUP_LIST_ACTIONS,
    ERROR
} from "../actionDictionary";

const INITIAL_STATE: Array<GroupObjectProps | undefined> = [];

interface reduxAction extends Action {
    payload?: object
}

const targetUser = (state = INITIAL_STATE, action: reduxAction) => {
    let groupList;
    switch (action.type){
        case GROUP_LIST_ACTIONS.START_GROUP_LIST_LOAD:
            groupList = {...state, isProcessing: true};
            return groupList;
        case GROUP_LIST_ACTIONS.FINISH_GROUP_LIST_LOAD:
            groupList = {...action.payload, isProcessing: false};  
            return groupList;
        case ERROR:
            return {...state, isProcessing: false, error: true};
        default:
            return {...state, isProcessing: false};
    }
}

export default targetUser;