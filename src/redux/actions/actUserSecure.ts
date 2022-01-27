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
        // console.log("Fetch User Profile Called");
        try {
            const token = sessionStorage.getItem("authToken");
            // console.log(token);
            if (!token) {
                throw new Error ("Auth Token Not Provided");
            };

            // console.log(authData);
            if (!authData?.username) {
                // console.log("User Auth Data Malformed");
                throw new Error ("User Auth Data Malformed");
            };

            let data;
            if (username && username === authData.username) {
                console.log("Getting User Data - Secure");
                const result = await apiEDOM.getUserSecure(token);
                data = result.data;
            } else {
                console.log("Getting User Data - Public");
                const result = await apiEDOM.getUserPublic(token, username);
                data = result.data;
            };
            
            dispatch(gotUserProfile(data));
        } catch (error) {
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