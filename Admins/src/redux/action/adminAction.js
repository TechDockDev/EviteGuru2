import { usePanGesture } from "@chakra-ui/react";
import axios from "axios";
import {
  ADMIN_LOGIN_REQUEST,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGIN_FAIL,
  ADMIN_LOGOUT,
  ADMIN_REGISTER_FAIL,
  ADMIN_REGISTER_REQUEST,
  ADMIN_REGISTER_SUCCESS,
  ADMIN_EMAIL_OTP_REQUEST,
  ADMIN_EMAIL_OTP_SUCCESS,
  ADMIN_EMAIL_OTP_FAIL,
  ADMIN_EMAIL_PASSWORD_CHANGE_REQUEST,
  ADMIN_EMAIL_PASSWORD_CHANGE_SUCCESS,
  ADMIN_EMAIL_PASSWORD_CHANGE_FAIL,
  ADMIN_USER_LIST_REQUEST,
  ADMIN_USER_LIST_SUCCESS,
  ADMIN_USER_LIST_FAIL,
  ADMIN_USER_DELETE_REQUEST,
  ADMIN_USER_DELETE_SUCCESS,
  ADMIN_USER_DELETE_FAIL,
  ADMIN_TEMPLATE_CREATE_REQUEST,
  ADMIN_TEMPLATE_CREATE_SUCCESS,
  ADMIN_TEMPLATE_CREATE_FAIL,
  ADMIN_ALL_TEMPLATE_LIST_FAIL,
  ADMIN_ALL_TEMPLATE_LIST_REQUEST,
  ADMIN_ALL_TEMPLATE_LIST_SUCCESS,
  ADMIN_TEMPLATE_DETAILS_REQUEST,
  ADMIN_TEMPLATE_DETAILS_SUCCESS,
  ADMIN_TEMPLATE_DETAILS_FAIL,
  SUB_ADMIN_LIST_REQUEST,
  SUB_ADMIN_LIST_FAIL,
  SUB_ADMIN_LIST_SUCCESS,
  ADMIN_TEMPLATE_DELETE_REQUEST,
  ADMIN_TEMPLATE_DELETE_SUCCESS,
  ADMIN_TEMPLATE_DELETE_FAIL,
  ADMIN_TEMPLATE_UPDATE_LIST_REQUEST,
  ADMIN_TEMPLATE_UPDATE_LIST_SUCCESS,
  ADMIN_TEMPLATE_UPDATE_LIST_FAIL,
  ADMIN_SUBSCRIPTIONS_LIST_FAIL,
  ADMIN_SUBSCRIPTIONS_LIST_SUCCESS,
  ADMIN_SUBSCRIPTIONS_LIST_REQUEST,
} from "../constant/adminConstant";

export const Alogin = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_LOGIN_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/admin/adminlogin",
      { email, password },
      config
    );
    console.log("ashwini", data);
    dispatch({ type: ADMIN_LOGIN_SUCCESS, payload: data });

    localStorage.setItem("adminInfo", JSON.stringify(data));
  } catch (err) {
    dispatch({
      type: ADMIN_LOGIN_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const Alogout = () => async (dispatch) => {
  localStorage.removeItem("adminInfo");
  dispatch({ type: ADMIN_LOGOUT });
};

export const register = (name, email, phone, password) => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_REGISTER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/admin/adminregister",
      { name, email, phone, password },
      config
    );

    dispatch({ type: ADMIN_REGISTER_SUCCESS, payload: data });
    localStorage.setItem("adminInfo", JSON.stringify(data));
  } catch (err) {
    dispatch({
      type: ADMIN_REGISTER_FAIL,
      payload:
        err.message && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const Asendotp = (email) => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_EMAIL_OTP_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post("/admin/email-send", { email }, config);

    dispatch({ type: ADMIN_EMAIL_OTP_SUCCESS, payload: data });

    localStorage.setItem("AdminInfo", JSON.stringify(data));
  } catch (err) {
    dispatch({
      type: ADMIN_EMAIL_OTP_FAIL,
      payload:
        err.message && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const APasswordchange = (email, code, password) => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_EMAIL_PASSWORD_CHANGE_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/admin/change-password",
      { email, code, password },
      config
    );

    dispatch({ type: ADMIN_EMAIL_PASSWORD_CHANGE_SUCCESS, payload: data });

    localStorage.setItem("adminInfo", JSON.stringify(data));
  } catch (err) {
    dispatch({
      type: ADMIN_EMAIL_PASSWORD_CHANGE_FAIL,
      payload:
        err.message && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const AuserList = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_USER_LIST_REQUEST });

    const { data } = await axios.get("/admin/all-users");

    dispatch({ type: ADMIN_USER_LIST_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: ADMIN_USER_LIST_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const Adeleteuser = (id) => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_USER_DELETE_REQUEST });

    const { data } = await axios.delete(`/admin/user/${id}`);

    dispatch({ type: ADMIN_USER_DELETE_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: ADMIN_USER_DELETE_FAIL,
      payload:
        err.message && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const aCreatetemplate =
  (
    name,
    description,
    sampleimage,
    sampleimage1,
    sampleimage2,
    sampleimage3,
    backgroundimage
  ) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: ADMIN_TEMPLATE_CREATE_REQUEST });

      // const  {
      //     adminLogin: { admininfo },
      //  } = getState();

      const config = {
        headers: {
          //  'Content-Type':'application/json',
          //  Authorization: `Bearer ${admininfo.token}`,
          "Content-Type": "multipart/form-data",
        },
      };
      // console.log("adminLogin",admininfo)

      const { data } = await axios.post(
        "/template/create",
        {
          name,
          description,
          sampleimage,
          sampleimage1,
          sampleimage2,
          sampleimage3,
          backgroundimage,
        },
        config
      );
      // console.log(data)
      dispatch({ type: ADMIN_TEMPLATE_CREATE_SUCCESS, payload: data });

      // localStorage.setItem('templateInfo',JSON.stringify(data));
    } catch (err) {
      dispatch({
        type: ADMIN_TEMPLATE_CREATE_FAIL,
        payload:
          err.message && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };

export const ATemplateList = (page, limit) => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_ALL_TEMPLATE_LIST_REQUEST });

    const { data } = await axios.get(
      `/template/template-list?page=${page}&limit=${limit}`
    );

    dispatch({ type: ADMIN_ALL_TEMPLATE_LIST_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: ADMIN_ALL_TEMPLATE_LIST_FAIL,
      payload:
        err.message && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const ATemplateDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_TEMPLATE_DETAILS_REQUEST });

    const { data } = await axios.get(`/template/${id}`);

    dispatch({ type: ADMIN_TEMPLATE_DETAILS_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: ADMIN_TEMPLATE_DETAILS_FAIL,
      payload:
        err.message && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const ATemplateDelete = (id) => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_TEMPLATE_DELETE_REQUEST });

    const { data } = await axios.delete(`/admin/template/${id}`);

    dispatch({ type: ADMIN_TEMPLATE_DELETE_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: ADMIN_TEMPLATE_DELETE_FAIL,
      payload:
        err.message && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

// ADMIN_TEMPLATE_UPDATE_LIST_RESET,
export const ATemplateEdits = (template) => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_TEMPLATE_UPDATE_LIST_REQUEST });
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const { data } = await axios.put(
      `/template/${template._id}`,
      template,
      config
    );
    dispatch({ type: ADMIN_TEMPLATE_UPDATE_LIST_SUCCESS, payload: data });
    console.log(data);
  } catch (err) {
    dispatch({
      type: ADMIN_TEMPLATE_UPDATE_LIST_FAIL,
      payload:
        err.message && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const ASubscriptionList = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_SUBSCRIPTIONS_LIST_REQUEST });

    const { data } = await axios.get(`/admin/subscriptions`);

    dispatch({ type: ADMIN_SUBSCRIPTIONS_LIST_SUCCESS, payload: data });
    console.log(data);
  } catch (err) {
    dispatch({
      type: ADMIN_SUBSCRIPTIONS_LIST_FAIL,
      payload:
        err.message && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const SubAdminList = () => async (dispatch) => {
  try {
    dispatch({ type: SUB_ADMIN_LIST_REQUEST });

    const { data } = await axios.get("/admin-list");
    // console.log("axios data action>>>", data);
    dispatch({ type: SUB_ADMIN_LIST_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: SUB_ADMIN_LIST_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};
