import { Action } from "redux";
import { RoomObjectProps } from "../../interfaces/globalInterfaces";
import {
    ROOM_LIST_ACTIONS,
    ERROR
} from "../actionDictionary";

const INITIAL_STATE: Array<RoomObjectProps | undefined> = [];

interface reduxAction extends Action {
    payload?: object
}

const redRoomList = (state = INITIAL_STATE, action: reduxAction) => {
    let roomList;
    switch (action.type){
        case ROOM_LIST_ACTIONS.START_ROOM_LIST_LOAD:
            roomList = {...state, isProcessing: true};
            return roomList;
        case ROOM_LIST_ACTIONS.FINISH_ROOM_LIST_LOAD:
            roomList = {...action.payload, isProcessing: false};  
            return roomList;
        case ERROR:
            return {...state, isProcessing: false, error: true};
        default:
            return {...state, isProcessing: false};
    }
}

export default redRoomList;