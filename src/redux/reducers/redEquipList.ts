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
    let equipLIst;
    switch (action.type){
        case EQUIP_LIST_ACTIONS.START_EQUIP_LIST_LOAD:
            equipLIst = {...state, isProcessing: true};
            return equipLIst;
        case EQUIP_LIST_ACTIONS.FINISH_EQUIP_LIST_LOAD:
            equipLIst = {...action.payload, isProcessing: false};  
            return equipLIst;
        case ERROR:
            return {...state, isProcessing: false, error: true};
        default:
            return {...state, isProcessing: false};
    }
}

export default redEquipList;