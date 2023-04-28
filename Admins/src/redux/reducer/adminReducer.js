import {
  ADMIN_LOGIN_REQUEST,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGIN_FAIL,
  ADMIN_LOGOUT,
  ADMIN_REGISTER_REQUEST,
  ADMIN_REGISTER_SUCCESS,
  ADMIN_REGISTER_FAIL,
  ADMIN_EMAIL_OTP_REQUEST,
  ADMIN_EMAIL_OTP_SUCCESS,
  ADMIN_EMAIL_OTP_FAIL,
  ADMIN_EMAIL_PASSWORD_CHANGE_REQUEST,
  ADMIN_EMAIL_PASSWORD_CHANGE_SUCCESS,
  ADMIN_EMAIL_PASSWORD_CHANGE_FAIL,
  ADMIN_USER_LIST_REQUEST,
  ADMIN_USER_LIST_SUCCESS,
  ADMIN_USER_LIST_FAIL,
  ADMIN_USER_DELETE_REQUEST,
  ADMIN_USER_DELETE_SUCCESS,
  ADMIN_USER_DELETE_FAIL,
  SUB_ADMIN_LIST_REQUEST,
  SUB_ADMIN_LIST_SUCCESS,
  SUB_ADMIN_LIST_FAIL,
  ADMIN_TEMPLATE_CREATE_REQUEST,
  ADMIN_TEMPLATE_CREATE_SUCCESS,
  ADMIN_TEMPLATE_CREATE_FAIL,
  ADMIN_TEMPLATE_CREATE_RESET,
  ADMIN_ALL_TEMPLATE_LIST_REQUEST,
  ADMIN_ALL_TEMPLATE_LIST_SUCCESS,
  ADMIN_ALL_TEMPLATE_LIST_FAIL,
  ADMIN_TEMPLATE_DETAILS_REQUEST,
  ADMIN_TEMPLATE_DETAILS_SUCCESS,
  ADMIN_TEMPLATE_DETAILS_FAIL,
  ADMIN_TEMPLATE_DELETE_REQUEST,
  ADMIN_TEMPLATE_DELETE_SUCCESS,
  ADMIN_TEMPLATE_UPDATE_LIST_FAIL,
  ADMIN_TEMPLATE_UPDATE_LIST_SUCCESS,
  ADMIN_TEMPLATE_UPDATE_LIST_REQUEST,
  ADMIN_TEMPLATE_UPDATE_LIST_RESET,
  ADMIN_TEMPLATE_DELETE_FAIL,
  ADMIN_SUBSCRIPTIONS_LIST_FAIL,
  ADMIN_SUBSCRIPTIONS_LIST_REQUEST,
  ADMIN_SUBSCRIPTIONS_LIST_SUCCESS,
} from "../constant/adminConstant";

export const adminLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_LOGIN_REQUEST:
      return { loading: true };
    case ADMIN_LOGIN_SUCCESS:
      return { loading: true, adminInfo: action.payload };
    case ADMIN_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case ADMIN_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const adminRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_REGISTER_REQUEST:
      return { loading: true };
    case ADMIN_REGISTER_SUCCESS:
      return { loading: false, adminInfo: action.payload };
    case ADMIN_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const adminEmailOtpReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_EMAIL_OTP_REQUEST:
      return { loading: true };
    case ADMIN_EMAIL_OTP_SUCCESS:
      return { loading: false, adminInfo: action.payload };
    case ADMIN_EMAIL_OTP_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const adminPasswordchangeReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_EMAIL_PASSWORD_CHANGE_REQUEST:
      return { loading: true };
    case ADMIN_EMAIL_PASSWORD_CHANGE_SUCCESS:
      return { loading: false, adminInfo: action.payload };
    case ADMIN_EMAIL_PASSWORD_CHANGE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const adminUserListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case ADMIN_USER_LIST_REQUEST:
      return { loading: true, users: [] };
    case ADMIN_USER_LIST_SUCCESS:
      return { loading: false, users: action.payload };
    case ADMIN_USER_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const subAdminListReducer = (state = { admins: [] }, action) => {
  switch (action.type) {
    case SUB_ADMIN_LIST_REQUEST:
      return { loading: true, admins: [] };
    case SUB_ADMIN_LIST_SUCCESS:
      return { loading: false, admins: action.payload };
    case SUB_ADMIN_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const adminUserDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_USER_DELETE_REQUEST:
      return { loading: true };
    case ADMIN_USER_DELETE_SUCCESS:
      return { loading: false, success: true };
    case ADMIN_USER_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const adminCreateTemplateReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_TEMPLATE_CREATE_REQUEST:
      return { loading: true };
    case ADMIN_TEMPLATE_CREATE_SUCCESS:
      return { loading: false, success: true, template: action.payload };
    case ADMIN_TEMPLATE_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case ADMIN_TEMPLATE_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const adminTemplateListReducer = (state = { template: [] }, action) => {
  switch (action.type) {
    case ADMIN_ALL_TEMPLATE_LIST_REQUEST:
      return { loading: true, template: [] };
    case ADMIN_ALL_TEMPLATE_LIST_SUCCESS:
      return {
        loading: false,
        template: action.payload.template,
        total: action.payload.total,
      };
    case ADMIN_ALL_TEMPLATE_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const adminTemplateDetailsReducer = (
  state = { template: {} },
  action
) => {
  switch (action.type) {
    case ADMIN_TEMPLATE_DETAILS_REQUEST:
      return { ...state, loading: true };
    case ADMIN_TEMPLATE_DETAILS_SUCCESS:
      return { loading: false, template: action.payload };
    case ADMIN_TEMPLATE_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const adminTemplateDeleteReducer = (
  state = { template: {} },
  action
) => {
  switch (action.type) {
    case ADMIN_TEMPLATE_DELETE_REQUEST:
      return { ...state, loading: true };
    case ADMIN_TEMPLATE_DELETE_SUCCESS:
      return { loading: false, error: action.payload };
    case ADMIN_TEMPLATE_DELETE_FAIL:
      return {};
    default:
      return state;
  }
};

export const adminTemplateEditReducer = (state = { template: {} }, action) => {
  switch (action.type) {
    case ADMIN_TEMPLATE_UPDATE_LIST_REQUEST:
      return { loading: true };
    case ADMIN_TEMPLATE_UPDATE_LIST_SUCCESS:
      return { loading: false, template: action.payload };
    case ADMIN_TEMPLATE_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case ADMIN_TEMPLATE_UPDATE_LIST_RESET:
      return { template: {} };
    default:
      return state;
  }
};

export const adminSubscriptionListReducer = (
  state = { subscription: [] },
  action
) => {
  switch (action.type) {
    case ADMIN_SUBSCRIPTIONS_LIST_REQUEST:
      return { loading: true, subscription: [] };
    case ADMIN_SUBSCRIPTIONS_LIST_SUCCESS:
      return {
        loading: false,
        subscription: action.payload.subscription,
      };
    case ADMIN_SUBSCRIPTIONS_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
