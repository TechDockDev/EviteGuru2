import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import { 
    // ====== user
    userLoginReducer, 
    userRegisterReducer, 
    userEmailOtpReducer, 
    userPasswordchangeReducer, 
    usergooglefacebookLoginReducer,

    //======= template
    TemplateListReducer,
    TemplateDetailsReducer,
    TemplateEditReducer,
    
    //=====Event Details
    EventDetailsReducer,
    GuestSingleAndMultipalDetailsReducer,
    SingleDetailsReducer,
} from "./oldredux/reducer/userReducer";



const reducer = combineReducers({
    // =========== User 
    userLogin: userLoginReducer,
    usergooglefacebookLogin:usergooglefacebookLoginReducer,
    userRegister:userRegisterReducer,
    userEmailOtp: userEmailOtpReducer,
    userPasswordchange: userPasswordchangeReducer,

    // ========== Template 
    templateList:TemplateListReducer,
    templateDetails:TemplateDetailsReducer,
    templateEdit:TemplateEditReducer,

    // ====== Event Details
    EventDetails:EventDetailsReducer,
    GuestSingleAndMultipalDetails:GuestSingleAndMultipalDetailsReducer,
    SingleDetails:SingleDetailsReducer
});

const userInfoFormStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null;

const googlefacebookInfoFormStorage = localStorage.getItem('googlefacebookInfo')
    ? JSON.parse(localStorage.getItem('googlefacebookInfo'))
    : null;

const EventDetailsFormStorage = localStorage.getItem('events')
    ? JSON.parse(localStorage.getItem('events'))
    : null

const editTemplateFormStorage = localStorage.getItem('temp')
    ? JSON.parse(localStorage.getItem('temp'))
    : null

const initialState = {
    userLogin: { userInfo: userInfoFormStorage },
    usergooglefacebookLogin: { googlefacebookInfo : googlefacebookInfoFormStorage },
    templateEdit: {temp: editTemplateFormStorage }
}

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
