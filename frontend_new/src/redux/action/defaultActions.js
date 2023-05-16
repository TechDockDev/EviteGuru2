import { ActionTypes } from "../constants/action-types";

export const setPageTitle = (title) => {
  return {
    type: ActionTypes.SET_ACTIVE_TITLE,
    payload: title,
  };
};

export const setTempTemplateData = (template) => {
  return {
    type: ActionTypes.SET_ACTIVE_TEMPLATE,
    payload: {...template},
  };
};

export const resetTempTemplateData = () => {
  return {
    type: ActionTypes.RESET_ACTIVE_TEMPLATE,
    payload: {},
  };
};
