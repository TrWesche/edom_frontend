import { Action } from "redux";
import {
    GROUP_ACTIONS,
    ERROR
} from "../actionDictionary";

const INITIAL_STATE = {};

interface reduxAction extends Action {
    payload?: object
}

const redGroup = (state = INITIAL_STATE, action: reduxAction) => {
    let targetGroup;
    switch (action.type){
        case GROUP_ACTIONS.START_GROUP_CREATE:
            targetGroup = {...INITIAL_STATE, isProcessing: true};
            return targetGroup;
        case GROUP_ACTIONS.FINISH_GROUP_CREATE:
            targetGroup = {...action.payload, isProcessing: false};  
            return targetGroup;

        case GROUP_ACTIONS.START_GROUP_LOAD:
            targetGroup = {...state, isProcessing: true};
            return targetGroup;
        case GROUP_ACTIONS.FINISH_GROUP_LOAD:
            targetGroup = {...action.payload, isProcessing: false};  
            return targetGroup;

        case GROUP_ACTIONS.START_GROUP_UPDATE:
            targetGroup = {...state, isProcessing: true};  
            return targetGroup;
        case GROUP_ACTIONS.FINISH_GROUP_UPDATE:
            targetGroup = {...action.payload, isProcessing: false};  
            return targetGroup;

        case GROUP_ACTIONS.START_GROUP_DELETE:
            targetGroup = {...state, isProcessing: true};
            return targetGroup;
        case GROUP_ACTIONS.FINISH_GROUP_DELETE:
            targetGroup = {...INITIAL_STATE, isProcessing: false};
            return targetGroup;
        
        case ERROR:
            return {...INITIAL_STATE, isProcessing: false, error: true};
        default:
            return {...state, isProcessing: false};
    }
}

export default redGroup;