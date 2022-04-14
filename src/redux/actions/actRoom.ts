// https://medium.com/@killerchip0/handling-asynchronous-fetching-of-data-with-react-redux-2aecc65e87af

// Libraries
import { Dispatch } from "redux";

// Interfaces
import { RequestRoomObject } from "../../interfaces/edomRoomInterfaces";

// API
import apiEDOM from "../../utils/apiEDOM";

// Utilities

// Redux Actions
import {
    ROOM_ACTIONS,
    ERROR
} from "../actionDictionary";


const fetchRoomProfile = (roomID: string) => {
    return async function (dispatch: Dispatch) {
        dispatch(startFetchRoomProfile());
        try {
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

const gotRoomProfile = (roomData: RequestRoomObject) => {
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