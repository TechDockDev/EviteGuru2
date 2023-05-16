import { ActionTypes } from "../constants/action-types";

export const titleReducer = (state = { title: "" }, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_ACTIVE_TITLE:
      return { title: payload };
    default:
      return state;
  }
};

export const tempTemplateReducer = (
  state = { template: {}, active: false },
  { type, payload }
) => {
  switch (type) {
    case ActionTypes.SET_ACTIVE_TEMPLATE:
      return { template: { ...payload }, active: true };
    case ActionTypes.RESET_ACTIVE_TEMPLATE:
      return { template: {}, active: false };
    default:
      return state;
  }
};
