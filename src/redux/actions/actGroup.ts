// https://medium.com/@killerchip0/handling-asynchronous-fetching-of-data-with-react-redux-2aecc65e87af


// Libraries
import { Dispatch } from "redux";

// Interfaces
import { ReturnGroupObject } from "../../interfaces/edomGroupInterfaces";

// API
import apiEDOM from "../../utils/apiEDOM";

// Utilities

// Redux Actions
import {
    GROUP_ACTIONS,
    ERROR
} from "../actionDictionary";



const fetchGroupProfile = (groupID: string) => {
    return async function (dispatch: Dispatch) {
        dispatch(startFetchGroupProfile());
        try {
            const result = await apiEDOM.getGroup(groupID);
            const data = result.data.group;
            dispatch(gotGroupProfile(data));
            
        } catch (error) {
            console.log("Redux Error Caught");
            dispatch(gotError());
        }
    }
};

const startFetchGroupProfile = () => {
    return ({
        type: GROUP_ACTIONS.START_GROUP_LOAD
    });
};

const gotGroupProfile = (groupData: ReturnGroupObject) => {
    return ({
        type: GROUP_ACTIONS.FINISH_GROUP_LOAD,
        payload: groupData
    })
};


const gotError = () => {
    return ({
        type: ERROR
    })
};

export {
    fetchGroupProfile
}