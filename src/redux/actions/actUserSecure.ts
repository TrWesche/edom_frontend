import { Dispatch } from "redux";
import { UserObjectProps } from "../../interfaces/globalInterfaces";

import apiEDOM from "../../utils/apiEDOM";
import {
    LOAD_USER_PROFILE,
    UPDATE_USER_PROFILE,
    ERROR
} from "../actionDictionary";

const fetchUserProfile = () => {
    return async function (dispatch: Dispatch) {
        try {
            const token = sessionStorage.getItem("authToken");
            if (!token) {
                throw new Error ("Auth Token Not Provided");
            }
            const {data} = await apiEDOM.getUserSecure(token);
            dispatch(gotUserProfile(data));
        } catch (error) {
            dispatch(gotError());
        }
    }
};

const gotUserProfile = (userData: UserObjectProps) => {
    return ({
        type: LOAD_USER_PROFILE,
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