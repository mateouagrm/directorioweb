import {
    SEND_CODE_MAIL, VERIFY_CODE_MAIL, REGISTER_USER,
    LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT, USER_SUCCESS, UPDATE_USER_SUCCESS, CLEAR_LOGIN_ERROR,
} from '../actions/types';

const initialState = {
    code_mail: null,
    code_mail_verify: false,
    token: localStorage.getItem('token'),
    success_login: false,
    error_login: false,
    logout: false,
    user: JSON.parse(localStorage.getItem('user')),
};

export default function Auth(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case LOGIN_SUCCESS:
            if (payload && payload.data) {
                localStorage.setItem('token', payload.data.token.token);
                localStorage.setItem('user', JSON.stringify(payload.data.user));
                return {
                    ...state,
                    token: payload.data.token.token,
                    success_login: true,
                    error_login: null,
                    user: payload.data.user,
                };
            }
            return state;

        case LOGIN_ERROR:
            return {
                ...state,
                success_login: false,
                error_login: payload,
            };

        case CLEAR_LOGIN_ERROR:
            return {
                ...state,
                error_login: null,
            };

        case SEND_CODE_MAIL:
            return { ...state, code_mail: true };

        case VERIFY_CODE_MAIL:
            return { ...state, code_mail_verify: true };

        case REGISTER_USER:
            localStorage.setItem('token', payload.data.token.token);
            localStorage.setItem('user', JSON.stringify(payload.data.user));
            return {
                ...state,
                token: payload.data.token.token,
                success_login: payload.success,
                user: payload.data.user,
            };

        case USER_SUCCESS:
            return { ...state, user: payload.data };

        case UPDATE_USER_SUCCESS:
            return { ...state, user: payload };

        case LOGOUT:
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            return {
                ...state,
                logout: true,
                token: null,
                user: null,
            };

        default:
            return state;
    }
}
