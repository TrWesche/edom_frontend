// https://medium.com/@killerchip0/handling-asynchronous-fetching-of-data-with-react-redux-2aecc65e87af

import { Dispatch } from "redux";
import { UserObjectProps, QueryStringFilterProps } from "../../interfaces/globalInterfaces";

import apiEDOM from "../../utils/apiEDOM";
import {
    USER_LIST_ACTIONS,
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


const fetchUserList = (filters?: Array<QueryStringFilterProps>) => {
    return async function (dispatch: Dispatch) {
        dispatch(startFetchUserList());
        try {
            const queryString = queryStringFilterPrep(filters);
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

const gotUserList = (data: Array<UserObjectProps | undefined>) => {
    return ({
        type: USER_LIST_ACTIONS.FINISH_USER_LIST_LOAD,
        payload: data
    })
};


const fetchUserListGroup = (groupID: string) => {
    return async function (dispatch: Dispatch) {
        dispatch(startFetchUserListGroup());
        try {

            const result = await apiEDOM.getUserListGroup(groupID);
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

const gotUserListGroup = (data: Array<UserObjectProps | undefined>) => {
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