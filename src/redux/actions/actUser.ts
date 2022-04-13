// https://medium.com/@killerchip0/handling-asynchronous-fetching-of-data-with-react-redux-2aecc65e87af

import { Dispatch } from "redux";
import { UserObjectProps, UserObjectPropsPrivate } from "../../interfaces/globalInterfaces";
import { authToken} from "../../providers/authProvider";

import apiEDOM from "../../utils/apiEDOM";
import {
    USER_ACTIONS,
    ERROR
} from "../actionDictionary";



const fetchUserProfile = (username: string, authData: authToken | undefined) => {
    return async function (dispatch: Dispatch) {
        dispatch(startFetchUserProfile());
        try {
            if (!authData?.username) {
                throw new Error ("Current User Authentication Data Malformed | User Not Logged In");
            };

            let data;
            const result = await apiEDOM.getUserProfile(username);
            data = result.data;
            dispatch(gotUserProfilePublic(data));

        } catch (error) {
            console.log("Redux Error Caught");
            dispatch(gotError());
        }
    }
};

const startFetchUserProfile = () => {
    return ({
        type: USER_ACTIONS.START_USER_LOAD
    });
};

const gotUserProfilePublic = (userData: UserObjectProps) => {
    return ({
        type: USER_ACTIONS.FINISH_USER_LOAD_PUBLIC,
        payload: userData
    })
};

const gotUserProfilePrivate = (userData: UserObjectPropsPrivate) => {
    return ({
        type: USER_ACTIONS.FINISH_USER_LOAD_PRIVATE,
        payload: userData
    })
};

// export const updateUserProfile = ({ updateValues }) => {
//     return async function (dispatch: Dispatch) {
//         try {
//             const data = await apiEDOM.updateUserSecure(updateValues);
//             dispatch(updateUserSuccess(data));
//         } catch (error) {
//             dispatch(gotError());
//         }
//     }
// };

// const updateUserSuccess = (userData) => {
//     return ({
//         type: UPDATE_USER_PROFILE,
//         payload: userData
//     })
// };


const gotError = () => {
    return ({
        type: ERROR
    })
};

export {
    fetchUserProfile
}