// https://medium.com/@killerchip0/handling-asynchronous-fetching-of-data-with-react-redux-2aecc65e87af

import { Dispatch } from "redux";
import { UserObjectProps } from "../../interfaces/globalInterfaces";
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
            if (username && username === authData.username) {
                // If target user is self, try to fetch data for own account
                const result = await apiEDOM.getUserSecure();
                data = result.data;
            } else {
                // If target is other user, fetch data for other user based on username
                const result = await apiEDOM.getUserPublic(username);
                data = result.data;
            };
            
            dispatch(gotUserProfile(data));
        } catch (error) {
            console.log("Redux Error Caught");
            dispatch(gotError());
        }
    }
};

const startFetchUserProfile = () => {
    return ({
        type: USER_ACTIONS.START_PROFILE_LOAD
    });
};

const gotUserProfile = (userData: UserObjectProps) => {
    return ({
        type: USER_ACTIONS.FINISH_PROFILE_LOAD,
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