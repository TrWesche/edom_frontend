// https://medium.com/@killerchip0/handling-asynchronous-fetching-of-data-with-react-redux-2aecc65e87af

import { Dispatch } from "redux";
import { GroupObjectProps, QueryStringFilterProps } from "../../interfaces/globalInterfaces";

import apiEDOM from "../../utils/apiEDOM";
import {
    GROUP_LIST_ACTIONS,
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


const fetchGroupList = (filters?: Array<QueryStringFilterProps>) => {
    return async function (dispatch: Dispatch) {
        dispatch(startFetchGroupList());
        try {
            const queryString = queryStringFilterPrep(filters);
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

const gotGroupList = (data: Array<GroupObjectProps | undefined>) => {
    return ({
        type: GROUP_LIST_ACTIONS.FINISH_GROUP_LIST_LOAD,
        payload: data
    })
};

// TODO: API Endpoint need to be built out to support this action
const fetchGroupListUser = (username: string) => {
    return async function (dispatch: Dispatch) {
        dispatch(startFetchGroupListUser());
        try {
            const result = await apiEDOM.getGroupListUser();
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

const gotGroupListUser = (data: Array<GroupObjectProps | undefined>) => {
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