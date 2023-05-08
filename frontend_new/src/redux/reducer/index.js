import { combineReducers } from "redux";
import { userReducer } from "./userReducer";

const user_reducer = combineReducers({ userDetail: userReducer });

export default user_reducer;
