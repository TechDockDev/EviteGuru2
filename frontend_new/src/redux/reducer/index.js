import { combineReducers } from "redux";
import {
  setIsLoading,
  setIsNavigate,
  setUnsaved,
  snacbarReducer,
  userEventReducer,
  userReducer,
} from "./userReducer";
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
  snackbar: snacbarReducer,
  loading: setIsLoading,
  isNavigate: setIsNavigate,
  unsaved: setUnsaved,
});

export default user_reducer;
