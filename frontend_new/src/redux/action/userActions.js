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

export const templateList = (data) => {
  return {
    type: ActionTypes.GET_ALL_TEMPLATES,
    payload: data,
  };
};

export const templateDetails = (data) => {
  return {
    type: ActionTypes.GET_TEMPLATE,
    payload: data,
  };
};

