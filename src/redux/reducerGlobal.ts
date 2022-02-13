import { combineReducers } from "redux";
import redUser from "./reducers/redUser";
import redGroupList from "./reducers/redGroupList";
import redRoomList from "./reducers/redRoomList";


const reducerGlobal = combineReducers({ 
    redUser,
    redGroupList,
    redRoomList
});

export default reducerGlobal;