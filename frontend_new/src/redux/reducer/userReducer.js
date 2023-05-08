import { type } from "@testing-library/user-event/dist/type";
import { ActionTypes } from "../constants/action-types";

const initialState = { isAuthenticated: false, isUser: false };
export const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.USER_LOGIN:
      return { ...payload, isAuthenticated: true, isUser: true };
    case ActionTypes.USER_REGISTER:
      return { ...payload, isAuthenticated: true, isUser: true };
    case ActionTypes.USER_UPDATE:
      return { ...payload, isAuthenticated: true, isUser: true };
    case ActionTypes.USER_LOGOUT:
      return initialState;
    default:
      return state;
  }
};
