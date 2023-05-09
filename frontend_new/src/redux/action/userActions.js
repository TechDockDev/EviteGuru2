import { ActionTypes } from "../constants/action-types";

export const login = (data) => {
  return {
    type: ActionTypes.USER_LOGIN_REQUEST,
    payload: data,
  };
};

export const logout = () => {
  return {
    type: ActionTypes.USER_LOGOUT,
    payload: {},
  };
};

export const register = (data) => {
  return {
    type: ActionTypes.USER_LOGIN_REQUEST,
    payload: data,
  };
};

export const setTemplateList = (data) => {
  return {
    type: ActionTypes.GET_ALL_TEMPLATES,
    payload: data,
  };
};

export const getSingleTemplate = (data) => {
  return {
    type: ActionTypes.GET_TEMPLATE,
    payload: data,
  };
};

export const setEventDetails = (data) => {
  return {
    type: ActionTypes.EVENT_DETAIL,
    payload: data,
  };
};
