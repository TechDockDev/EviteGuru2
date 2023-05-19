import { combineReducers } from "redux";
import { userEventReducer, userReducer } from "./userReducer";
import {
  eventReducer,
  singleTemplateReducer,
  templateReducer,
} from "./templateReducer";
import {
  setEventDetailsReducer,
  tempTemplateReducer,
  titleReducer,
} from "./defaultActionReducer";

const user_reducer = combineReducers({
  userDetail: userReducer,
  allTemplates: templateReducer,
  templateData: singleTemplateReducer,
  eventDetails: eventReducer,
  pageTitle: titleReducer,
  tempTemplate: tempTemplateReducer,
  viewEventDetails: setEventDetailsReducer,
  userEventTemplate: userEventReducer,
});

export default user_reducer;
