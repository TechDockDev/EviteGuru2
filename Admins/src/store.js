import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import { alertSlice } from "./redux/feature/alertSlice";
import {
  adminLoginReducer,
  adminCreateTemplateReducer,
  adminEmailOtpReducer,
  adminPasswordchangeReducer,
  adminUserListReducer,
  adminUserDeleteReducer,
  adminTemplateListReducer,
  adminRegisterReducer,
  adminTemplateDetailsReducer,
  adminTemplateDeleteReducer,
  adminTemplateEditReducer,
  adminSubscriptionListReducer,
  subAdminListReducer,
} from "./redux/reducer/adminReducer";

const reducer = combineReducers({
  // Only admin
  adminLogin: adminLoginReducer,
  adminEmailOtp: adminEmailOtpReducer,
  adminPasswordchange: adminPasswordchangeReducer,
  adminList: adminUserListReducer,
  adminDelete: adminUserDeleteReducer,
  adminCreateTemp: adminCreateTemplateReducer,
  adminTemplateList: adminTemplateListReducer,
  adminRegister: adminRegisterReducer,
  adminTemplateDetails: adminTemplateDetailsReducer,
  adminTemplateDelete: adminTemplateDeleteReducer,
  adminTemplateEdit: adminTemplateEditReducer,
  ASubscriptionList: adminSubscriptionListReducer,
  subAdminList: subAdminListReducer,
});

const adminInfoFromStorage = localStorage.getItem("adminInfo")
  ? JSON.parse(localStorage.getItem("adminInfo"))
  : null;

const initialState = {
  adminLogin: { adminInfo: adminInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

const configStore = configureStore({
  reducer: {
    alerts: alertSlice.reducer,
  },
});
export default store;
