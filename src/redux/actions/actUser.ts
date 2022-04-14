// https://medium.com/@killerchip0/handling-asynchronous-fetching-of-data-with-react-redux-2aecc65e87af

// Libraries
import { Dispatch } from "redux";

// Interfaces
import { ReturnUserObject } from "../../interfaces/edomUserInterfaces";

// API
import apiEDOM from "../../utils/apiEDOM";

// Utilities

// Redux Actions
import {
    USER_ACTIONS,
    ERROR
} from "../actionDictionary";



const fetchUserProfile = (username: string) => {
    return async function (dispatch: Dispatch) {
        dispatch(startFetchUserProfile());
        try {
            let data;
            const result = await apiEDOM.getUserProfile(username);
            data = result.data;
            dispatch(gotUserProfile(data));

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

const gotUserProfile = (userData: ReturnUserObject) => {
    return ({
        type: USER_ACTIONS.FINISH_USER_LOAD,
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