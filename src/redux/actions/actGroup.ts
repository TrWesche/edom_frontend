// https://medium.com/@killerchip0/handling-asynchronous-fetching-of-data-with-react-redux-2aecc65e87af

import { Dispatch } from "redux";
import { GroupObjectProps } from "../../interfaces/globalInterfaces";
import { authToken} from "../../providers/authProvider";

import apiEDOM from "../../utils/apiEDOM";
import {
    GROUP_ACTIONS,
    ERROR
} from "../actionDictionary";



const fetchGroupProfile = (groupID: string, authData: authToken | undefined) => {
    return async function (dispatch: Dispatch) {
        dispatch(startFetchGroupProfile());
        try {
            if (!authData?.username) {
                throw new Error ("Current User Authentication Data Malformed | User Not Logged In");
            };

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

const gotGroupProfile = (groupData: GroupObjectProps) => {
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