// https://medium.com/@killerchip0/handling-asynchronous-fetching-of-data-with-react-redux-2aecc65e87af

import { Dispatch } from "redux";
import { RoomObjectProps, QueryStringFilterProps } from "../../interfaces/globalInterfaces";

import apiEDOM from "../../utils/apiEDOM";
import {
    ROOM_LIST_ACTIONS,
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


const fetchRoomList = (filters?: Array<QueryStringFilterProps>) => {
    return async function (dispatch: Dispatch) {
        dispatch(startFetchRoomList());
        try {
            const queryString = queryStringFilterPrep(filters);
            const result = await apiEDOM.getRoomList(queryString);
            const data = result.data;
            
            dispatch(gotRoomList(data));
        } catch (error) {
            console.log("Redux Error Caught");
            dispatch(gotError());
        }
    }
};

const startFetchRoomList = () => {
    return ({
        type: ROOM_LIST_ACTIONS.START_ROOM_LIST_LOAD
    });
};

const gotRoomList = (data: Array<RoomObjectProps | undefined>) => {
    return ({
        type: ROOM_LIST_ACTIONS.FINISH_ROOM_LIST_LOAD,
        payload: data
    })
};

const gotError = () => {
    return ({
        type: ERROR
    })
};

export {
    fetchRoomList
};