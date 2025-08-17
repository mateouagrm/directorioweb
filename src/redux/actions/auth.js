import {
    LOGIN_SUCCESS,
    SEND_CODE_MAIL,
    VERIFY_CODE_MAIL,
    REGISTER_USER,
    LOGOUT,
    USER_SUCCESS,
    LOGIN_ERROR,
    CLEAR_LOGIN_ERROR,
} from './types'
import axios from 'axios';
import {cleanPurchase} from "./carrito";

export const set_logout = () => async dispatch => {
    dispatch({type: LOGOUT});
    dispatch(cleanPurchase());
};

export const login = (data) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
        }
    };

    const body = new URLSearchParams();
    body.append('email', data.email);
    body.append('password', data.password);

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}api/login`, body, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        console.log('Entrando al catch');
        console.log('Error 401:', err.response?.status);
    
        dispatch({
            type: LOGIN_ERROR,
            payload: err.response?.data?.message || 'Error de inicio de sesión',
        });
    }
};

export const clearLoginError = () => ({
    type: CLEAR_LOGIN_ERROR,
});

export const send_verification_code_email = (email) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
        }
    };
    const body = {
        'email': email
    };
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}api/send_verification_code_email`, body, config)

        console.log("petition mail ", res)

        if (res.status === 200) {
            dispatch({
                type: SEND_CODE_MAIL,
                payload: res.data
            });
        } else {
            dispatch({
                type: SEND_CODE_MAIL
            });
        }
    } catch (err) {
        dispatch({
            type: SEND_CODE_MAIL
        });
    }
};

export const verify_code_by_email = (data) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
        }
    };
    const body = {
        'email': data.email,
        'code': data.code,
    };
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}api/verify_code_by_email`, body, config)

        console.log("petition verificar code ", res)

        if (res.status === 200) {
            dispatch({
                type: VERIFY_CODE_MAIL,
                payload: res.data
            });
        } else {
            dispatch({
                type: SEND_CODE_MAIL
            });
        }
    } catch (err) {
        dispatch({
            type: SEND_CODE_MAIL
        });
    }
};

export const register = (data) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
        }
    };
    const body = {
        'email': data.email,
        'code': data.code,
        'name': data.name,
        'password': data.password,
        'password_confirmation': data.password_confirmation
    };
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}api/register`, body, config)

        console.log("petition register ", res)

        if (res.status === 200) {
            console.log('ENTRO AL REGISTER SUCCES');

            dispatch({
                type: REGISTER_USER,
                payload: res.data
            });
        } else {
            dispatch({
                type: SEND_CODE_MAIL
            });
        }
    } catch (err) {
        dispatch({
            type: SEND_CODE_MAIL
        });
    }
};

export const user = () => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}api/user`, config)
        console.log("petition user ", res)

        if (res.status === 200) {
            dispatch({
                type: USER_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: USER_SUCCESS
            });
        }
    } catch (err) {
        dispatch({
            type: USER_SUCCESS
        });
    }
};

export const change_password = (data) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    };

    const body = new URLSearchParams();
    body.append('password', data.currentPassword);
    body.append('new_password', data.newPassword);

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}api/change_password`, body, config);

        if (res.status === 200) {
            return true; // <- aquí el return correcto
        } else {
            return false;
        }
    } catch (err) {
        return false;
    }
};

