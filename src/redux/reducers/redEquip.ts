import { Action } from "redux";
import {
    EQUIP_ACTIONS,
    ERROR
} from "../actionDictionary";

const INITIAL_STATE = {};

interface reduxAction extends Action {
    payload?: object
}

const redEquip = (state = INITIAL_STATE, action: reduxAction) => {
    let targetEquip;
    switch (action.type){
        case EQUIP_ACTIONS.START_EQUIP_CREATE:
            targetEquip = {...INITIAL_STATE, isProcessing: true};
            return targetEquip;
        case EQUIP_ACTIONS.FINISH_EQUIP_CREATE:
            targetEquip = {...action.payload, isProcessing: false};  
            return targetEquip;

        case EQUIP_ACTIONS.START_EQUIP_LOAD:
            targetEquip = {...INITIAL_STATE, isProcessing: true};
            return targetEquip;
        case EQUIP_ACTIONS.FINISH_EQUIP_LOAD:
            targetEquip = {...action.payload, isProcessing: false};  
            return targetEquip;
            
        case EQUIP_ACTIONS.START_EQUIP_UPDATE:
            targetEquip = {...state, isProcessing: true};  
            return targetEquip;
        case EQUIP_ACTIONS.FINISH_EQUIP_UPDATE:
            targetEquip = {...action.payload, isProcessing: false};  
            return targetEquip;

        case EQUIP_ACTIONS.START_EQUIP_DELETE:
            targetEquip = {...state, isProcessing: true};
            return targetEquip;
        case EQUIP_ACTIONS.FINISH_EQUIP_DELETE:
            targetEquip = {...INITIAL_STATE, isProcessing: false};
            return targetEquip;
        
        case ERROR:
            return {...INITIAL_STATE, isProcessing: false, error: true};
        default:
            return {...state, isProcessing: false};
    }
}

export default redEquip;