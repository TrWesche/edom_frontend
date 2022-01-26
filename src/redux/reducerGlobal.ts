import { combineReducers } from "redux";
import redUserSecure from "./reducers/redUserSecure";

const reducerGlobal = combineReducers({ 
    redUserSecure
});

export default reducerGlobal;