import { combineReducers } from "redux";
import redUser from "./reducers/redUser";

const reducerGlobal = combineReducers({ 
    redUser
});

export default reducerGlobal;