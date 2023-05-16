import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import {
  eventReducer,
  singleTemplateReducer,
  templateReducer,
} from "./templateReducer";
import { tempTemplateReducer, titleReducer } from "./defaultActionReducer";

const user_reducer = combineReducers({
  userDetail: userReducer,
  allTemplates: templateReducer,
  templateData: singleTemplateReducer,
  eventDetails: eventReducer,
  pageTitle: titleReducer,
  tempTemplate: tempTemplateReducer,
});

export default user_reducer;
