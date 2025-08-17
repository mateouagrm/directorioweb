import {
    GET_PAYMENT_METHOD_SUCCESS,
    GET_PAYMENT_METHOD_FAIL,
    GET_DELIVERY_METHOD_SUCCESS,
    GET_DELIVERY_METHOD_FAIL,
    GET_USER_INVOICE_SUCCESS,
    GET_USER_INVOICE_FAIL,
    GET_INVOICE_CURRENT, UPDATE_LOCATION_FAIL, SEND_CODE_MAIL, UPDATE_DATA_PAYMENT,
} from './types'
import axios from 'axios';
import {get_locations, set_location_current} from "./location";


export const set_data_payment = (data) => async dispatch => {
    dispatch({
        type: UPDATE_DATA_PAYMENT,
        payload: {data}
    });
};

export const get_payment_methods = () => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}api/payment_methods`, config);
        console.log("payment_methods",res)
        if (res.status === 200) {
            dispatch({
                type: GET_PAYMENT_METHOD_SUCCESS,
                payload: res.data.data
            });
        } else {
            dispatch({
                type: GET_PAYMENT_METHOD_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_PAYMENT_METHOD_FAIL
        });
    }
};

export const get_delivery_methods = () => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}api/delivery_methods`, config);
        console.log("delivery_methods ",res)
        if (res.status === 200) {
            dispatch({
                type: GET_DELIVERY_METHOD_SUCCESS,
                payload: res.data.data
            });
        } else {
            dispatch({
                type: GET_DELIVERY_METHOD_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_DELIVERY_METHOD_FAIL
        });
    }
};

export const get_user_invoices = (data) => async dispatch => {
    console.log("get_user_invoices", data)
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}api/user_invoices/${data.user_id}`, config);
        console.log("user_invoices",res)
        if (res.status === 200) {
            dispatch({
                type: GET_USER_INVOICE_SUCCESS,
                payload: res.data.data
            });
            dispatch(set_invoice_current(res.data.data.invoices));
        } else {
            dispatch({
                type: GET_USER_INVOICE_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_USER_INVOICE_FAIL
        });
    }
};

export const check_user_invoice = (data) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    };
    const body = {
        'user_id': data.user_id,
        'invoice_id': data.invoice_id
    };
    try {
        const res = await axios.patch(`${process.env.REACT_APP_API_URL}api/check_user_invoice`, body, config)

        console.log("petition check user ", res)

        if (res.status === 200 && res.data.success) {
            dispatch(get_user_invoices({'user_id': data.user_id}));
        } else {
            dispatch({
                type: UPDATE_LOCATION_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: SEND_CODE_MAIL
        });
    }
};


export const post_user_invoice = (data) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    };
    const body = {
        'user_id': data.user_id,
        'name': data.razon,
        'nit': data.nit,
    };
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}api/user_invoices`, body, config)

        console.log("petition post user ", res)

        if (res.status === 200 && res.data.success) {
            dispatch(get_user_invoices({'user_id': data.user_id}));
        } else {
            dispatch({
                type: UPDATE_LOCATION_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: SEND_CODE_MAIL
        });
    }
};

export const set_invoice_current = (array) => async dispatch => {
    let invoice = array.find((invoice) => invoice.is_check);
    dispatch({
        type: GET_INVOICE_CURRENT,
        payload: invoice
    });
}




