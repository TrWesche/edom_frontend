// https://medium.com/@killerchip0/handling-asynchronous-fetching-of-data-with-react-redux-2aecc65e87af

// Libraries
import { Dispatch } from "redux";

// Interfaces
import { QueryStringFilterProps } from "../../interfaces/globalInterfaces";
import { ReturnUserObject } from "../../interfaces/edomUserInterfaces";

// API
import apiEDOM from "../../utils/apiEDOM";

// Utilities
import { formQueryString } from "../../utils/formQueryString";

// Redux Actions
import {
    USER_LIST_ACTIONS,
    ERROR
} from "../actionDictionary";



const fetchUserList = (queryParams?: Array<QueryStringFilterProps>) => {
    return async function (dispatch: Dispatch) {
        dispatch(startFetchUserList());
        try {
            const queryString = formQueryString(queryParams);
            const result = await apiEDOM.getUserList(queryString);
            const data = result.data;
            
            dispatch(gotUserList(data));
        } catch (error) {
            console.log("Redux Error Caught");
            dispatch(gotError());
        }
    }
};

const startFetchUserList = () => {
    return ({
        type: USER_LIST_ACTIONS.START_USER_LIST_LOAD
    });
};

const gotUserList = (data: Array<ReturnUserObject | undefined>) => {
    return ({
        type: USER_LIST_ACTIONS.FINISH_USER_LIST_LOAD,
        payload: data
    })
};


const fetchUserListGroup = (groupID: string, queryParams?: Array<QueryStringFilterProps>) => {
    return async function (dispatch: Dispatch) {
        dispatch(startFetchUserListGroup());
        try {
            const queryString = formQueryString(queryParams);
            const result = await apiEDOM.getGroupUsers(groupID, queryString);
            const data = result.data;
            
            dispatch(gotUserListGroup(data));
        } catch (error) {
            console.log("Redux Error Caught");
            dispatch(gotError());
        }
    }
};

const startFetchUserListGroup = () => {
    return ({
        type: USER_LIST_ACTIONS.START_GROUP_USER_LIST_LOAD
    });
};

const gotUserListGroup = (data: Array<ReturnUserObject | undefined>) => {
    return ({
        type: USER_LIST_ACTIONS.FINISH_GROUP_USER_LIST_LOAD,
        payload: data
    })
};


const gotError = () => {
    return ({
        type: ERROR
    })
};

export {
    fetchUserList,
    fetchUserListGroup
};