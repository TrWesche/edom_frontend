// https://medium.com/@killerchip0/handling-asynchronous-fetching-of-data-with-react-redux-2aecc65e87af

// Libraries
import { Dispatch } from "redux";

// Interfaces
import { ReturnEquipObject } from "../../interfaces/edomEquipInterfaces";

// API
import apiEDOM from "../../utils/apiEDOM";

// Utilities

// Redux Actions
import {
    EQUIP_ACTIONS,
    ERROR
} from "../actionDictionary";



const fetchEquipProfile = (equipID: string) => {
    return async function (dispatch: Dispatch) {
        dispatch(startFetchEquipProfile());
        try {
            const result = await apiEDOM.getEquip(equipID);
            const data = result.data.equip;
            dispatch(gotEquipProfile(data));
            
        } catch (error) {
            console.log("Redux Error Caught");
            dispatch(gotError());
        }
    }
};

const startFetchEquipProfile = () => {
    return ({
        type: EQUIP_ACTIONS.START_EQUIP_LOAD
    });
};

const gotEquipProfile = (equipData: ReturnEquipObject) => {
    return ({
        type: EQUIP_ACTIONS.FINISH_EQUIP_LOAD,
        payload: equipData
    })
};


const gotError = () => {
    return ({
        type: ERROR
    })
};

export {
    fetchEquipProfile
}