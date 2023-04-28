import axios from 'axios';
import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,

    LOGIN_WITH_GOOGLE_FACEBOOK_REQUEST,
    LOGIN_WITH_GOOGLE_FACEBOOK_SUCCESS,
    LOGIN_WITH_GOOGLE_FACEBOOK_FAIL,
    LOGOUT_WITH_GOOGLE_FACEBOOK,

    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,

    USER_EMAIL_OTP_REQUEST,
    USER_EMAIL_OTP_SUCCESS,
    USER_EMAIL_OTP_FAIL,

    USER_EMAIL_PASSWORD_CHANGE_REQUEST,
    USER_EMAIL_PASSWORD_CHANGE_SUCCESS,
    USER_EMAIL_PASSWORD_CHANGE_FAIL,

} from '../constant/userConstants'

import {

    // ================== Template 

    TEMPLATE_LIST_REQUEST,
    TEMPLATE_LIST_SUCCESS,
    TEMPLATE_LIST_FAIL,

    TEMPLATE_DETAILS_FAIL,
    TEMPLATE_DETAILS_REQUEST,
    TEMPLATE_DETAILS_SUCCESS,

    TEMPLATE_EDIT_REQUEST,
    TEMPLATE_EDIT_SUCCESS,
    TEMPLATE_EDIT_FAIL,

    GET_SINGLE_EDIT_TEMPLATE_REQUEST,
    GET_SINGLE_EDIT_TEMPLATE_SUCCESS,
    GET_SINGLE_EDIT_TEMPLATE_FAIL,

    //================= EVENT DETAILS and Guest Details

    ADD_EVENT_DETAILS_FAIL,
    ADD_EVENT_DETAILS_REQUEST,
    ADD_EVENT_DETAILS_SUCCESS,

    ADD_SINGLE_AND_MULTIPAL_GUEST_FAIL,
    ADD_SINGLE_AND_MULTIPAL_GUEST_SUCCESS,
    ADD_SINGLE_AND_MULTIPAL_GUEST_REQUEST,

    GET_EDIT_SINGLE_GUESTDETAILS_REQUEST,
    GET_EDIT_SINGLE_GUESTDETAILS_SUCCESS,
    GET_EDIT_SINGLE_GUESTDETAILS_FAIL,

} from '../constant/templateConstants'

export const login = ( email, password ) => async (dispatch) => {
    try {
        dispatch({ type: USER_LOGIN_REQUEST});

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const { data } = await axios.post('/users/login',{ email, password },config); 

        dispatch({ type: USER_LOGIN_SUCCESS, payload: data});

        localStorage.setItem('userInfo', JSON.stringify(data))
    }catch (err) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: 
                err.message && err.response.data.message
                    ? err.response.data.message
                    : err.message
        });
    }
};

export const GoogleFacebookLogin = (email,uid,emailverify,name) => async (dispath) => {
    try {
        console.log(email);
        dispath({ type: LOGIN_WITH_GOOGLE_FACEBOOK_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const { data } = await axios.post('/users/auths',{email,uid,emailverify,name},config);
         console.log(data);
        dispath({ type: LOGIN_WITH_GOOGLE_FACEBOOK_SUCCESS, payload: data});

        localStorage.setItem('googlefacebookInfo', JSON.stringify(data))
    } catch (err) {
        dispath({
            type: LOGIN_WITH_GOOGLE_FACEBOOK_FAIL,
            payload:
                err.message && err.response.data.message
        })
    }
}


export const logout = () => async (dispatch) => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('googlefacebookInfo')
    dispatch({ type: USER_LOGOUT });
    dispatch({ type: LOGOUT_WITH_GOOGLE_FACEBOOK });
    // dispatch({ type: USER_DETAILS_RESET});
};

export const register = (name,email,phone,password) => async (dispatch) => {
    try {
        dispatch({ type: USER_REGISTER_REQUEST })
        
        const config = {
            headers: {
                'Content-Type':'application/json'
            },
        };

        const { data } = await axios.post('/users/user',{name,email,phone,password},config)

        dispatch({ type: USER_REGISTER_SUCCESS, payload:data })
        dispatch({ type: USER_LOGIN_SUCCESS, payload:data})

        localStorage.setItem('userInfo', JSON.stringify(data))
    }catch (err) {
        dispatch({ type: USER_REGISTER_FAIL, 
            payload: 
                err.message && err.response.data.message
                    ? err.response.data.message
                    : err.message
        });
    }
};

export const sendotp = (email) => async (dispatch) => {

    try {
        dispatch({ type: USER_EMAIL_OTP_REQUEST })

        const config = {
            headers: {
                'Content-Type':'application/json'
            },
        };

        const { data } = await axios.post('/users/email-send',{ email }, config)

        dispatch({ type: USER_EMAIL_OTP_SUCCESS, payload:data })

        localStorage.setItem('userInfo', JSON.stringify(data))
    }catch (err) {
        dispatch({ type: USER_EMAIL_OTP_FAIL,
            payload:
                err.message && err.response.data.message
                    ? err.response.data.message
                    : err.message
        });
    }
};

export const passwordchange = (email,code,password) => async (dispatch) => {

    try {
        dispatch({ type: USER_EMAIL_PASSWORD_CHANGE_REQUEST });

        const config = {
            headers: {
                'Content-Type':'application/json'
            },
        };

        const { data } = await axios.post('/users/change-password',{email,code,password},config);
       
        dispatch({type: USER_EMAIL_PASSWORD_CHANGE_SUCCESS, payload:data})

        localStorage.setItem('userInfo',JSON.stringify(data))
    }catch (err) {
        dispatch({ type: USER_EMAIL_PASSWORD_CHANGE_FAIL,
            payload:
                err.message && err.response.data.message
                    ? err.response.data.message
                    : err.message
        });
    }
};

export const ATemplateList = () => async (dispatch) => {
    try {
        dispatch({ type: TEMPLATE_LIST_REQUEST });

        const { data } = await axios.get('/template/template-list?page=1&limit=6')
        console.log("action page data:=>",data)
        dispatch({ type: TEMPLATE_LIST_SUCCESS, payload: data});
    }catch (err) {
        dispatch({ type: TEMPLATE_LIST_FAIL,
            payload: 
                err.message && err.response.data.message
                    ? err.response.data.message
                    : err.message,
        })
    }
};

export const ATemplateDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: TEMPLATE_DETAILS_REQUEST });

        const { data } = await axios.get(`/template/${id}`);

        dispatch({ type: TEMPLATE_DETAILS_SUCCESS, payload: data})

    }catch (err) {
        dispatch({ type: TEMPLATE_DETAILS_FAIL,
            payload:
                err.message && err.response.data.message
                    ? err.response.data.message
                    : err.message,
        })
    }
};

export const EditTemplate = (final_card) => async (dispatch) => {

    try {
        dispatch({ type: TEMPLATE_EDIT_REQUEST  });

        const config = {
            headers: {
                'Content-Type':'application/json'
            },
        };

        const { data } = await axios.post(`/guests/add-cards`,{final_card,},config);;
       
        dispatch({type: TEMPLATE_EDIT_SUCCESS, payload:data});

        localStorage.setItem('temp', JSON.stringify(data))
    }catch (err) {
        dispatch({ type: TEMPLATE_EDIT_FAIL,
            payload:
                err.message && err.response.data.message
                    ? err.response.data.message
                    : err.message
        });
    }
};



export const EventDetailsTemplate = (id,event_name,host_name,venue_name,venue_address,date,time,add_info) => async (dispatch) => {
     
    try {
        dispatch({ type: ADD_EVENT_DETAILS_REQUEST })

        const config = {
            headers: {
                'Content-Type':'application/json'
            }
        }

        const { data } = await axios.post(`/users/event/${id}`,{event_name,host_name,venue_name,venue_address,date,time,add_info},config);

        dispatch({ type: ADD_EVENT_DETAILS_SUCCESS, payload: data});

        localStorage.setItem('events', JSON.stringify(data))
    } catch (err) {
        dispatch({ type: ADD_EVENT_DETAILS_FAIL,
            payload:
                err.message && err.response.data.message
                    ?  err.response.data.message
                    :  err.message
        })
    }
};

export const GetSingleDetails = (id) => async (dispatch) => {

    try {
        dispatch({ type: GET_EDIT_SINGLE_GUESTDETAILS_REQUEST });

        const { data } = await axios.get(`/users/event-details/${id}`);
        dispatch({ type: GET_EDIT_SINGLE_GUESTDETAILS_SUCCESS, payload: data})
    }catch (err) {
        dispatch({ type: GET_EDIT_SINGLE_GUESTDETAILS_FAIL,
            payload:
                err.message && err.response.data.message
                    ?  err.response.data.message
                    :  err.message
        })
    }
};

export const EditSingleTemplate = (id) => async (dispatch) => {
    try {
        dispatch({ type: GET_SINGLE_EDIT_TEMPLATE_REQUEST });

        const { data } = await axios.get(`/users/event/${id}`);

        dispatch({ type: GET_SINGLE_EDIT_TEMPLATE_SUCCESS, payload: data})
    } catch (err) {
        dispatch({ type: GET_SINGLE_EDIT_TEMPLATE_FAIL,
            payload:
                err.message && err.response.data.message
                    ? err.response.data.message
                    : err.message 
        })
    }
};

export const SingleAndMultipalGuest = (id,guests) => async (dispatch) => {
    try {
        dispatch({ type: ADD_SINGLE_AND_MULTIPAL_GUEST_REQUEST });

        const config = {
            headers: {
                'Content-Type':'application/json'
            }
        };

        const { data } = await axios.post(`/guests/card/guest/${id}`,{guests},config)

        dispatch({ type: ADD_SINGLE_AND_MULTIPAL_GUEST_SUCCESS, payload: data})

    } catch (err) {
        dispatch({ type: ADD_SINGLE_AND_MULTIPAL_GUEST_FAIL,
            payload:
                err.message && err.response.data.message
                    ?  err.response.data.message
                    :  err.message
        })
    }

}