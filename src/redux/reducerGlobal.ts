import { combineReducers } from "redux";
import redUser from "./reducers/redUser";
import redUserList from "./reducers/redUserList";
import redGroup from "./reducers/redGroup";
import redGroupList from "./reducers/redGroupList";
import redRoom from "./reducers/redRoom";
import redRoomList from "./reducers/redRoomList";
import redEquip from "./reducers/redEquip";
import redEquipList from "./reducers/redEquipList";


const reducerGlobal = combineReducers({ 
    redUser,
    redUserList,
    redGroup,
    redGroupList,
    redRoom,
    redRoomList,
    redEquip,
    redEquipList
});

export default reducerGlobal;