import {
    GET_CATEGORY_SUCCESS,
    GET_CATEGORY_FAIL,
    GET_BANNER_SUCCESS,
    GET_BANNER_FAIL,
    GET_HOME_SUCCESS, GET_HOME_FAIL,
    GET_PRODUCT_NEW_SUCCESS,
    GET_PRODUCT_NEW_FAIL,
    GET_PRODUCT_OFFER_SUCCESS,
    GET_PRODUCT_OFFER_FAIL,

    GET_PRODUCT_BEST_SELLINGS_SUCCESS,
    GET_PRODUCT_BEST_SELLINGS_FAIL
} from './types'
import axios from 'axios';


export const get_categorias = () => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}api/categories_fathers`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_CATEGORY_SUCCESS,
                payload: res.data.data
            });
        } else {
            dispatch({
                type: GET_CATEGORY_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_CATEGORY_FAIL
        });
    }
};

export const get_banners = () => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}api/banners`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_BANNER_SUCCESS,
                payload: res.data.data
            });
        } else {
            dispatch({
                type: GET_BANNER_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_BANNER_FAIL
        });
    }
};

export const get_product_offers = () => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}api/product_offers`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_PRODUCT_OFFER_SUCCESS,
                payload: res.data.data
            });
        } else {
            dispatch({
                type: GET_PRODUCT_OFFER_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_PRODUCT_OFFER_FAIL
        });
    }
};

export const get_product_news = () => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}api/product_news`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_PRODUCT_NEW_SUCCESS,
                payload: res.data.data
            });
        } else {
            dispatch({
                type: GET_PRODUCT_NEW_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_PRODUCT_NEW_FAIL
        });
    }
};

export const get_product_best_sellings = () => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}api/product_best_sellings`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_PRODUCT_BEST_SELLINGS_SUCCESS,
                payload: res.data.data
            });
        } else {
            dispatch({
                type: GET_PRODUCT_BEST_SELLINGS_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_PRODUCT_BEST_SELLINGS_FAIL
        });
    }
};

export const get_homepage = () => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/home`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_HOME_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_HOME_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_HOME_FAIL
        });
    }
};
