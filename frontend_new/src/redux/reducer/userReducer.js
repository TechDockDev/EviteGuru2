import { ActionTypes } from "../constants/action-types";

const initialState = { isAuthenticated: false, isUser: false };
export const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.USER_LOGIN:
      return { ...state, ...payload, isAuthenticated: true, isUser: true };
    case ActionTypes.USER_REGISTER:
      return { ...state, ...payload, isAuthenticated: true, isUser: true };
    case ActionTypes.USER_UPDATE:
      return { ...state, ...payload, isAuthenticated: true, isUser: true };
    case ActionTypes.USER_LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export const userEventReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_EVENT_TEMPLATE_JSON:
      return { ...payload };
    case ActionTypes.RESET_EVENT_TEMPLATE_JSON:
      return {};
    default:
      return state;
  }
};
