import { ActionTypes } from "../constants/action-types";

export const login = (data) => {
  return {
    type: ActionTypes.USER_LOGIN,
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
    type: ActionTypes.USER_REGISTER,
    payload: data,
  };
};

// user auth action
export const userAuth = (data) => {
  return {
    type: ActionTypes.USER_AUTH,
    payload: data,
  };
};
export const setTemplateList = (data) => {
  return {
    type: ActionTypes.GET_ALL_TEMPLATES,
    payload: data,
  };
};

export const getSingleTemplate = (data) => {
  return {
    type: ActionTypes.GET_TEMPLATE,
    payload: data,
  };
};

export const setCreatedEventDetail = (data) => {
  return {
    type: ActionTypes.SET_CREATED_EVENT_DETAILS,
    payload: data,
  };
};

export const resetCreatedEventDetail = () => {
  return {
    type: ActionTypes.RESET_CREATED_EVENT_DETAILS,
    payload: {},
  };
};
// function to set created list id =======
export const setCreatedListId = (id) => {
  return {
    type: ActionTypes.SET_CREATED_LIST_ID,
    payload: id,
  };
};
export const setEventTemplate = (data) => {
  console.log("data=>", data);
  return {
    type: ActionTypes.SET_EVENT_TEMPLATE_JSON,
    payload: data,
  };
};

export const reSetEventTemplate = () => {
  return {
    type: ActionTypes.RESET_EVENT_TEMPLATE_JSON,
    payload: {},
  };
};

export const openSnackbar = (message, severity) => {
  return {
    type: ActionTypes.OPEN_SNACKBAR,
    payload: { message: message, severity: severity },
  };
};

export const closeSnackbar = () => {
  return {
    type: ActionTypes.CLOSE_SNACKBAR,
    payload: {},
  };
};

export const isLoading = (open) => {
  return {
    type: ActionTypes.SET_ISLOADING,
    payload: open,
  };
};

export const setNavigate = (status, path,open) => {
  return {
    type: ActionTypes.SET_NAVIGATE,
    payload: { status: status, path: path ,open:open},
  };
};

export const setDialogueBoxOpen = (open) => {
  return { type: ActionTypes.OPEN_DIALOGUE, payload: { open: open } };
};

export const setUnsavedStatus = (saved) => {
  return { type: ActionTypes.UNSAVED_STATUS, payload: saved };
};
