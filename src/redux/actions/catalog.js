import {
    GET_PRODUCTS_FAIL,
    GET_OFFER_PRODUCTS_SUCCESS,
    PETITION_PROD_OFFER,
    GET_NEW_PRODUCTS_SUCCESS,
    PETITION_PROD_NEW,
    GET_FAVORITE_PRODUCTS,
    PETITION_PROD_FAVORITE,
    GET_BEST_SELLING_PRODUCTS_SUCCESS,
    PETITION_PROD_BEST_SELLING,
} from './types'
import axios from 'axios';

export const petition_true_offer = () => async dispatch => {
    dispatch({type: PETITION_PROD_OFFER});
};

export const petition_true_new = () => async dispatch => {
    dispatch({type: PETITION_PROD_NEW});
};

export const petition_true_favorites = () => async dispatch => {
    dispatch({type: PETITION_PROD_FAVORITE});
};

export const petition_true_best_sellings = () => async dispatch => {
    dispatch({type: PETITION_PROD_BEST_SELLING});
};

export const get_offer_products = (filter, page = 1) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    };
    try {
        let params = {
            min         : filter?.min || 0,
            max         : filter?.max || 10000,
            descuento   : filter?.descuento || 0,
            offer       : filter?.offer,
            page        : page,
        };

        // console.log("entra a piticion offer", params)
        const res = await axios.get(`${process.env.REACT_APP_API_URL}api/product_offers`, {params}, config);
        if (res.status === 200) {
            dispatch({
                type: GET_OFFER_PRODUCTS_SUCCESS,
                payload: {
                    data: res.data.data.products.data, // Enviar productos
                    page: page // Enviar número de página
                }
            });
        } else {
            dispatch({
                type: GET_PRODUCTS_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_PRODUCTS_FAIL
        });
        console.log("get_offer_products fails", err);
    }
};

export const get_new_products = (filter, page = 1) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    };
    try {
        let params = {
            min         : filter?.min || 0,
            max         : filter?.max || 10000,
            descuento   : filter?.descuento || 0,
            new         : filter?.new,
            page        : page,
        };
        const res = await axios.get(`${process.env.REACT_APP_API_URL}api/product_news`, {params}, config);

        if (res.status === 200) {
            dispatch({
                type: GET_NEW_PRODUCTS_SUCCESS,
                payload: {
                    data: res.data.data.products.data, // Enviar productos
                    page: page // Enviar número de página
                }
            });
        } else {
            dispatch({
                type: GET_PRODUCTS_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_PRODUCTS_FAIL
        });
        console.log("get_new_products fails", err);
    }
};

export const get_favorite_products = (filter, page = 1) => async dispatch => {
    const token = localStorage.getItem("token");
    const user  = JSON.parse(localStorage.getItem("user"));

    const config = {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`
        }
    };

    try {
        let params = {
            min         : filter?.min || 0,
            max         : filter?.max || 10000,
            descuento   : filter?.descuento || 0,
            page        : page
        };

        console.log(params);
        
        const res = await axios.get(
            `${process.env.REACT_APP_API_URL}api/user_favorites_products/${user.id}`,
            { params, ...config }
        );

        if (res.status === 200) {
            dispatch({
                type: GET_FAVORITE_PRODUCTS,
                payload: {
                    data: res.data.data.products.data, // Enviar productos
                    page: page // Enviar número de página
                }
            });
        } else {
            dispatch({
                type: GET_PRODUCTS_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_PRODUCTS_FAIL
        });
        console.log("Error en la petición de productos favoritos", err);
    }
};

export const get_best_selling_products = (filter, page = 1) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    };
    try {
        let params = {
            min         : filter?.min || 0,
            max         : filter?.max || 10000,
            descuento   : filter?.descuento || 0,
            new         : filter?.new,
            page        : page,
        };
        const res = await axios.get(`${process.env.REACT_APP_API_URL}api/product_best_sellings`, {params}, config);

        if (res.status === 200) {
            dispatch({
                type: GET_BEST_SELLING_PRODUCTS_SUCCESS,
                payload: {
                    data: res.data.data.products.data,
                    page: page
                }
            });
        } else {
            dispatch({
                type: GET_PRODUCTS_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_PRODUCTS_FAIL
        });
        console.log("get_new_products fails", err);
    }
};


