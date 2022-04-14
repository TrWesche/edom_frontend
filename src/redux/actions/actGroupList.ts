// https://medium.com/@killerchip0/handling-asynchronous-fetching-of-data-with-react-redux-2aecc65e87af

// Libraries
import { Dispatch } from "redux";

// Interfaces
import { QueryStringFilterProps } from "../../interfaces/globalInterfaces";
import { ReturnGroupObject } from "../../interfaces/edomGroupInterfaces";

// API
import apiEDOM from "../../utils/apiEDOM";

// Utilities
import { formQueryString } from "../../utils/formQueryString";

// Redux Actions
import {
    GROUP_LIST_ACTIONS,
    ERROR
} from "../actionDictionary";


const fetchGroupList = (queryParams?: Array<QueryStringFilterProps>) => {
    return async function (dispatch: Dispatch) {
        dispatch(startFetchGroupList());
        try {
            const queryString = formQueryString(queryParams);
            const result = await apiEDOM.getGroupList(queryString);
            const data = result.data;
            
            dispatch(gotGroupList(data));
        } catch (error) {
            console.log("Redux Error Caught");
            dispatch(gotError());
        }
    }
};

const startFetchGroupList = () => {
    return ({
        type: GROUP_LIST_ACTIONS.START_GROUP_LIST_LOAD
    });
};

const gotGroupList = (data: Array<ReturnGroupObject | undefined>) => {
    return ({
        type: GROUP_LIST_ACTIONS.FINISH_GROUP_LIST_LOAD,
        payload: data
    })
};

const fetchGroupListUser = (username: string, queryParams?: Array<QueryStringFilterProps>) => {
    return async function (dispatch: Dispatch) {
        dispatch(startFetchGroupListUser());
        try {
            const queryString = formQueryString(queryParams);
            const result = await apiEDOM.getUserGroups(username, queryString);
            const data = result.data;
            
            dispatch(gotGroupListUser(data));
        } catch (error) {
            console.log("Redux Error Caught");
            dispatch(gotError());
        }
    }
};

const startFetchGroupListUser = () => {
    return ({
        type: GROUP_LIST_ACTIONS.START_USER_GROUP_LIST_LOAD
    });
};

const gotGroupListUser = (data: Array<ReturnGroupObject | undefined>) => {
    return ({
        type: GROUP_LIST_ACTIONS.FINISH_USER_GROUP_LIST_LOAD,
        payload: data
    })
};

const gotError = () => {
    return ({
        type: ERROR
    })
};

export {
    fetchGroupList,
    fetchGroupListUser
};