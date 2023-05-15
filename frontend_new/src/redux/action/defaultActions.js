import { ActionTypes } from "../constants/action-types";

export const setPageTitle = (title) => {
  return {
    type: ActionTypes.SET_ACTIVE_TITLE,
    payload: title,
  };
};
