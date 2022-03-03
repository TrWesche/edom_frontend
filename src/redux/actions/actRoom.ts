// https://medium.com/@killerchip0/handling-asynchronous-fetching-of-data-with-react-redux-2aecc65e87af

import { Dispatch } from "redux";
import { RoomObjectProps } from "../../interfaces/globalInterfaces";
import { authToken} from "../../providers/authProvider";

import apiEDOM from "../../utils/apiEDOM";
import {
    ROOM_ACTIONS,
    ERROR
} from "../actionDictionary";



const fetchRoomProfile = (roomID: string, authData: authToken | undefined) => {
    return async function (dispatch: Dispatch) {
        dispatch(startFetchRoomProfile());
        try {
            if (!authData?.username) {
                throw new Error ("Current User Authentication Data Malformed | User Not Logged In");
            };

            const result = await apiEDOM.getRoom(roomID);
            const data = result.data.room;
            dispatch(gotRoomProfile(data));
            
        } catch (error) {
            console.log("Redux Error Caught");
            dispatch(gotError());
        }
    }
};

const startFetchRoomProfile = () => {
    return ({
        type: ROOM_ACTIONS.START_ROOM_LOAD
    });
};

const gotRoomProfile = (roomData: RoomObjectProps) => {
    return ({
        type: ROOM_ACTIONS.FINISH_ROOM_LOAD,
        payload: roomData
    })
};


const gotError = () => {
    return ({
        type: ERROR
    })
};

export {
    fetchRoomProfile
}