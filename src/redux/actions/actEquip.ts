// https://medium.com/@killerchip0/handling-asynchronous-fetching-of-data-with-react-redux-2aecc65e87af

import { Dispatch } from "redux";
import { EquipObjectProps } from "../../interfaces/globalInterfaces";
import { authToken} from "../../providers/authProvider";

import apiEDOM from "../../utils/apiEDOM";
import {
    EQUIP_ACTIONS,
    ERROR
} from "../actionDictionary";



const fetchEquipProfile = (equipID: string, authData: authToken | undefined) => {
    return async function (dispatch: Dispatch) {
        dispatch(startFetchEquipProfile());
        try {
            if (!authData?.username) {
                throw new Error ("Current User Authentication Data Malformed | User Not Logged In");
            };

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

const gotEquipProfile = (equipData: EquipObjectProps) => {
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