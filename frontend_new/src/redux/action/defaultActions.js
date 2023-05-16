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


export const setEventDetails = (event) => {
  return {
    type: ActionTypes.SET_EVENT_DETAILS,
    payload: {...event},
  };
};

export const resetEventDetails = () => {
  return {
    type: ActionTypes.RESET_EVENT_DETAILS,
    payload: {},
  };
};
