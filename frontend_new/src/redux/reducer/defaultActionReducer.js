import { ActionTypes } from "../constants/action-types";

export const titleReducer = (state = { title: "" }, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_ACTIVE_TITLE:
      return { title: payload };
    default:
      return state;
  }
};
