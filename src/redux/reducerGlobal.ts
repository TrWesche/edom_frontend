import { combineReducers } from "redux";
import redUser from "./reducers/redUser";
import redGroupList from "./reducers/redGroupList";
import redRoomList from "./reducers/redRoomList";
import redEquipList from "./reducers/redEquipList";


const reducerGlobal = combineReducers({ 
    redUser,
    redGroupList,
    redRoomList,
    redEquipList
});

export default reducerGlobal;