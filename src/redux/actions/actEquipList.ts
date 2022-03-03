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


const fetchEquipListUser = () => {
    return async function (dispatch: Dispatch) {
        dispatch(startFetchEquipListUser());
        try {
            const result = await apiEDOM.getEquipListUser();
            const data = result.data;
            
            dispatch(gotEquipListUser(data));
        } catch (error) {
            console.log("Redux Error Caught");
            dispatch(gotError());
        }
    }
};

const startFetchEquipListUser = () => {
    return ({
        type: EQUIP_LIST_ACTIONS.START_USER_EQUIP_LIST_LOAD
    });
};

const gotEquipListUser = (data: Array<EquipObjectProps | undefined>) => {
    return ({
        type: EQUIP_LIST_ACTIONS.FINISH_USER_EQUIP_LIST_LOAD,
        payload: data
    })
};


const fetchEquipListGroup = (groupID: string) => {
    return async function (dispatch: Dispatch) {
        dispatch(startFetchEquipListGroup());
        try {

            const result = await apiEDOM.getEquipListGroup(groupID);
            const data = result.data;
            
            dispatch(gotEquipListGroup(data));
        } catch (error) {
            console.log("Redux Error Caught");
            dispatch(gotError());
        }
    }
};

const startFetchEquipListGroup = () => {
    return ({
        type: EQUIP_LIST_ACTIONS.START_GROUP_EQUIP_LIST_LOAD
    });
};

const gotEquipListGroup = (data: Array<EquipObjectProps | undefined>) => {
    return ({
        type: EQUIP_LIST_ACTIONS.FINISH_GROUP_EQUIP_LIST_LOAD,
        payload: data
    })
};


const fetchEquipListRoom = (roomID: string) => {
    return async function (dispatch: Dispatch) {
        dispatch(startFetchEquipListRoom());
        try {

            const result = await apiEDOM.getEquipListRoom(roomID);
            const data = result.data;
            
            dispatch(gotEquipListRoom(data));
        } catch (error) {
            console.log("Redux Error Caught");
            dispatch(gotError());
        }
    }
};

const startFetchEquipListRoom = () => {
    return ({
        type: EQUIP_LIST_ACTIONS.START_ROOM_EQUIP_LIST_LOAD
    });
};

const gotEquipListRoom = (data: Array<EquipObjectProps | undefined>) => {
    return ({
        type: EQUIP_LIST_ACTIONS.FINISH_ROOM_EQUIP_LIST_LOAD,
        payload: data
    })
};


const gotError = () => {
    return ({
        type: ERROR
    })
};

export {
    fetchEquipList,
    fetchEquipListUser,
    fetchEquipListGroup,
    fetchEquipListRoom
};