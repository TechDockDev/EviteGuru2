import { ActionTypes } from "../constants/action-types";

export const login = (data) => {
  return {
    type: ActionTypes.USER_LOGIN,
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
    type: ActionTypes.USER_REGISTER,
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
    type: ActionTypes.EVENT_DETAILS,
    payload: data,
  };
};


export const setEventTemplateJson = (data) => {
  return {
    type: ActionTypes.SET_EVENT_TEMPLATE_JSON,
    payload: data,
  };
};

