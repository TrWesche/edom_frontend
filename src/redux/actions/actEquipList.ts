// https://medium.com/@killerchip0/handling-asynchronous-fetching-of-data-with-react-redux-2aecc65e87af

import { Dispatch } from "redux";
import { EquipObjectProps, QueryStringFilterProps } from "../../interfaces/globalInterfaces";

import apiEDOM from "../../utils/apiEDOM";
import {
    EQUIP_LIST_ACTIONS,
    ERROR
} from "../actionDictionary";


export const queryStringFilterPrep = (filters: Array<QueryStringFilterProps> | undefined) => {
    if (filters) {
        const treatedFilters: Array<string> = [];
        filters.forEach(kvPair => {
            if (kvPair.key.length > 0 && kvPair.value.length > 0) {
                treatedFilters.push(`${kvPair.key}=${kvPair.value}`);
            };
        });
    
        if (treatedFilters.length > 0) {
            return `?${treatedFilters.join('&')}`;
        }
    }

    return "";
};


const fetchEquipList = (filters?: Array<QueryStringFilterProps>) => {
    return async function (dispatch: Dispatch) {
        dispatch(startFetchEquipList());
        try {
            const queryString = queryStringFilterPrep(filters);
            const result = await apiEDOM.getEquipList(queryString);
            const data = result.data;
            
            dispatch(gotEquipList(data));
        } catch (error) {
            console.log("Redux Error Caught");
            dispatch(gotError());
        }
    }
};

const startFetchEquipList = () => {
    return ({
        type: EQUIP_LIST_ACTIONS.START_EQUIP_LIST_LOAD
    });
};

const gotEquipList = (data: Array<EquipObjectProps | undefined>) => {
    return ({
        type: EQUIP_LIST_ACTIONS.FINISH_EQUIP_LIST_LOAD,
        payload: data
    })
};

const gotError = () => {
    return ({
        type: ERROR
    })
};

export {
    fetchEquipList
};