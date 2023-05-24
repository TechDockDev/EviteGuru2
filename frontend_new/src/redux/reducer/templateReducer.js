import { ActionTypes } from "../constants/action-types";

export const templateReducer = (state = [], { type, payload }) => {
  switch (type) {
    case ActionTypes.GET_ALL_TEMPLATES:
      return [...payload];
    default:
      return state;
  }
};

export const singleTemplateReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case ActionTypes.GET_TEMPLATE:
      return { template: payload };
    default:
      return state;
  }
};

export const eventReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case ActionTypes.EVENT_DETAILS:
      return { ...payload };
    default:
      return state;
  }
};

export const createdEventDetail = (state = {}, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_CREATED_EVENT_DETAILS:
      console.log("eventDetails=>", payload);
      return { ...payload };
    case ActionTypes.SET_CREATED_LIST_ID:
      return { ...state, guestListId: payload };
    case ActionTypes.RESET_CREATED_EVENT_DETAILS:
      return {};
    default:
      return state;
  }
};
