import { combineReducers } from "redux";
import redUser from "./reducers/redUser";
import redGroupList from "./reducers/redGroupList";

const reducerGlobal = combineReducers({ 
    redUser,
    redGroupList
});

export default reducerGlobal;