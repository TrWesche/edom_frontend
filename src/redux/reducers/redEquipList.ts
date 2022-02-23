import { Action } from "redux";
import { EquipObjectProps } from "../../interfaces/globalInterfaces";
import {
    EQUIP_LIST_ACTIONS,
    ERROR
} from "../actionDictionary";

const INITIAL_STATE: Array<EquipObjectProps | undefined> = [];

interface reduxAction extends Action {
    payload?: object
}

const redEquipList = (state = INITIAL_STATE, action: reduxAction) => {
    let equipList;
    switch (action.type){
        case EQUIP_LIST_ACTIONS.START_EQUIP_LIST_LOAD:
            equipList = {...state, isProcessing: true};
            return equipList;
        case EQUIP_LIST_ACTIONS.FINISH_EQUIP_LIST_LOAD:
            equipList = {...action.payload, isProcessing: false};  
            return equipList;
        case EQUIP_LIST_ACTIONS.START_USER_EQUIP_LIST_LOAD:
            equipList = {...state, isProcessing: true};
            return equipList;
        case EQUIP_LIST_ACTIONS.FINISH_USER_EQUIP_LIST_LOAD:
            equipList = {...action.payload, isProcessing: false};  
            return equipList;
        case EQUIP_LIST_ACTIONS.START_GROUP_EQUIP_LIST_LOAD:
            equipList = {...state, isProcessing: true};
            return equipList;
        case EQUIP_LIST_ACTIONS.FINISH_GROUP_EQUIP_LIST_LOAD:
            equipList = {...action.payload, isProcessing: false};  
            return equipList;
        case ERROR:
            return {...INITIAL_STATE, isProcessing: false, error: true};
        default:
            return {...state, isProcessing: false};
    }
}

export default redEquipList;