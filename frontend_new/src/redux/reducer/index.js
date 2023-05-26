import { combineReducers } from "redux";
import { userEventReducer, userReducer } from "./userReducer";
import {
  createdEventDetail,
  eventReducer,
  singleTemplateReducer,
  templateReducer,
} from "./templateReducer";
import {
  setEventDetailsReducer,
  tempTemplateReducer,
  titleReducer,
} from "./defaultActionReducer";
import { userAuth } from "../action/userActions";

const user_reducer = combineReducers({
  userDetail: userReducer,
  allTemplates: templateReducer,
  templateData: singleTemplateReducer,
  eventDetailsPreviewData: eventReducer,
  pageTitle: titleReducer,
  tempTemplate: tempTemplateReducer,
  viewEventDetails: setEventDetailsReducer,
  userEventTemplate: userEventReducer,
  userAuth: userAuth,
  createdEventDetails: createdEventDetail,
});

export default user_reducer;
