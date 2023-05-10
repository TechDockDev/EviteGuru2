import {
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,

    LOGIN_WITH_GOOGLE_FACEBOOK_FAIL,
    LOGIN_WITH_GOOGLE_FACEBOOK_REQUEST,
    LOGIN_WITH_GOOGLE_FACEBOOK_SUCCESS,
    LOGOUT_WITH_GOOGLE_FACEBOOK,
    
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,

    USER_EMAIL_OTP_FAIL,
    USER_EMAIL_OTP_REQUEST,
    USER_EMAIL_OTP_SUCCESS,
    
    USER_EMAIL_PASSWORD_CHANGE_FAIL,
    USER_EMAIL_PASSWORD_CHANGE_REQUEST,
    USER_EMAIL_PASSWORD_CHANGE_SUCCESS,

} from "../constant/userConstants"

import { 

    // ========= Tmplate

    TEMPLATE_LIST_REQUEST,
    TEMPLATE_LIST_SUCCESS,
    TEMPLATE_LIST_FAIL,
    
    TEMPLATE_DETAILS_FAIL,
    TEMPLATE_DETAILS_REQUEST,
    TEMPLATE_DETAILS_SUCCESS,

    TEMPLATE_EDIT_FAIL,
    TEMPLATE_EDIT_SUCCESS,
    TEMPLATE_EDIT_REQUEST,

    // ========= Event Details & Guest Details

    ADD_EVENT_DETAILS_FAIL,
    ADD_EVENT_DETAILS_REQUEST,
    ADD_EVENT_DETAILS_SUCCESS,

    ADD_SINGLE_AND_MULTIPAL_GUEST_REQUEST,
    ADD_SINGLE_AND_MULTIPAL_GUEST_SUCCESS,
    ADD_SINGLE_AND_MULTIPAL_GUEST_FAIL,

    GET_EDIT_SINGLE_GUESTDETAILS_REQUEST,
    GET_EDIT_SINGLE_GUESTDETAILS_FAIL,
    GET_EDIT_SINGLE_GUESTDETAILS_SUCCESS,

} from "../constant/templateConstants";

// ========================== User ===============================

export const userLoginReducer = (state = {}, action ) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return { loading: true };
        case USER_LOGIN_SUCCESS:
            return { loading: false, userInfo: action.payload };
        case USER_LOGIN_FAIL:
            return { loading: false, error: action.payload };
        case USER_LOGOUT:
            return {};
        default: return state;
    }
};

export const usergooglefacebookLoginReducer = (state = {}, action ) => {
    switch (action.type) {
        case LOGIN_WITH_GOOGLE_FACEBOOK_REQUEST:
            return { loading: true };
        case LOGIN_WITH_GOOGLE_FACEBOOK_SUCCESS:
            return { loading: false, googlefacebookInfo: action.payload };
        case LOGIN_WITH_GOOGLE_FACEBOOK_FAIL:
            return { loading: false, error: action.payload };
        case LOGOUT_WITH_GOOGLE_FACEBOOK:
            return {};
        default:
            return state;
    }
}

export const userRegisterReducer = (state = {}, action ) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return { loading: true };
        case USER_REGISTER_SUCCESS:
            return { loading: false, userInfo: action.payload};
        case USER_REGISTER_FAIL:
            return { loading: false, error: action.payload};
        default:
            return state;
    }
};

export const userEmailOtpReducer = (state = {}, action ) => {
    switch (action.type) {
        case USER_EMAIL_OTP_REQUEST:
            return { loading: true}
        case USER_EMAIL_OTP_SUCCESS:
            return { loading: false, userInfo: action.payload};
        case USER_EMAIL_OTP_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const userPasswordchangeReducer = (state = {}, action ) => {
    switch (action.type) {
        case USER_EMAIL_PASSWORD_CHANGE_REQUEST:
            return { loading: true };
        case USER_EMAIL_PASSWORD_CHANGE_SUCCESS:
            return { loading: false, userInfo: action.payload};
        case USER_EMAIL_PASSWORD_CHANGE_FAIL:
            return { loading: false, error: action.payload}
        default: 
            return state;
    }
};

//=====================Template==========================

export const TemplateListReducer = (state = { template: [] }, action) => {
    switch (action.type) {
        case TEMPLATE_LIST_REQUEST:
            return { loading: true, template: [] };
        case TEMPLATE_LIST_SUCCESS:
            return { loading: false, template: action.payload.template , total: action.payload.total };
        case TEMPLATE_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const TemplateDetailsReducer = ( state = { template: { } }, action) => {
    switch (action.type) {
        case TEMPLATE_DETAILS_REQUEST:
            return { ...state , loading: true };
        case TEMPLATE_DETAILS_SUCCESS:
            return { loading: false, template: action.payload };
        case TEMPLATE_DETAILS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const TemplateEditReducer = ( state = {} , action) => {
    switch (action.type) {
        case TEMPLATE_EDIT_REQUEST:
            return { loading: true };
        case TEMPLATE_EDIT_SUCCESS:
            return { loading: false , temp: action.payload }
        case TEMPLATE_EDIT_FAIL:
            return { loading: false , error: action.payload }
        default:
            return state;
    }
};


// ================  Event & Gust

export const EventDetailsReducer = ( state = {} , action ) => {
    switch (action.type) {
        case ADD_EVENT_DETAILS_REQUEST:
            return { loading: true };
        case ADD_EVENT_DETAILS_SUCCESS:
            return { laoding: false, events: action.payload }
        case ADD_EVENT_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
};

export const GuestSingleAndMultipalDetailsReducer = (state = {}, action ) => {
    switch (action.type) {
        case ADD_SINGLE_AND_MULTIPAL_GUEST_REQUEST:
            return { loading: true };
        case ADD_SINGLE_AND_MULTIPAL_GUEST_SUCCESS:
            return { loading: false, guest: action.payload }
        case ADD_SINGLE_AND_MULTIPAL_GUEST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
};

export const SingleDetailsReducer = ( state = { event : { } }, action) => {
    switch (action.type) {
        case GET_EDIT_SINGLE_GUESTDETAILS_REQUEST:
            return { ...state, loading: true };
        case GET_EDIT_SINGLE_GUESTDETAILS_SUCCESS:
            return { loading: false , event: action.payload };
        case GET_EDIT_SINGLE_GUESTDETAILS_FAIL:
            return { loading: false , error: action.payload };
        default:
            return state;
    }
};
