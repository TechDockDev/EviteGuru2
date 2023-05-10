import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import {
  eventReducer,
  singleTemplateReducer,
  templateReducer,
} from "./templateReducer";

const user_reducer = combineReducers({
  userDetail: userReducer,
  allTemplates: templateReducer,
  templateData: singleTemplateReducer,
  eventDetails: eventReducer,
});

export default user_reducer;
