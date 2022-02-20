import { Action } from "redux";
import {
    ROOM_ACTIONS,
    ERROR
} from "../actionDictionary";

const INITIAL_STATE = {};

interface reduxAction extends Action {
    payload?: object
}

const redRoom = (state = INITIAL_STATE, action: reduxAction) => {
    let targetRoom;
    switch (action.type){
        case ROOM_ACTIONS.START_ROOM_CREATE:
            targetRoom = {...INITIAL_STATE, isProcessing: true};
            return targetRoom;
        case ROOM_ACTIONS.FINISH_ROOM_CREATE:
            targetRoom = {...action.payload, isProcessing: false};  
            return targetRoom;

        case ROOM_ACTIONS.START_ROOM_LOAD:
            targetRoom = {...state, isProcessing: true};
            return targetRoom;
        case ROOM_ACTIONS.FINISH_ROOM_LOAD_PRIVATE:
            targetRoom = {...action.payload, isProcessing: false};  
            return targetRoom;
        case ROOM_ACTIONS.FINISH_ROOM_LOAD_PUBLIC:
            targetRoom = {...action.payload, isProcessing: false};  
            return targetRoom;

        case ROOM_ACTIONS.START_ROOM_UPDATE:
            targetRoom = {...state, isProcessing: true};  
            return targetRoom;
        case ROOM_ACTIONS.FINISH_ROOM_UPDATE:
            targetRoom = {...action.payload, isProcessing: false};  
            return targetRoom;

        case ROOM_ACTIONS.START_ROOM_DELETE:
            targetRoom = {...state, isProcessing: true};
            return targetRoom;
        case ROOM_ACTIONS.FINISH_ROOM_DELETE:
            targetRoom = {...INITIAL_STATE, isProcessing: false};
            return targetRoom;
        
        case ERROR:
            return {...INITIAL_STATE, isProcessing: false, error: true};
        default:
            return {...state, isProcessing: false};
    }
}

export default redRoom;