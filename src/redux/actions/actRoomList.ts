// https://medium.com/@killerchip0/handling-asynchronous-fetching-of-data-with-react-redux-2aecc65e87af

// Libraries
import { Dispatch } from "redux";

// Interfaces
import { QueryStringFilterProps } from "../../interfaces/globalInterfaces";
import { ReturnRoomObject } from "../../interfaces/edomRoomInterfaces";

// API
import apiEDOM from "../../utils/apiEDOM";

// Utilities
import { formQueryString } from "../../utils/formQueryString";

// Redux Actions
import {
    ROOM_LIST_ACTIONS,
    ERROR
} from "../actionDictionary";



const fetchRoomList = (queryParams?: Array<QueryStringFilterProps>) => {
    return async function (dispatch: Dispatch) {
        dispatch(startFetchRoomList());
        try {
            const queryString = formQueryString(queryParams);
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

const gotRoomList = (data: Array<ReturnRoomObject | undefined>) => {
    return ({
        type: ROOM_LIST_ACTIONS.FINISH_ROOM_LIST_LOAD,
        payload: data
    })
};



const fetchRoomListUser = (username: string,  queryParams?: Array<QueryStringFilterProps>) => {
    return async function (dispatch: Dispatch) {
        dispatch(startFetchRoomListUser());
        try {
            const queryString = formQueryString(queryParams);
            const result = await apiEDOM.getUserRooms(username, queryString);
            const data = result.data;
            
            dispatch(gotRoomListUser(data));
        } catch (error) {
            console.log("Redux Error Caught");
            dispatch(gotError());
        }
    }
};

const startFetchRoomListUser = () => {
    return ({
        type: ROOM_LIST_ACTIONS.START_USER_ROOM_LIST_LOAD
    });
};

const gotRoomListUser = (data: Array<ReturnRoomObject | undefined>) => {
    return ({
        type: ROOM_LIST_ACTIONS.FINISH_USER_ROOM_LIST_LOAD,
        payload: data
    })
};


const fetchRoomListGroup = (queryParams?: Array<QueryStringFilterProps>) => {
    return async function (dispatch: Dispatch) {
        dispatch(startFetchRoomListGroup());
        try {
            const queryString = formQueryString(queryParams);
            // const result = await apiEDOM.getGroupRooms(groupID, queryString);
            const result = await apiEDOM.getRoomList(queryString);
            const data = result.data;
            
            dispatch(gotRoomListGroup(data));
        } catch (error) {
            console.log("Redux Error Caught");
            dispatch(gotError());
        }
    }
};

const startFetchRoomListGroup = () => {
    return ({
        type: ROOM_LIST_ACTIONS.START_GROUP_ROOM_LIST_LOAD
    });
};

const gotRoomListGroup = (data: Array<ReturnRoomObject | undefined>) => {
    return ({
        type: ROOM_LIST_ACTIONS.FINISH_GROUP_ROOM_LIST_LOAD,
        payload: data
    })
};



const gotError = () => {
    return ({
        type: ERROR
    })
};

export {
    fetchRoomList,
    fetchRoomListUser,
    fetchRoomListGroup
};