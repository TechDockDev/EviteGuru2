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
      return { eventDetails: payload };
    default:
      return state;
  }
};
