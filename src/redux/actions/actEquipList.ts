// https://medium.com/@killerchip0/handling-asynchronous-fetching-of-data-with-react-redux-2aecc65e87af

// Libraries
import { Dispatch } from "redux";

// Interfaces
import { QueryStringFilterProps } from "../../interfaces/globalInterfaces";
import { ReturnEquipObject } from "../../interfaces/edomEquipInterfaces";

// API
import apiEDOM from "../../utils/apiEDOM";

// Utilities
import { formQueryString } from "../../utils/formQueryString";

// Redux Actions
import {
    EQUIP_LIST_ACTIONS,
    ERROR
} from "../actionDictionary";


const fetchEquipList = (queryParams?: Array<QueryStringFilterProps>) => {
    return async function (dispatch: Dispatch) {
        dispatch(startFetchEquipList());
        try {
            const queryString = formQueryString(queryParams);
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

const gotEquipList = (data: Array<ReturnEquipObject | undefined>) => {
    return ({
        type: EQUIP_LIST_ACTIONS.FINISH_EQUIP_LIST_LOAD,
        payload: data
    })
};


const fetchEquipListUser = (username: string, queryParams?: Array<QueryStringFilterProps>) => {
    return async function (dispatch: Dispatch) {
        dispatch(startFetchEquipListUser());
        try {
            const queryString = formQueryString(queryParams);
            const result = await apiEDOM.getUserEquip(username, queryString);
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

const gotEquipListUser = (data: Array<ReturnEquipObject | undefined>) => {
    return ({
        type: EQUIP_LIST_ACTIONS.FINISH_USER_EQUIP_LIST_LOAD,
        payload: data
    })
};


const fetchEquipListGroup = (queryParams?: Array<QueryStringFilterProps>) => {
    return async function (dispatch: Dispatch) {
        dispatch(startFetchEquipListGroup());
        try {
            const queryString = formQueryString(queryParams);
            // const result = await apiEDOM.getGroupEquip(groupID, queryString);
            const result = await apiEDOM.getEquipList(queryString);
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

const gotEquipListGroup = (data: Array<ReturnEquipObject | undefined>) => {
    return ({
        type: EQUIP_LIST_ACTIONS.FINISH_GROUP_EQUIP_LIST_LOAD,
        payload: data
    })
};


const fetchEquipListRoom = (roomID: string, queryParams?:  Array<QueryStringFilterProps>) => {
    return async function (dispatch: Dispatch) {
        dispatch(startFetchEquipListRoom());
        try {
            const queryString = formQueryString(queryParams);
            const result = await apiEDOM.getRoomEquip(roomID, queryString);
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

const gotEquipListRoom = (data: Array<ReturnEquipObject | undefined>) => {
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