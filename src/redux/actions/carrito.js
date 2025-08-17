import {
    DEC_TO_CART,
    ADD_TO_CART,
    INC_TO_CART,
    REMOVE_TO_CART,
    UPDATE_TO_CART,
    POST_SALE_SUCCESS, POST_SALE_FAIL, CLEAN_PURCHASE, SET_STORE
} from './types'
import axios from 'axios';


export const add_to_cart = (producto, quantity) => async dispatch => {
    console.log("llega a add action", producto, quantity)

    dispatch({
        type: SET_STORE,
        payload: {producto}
    });

    dispatch({
        type: ADD_TO_CART,
        payload: {producto, quantity}
    });




};

export const inc_to_cart = (producto) => async dispatch => {
    dispatch({
        type: INC_TO_CART,
        payload: {producto}
    });
};

export const dec_to_cart = (producto) => async dispatch => {
    dispatch({
        type: DEC_TO_CART,
        payload: {producto}
    });
};

export const remove_to_cart = (producto) => async dispatch => {
    dispatch({
        type: REMOVE_TO_CART,
        payload: {producto}
    });
};
export const update_to_cart = (carrito) => async dispatch => {
    dispatch({
        type: UPDATE_TO_CART,
        payload: {carrito}
    });
};

export const cleanPurchase = () => async dispatch => {
    dispatch({
        type: CLEAN_PURCHASE,
    });
};


export const buy = (data) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    };
    const body = {
        'products': data.products,
        'client_id': data.client_id,
        'store_id': data.store_id,
        'payment_method_id': data.payment_method_id,
        'delivery_method_id': data.delivery_method_id,
        'invoice_id': data.invoice_id,
        'address_id': data.address_id
    };
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}api/sale`, body, config)
        if (res.status === 200) {
            dispatch({
                type: POST_SALE_SUCCESS,
                payload: res.data
            });
            return true;
        } else {
            dispatch({
                type: POST_SALE_FAIL
            });
            return false;
        }
    } catch (err) {
        dispatch({
            type: POST_SALE_FAIL
        });
    }
};


