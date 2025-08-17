import {
    GET_PRODUCT_SUCCESS,
    GET_PRODUCTS_SUCCESS,
    GET_PRODUCT_FAIL,
    GET_PRODUCTS_FAIL,
    PETITION_PROD,
    CLEAR_DATA,
    GET_PRODUCTS_RELATIONS_SUCCESS,
    SET_SEARCH_SUCCESS,
    CLEAR_SEARCH_SUCCESS,
    GET_SEARCH_PRODUCTS_SUCCESS,
    PETITION_PROD_SEARCH,
    UPDATE_FAVORITE_STATUS,
    CLEAR_PRODUCT,
} from './types'
import axios from 'axios';

export const set_search = (value) => async dispatch => {
    dispatch({
        type: SET_SEARCH_SUCCESS,
        payload: value
    });
};

export const limpiar_search = () => async dispatch => {
    dispatch({ type: CLEAR_SEARCH_SUCCESS });
};


export const clean_prods = () => async dispatch => {
    dispatch({ type: CLEAR_DATA });
};

export const petition_true = () => async dispatch => {
    dispatch({ type: PETITION_PROD });
};
export const petition_true_search = () => async dispatch => {
    dispatch({ type: PETITION_PROD_SEARCH });
};

export const clear_product = () => async dispatch => {
    dispatch({ type: CLEAR_PRODUCT });
};


export const get_product = (product_slug) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}api/product_info/${product_slug}`, null, config);
        if (res.status === 200) {
            dispatch({
                type: GET_PRODUCT_SUCCESS,
                payload: res.data.data
            });

        } else {
            dispatch({
                type: GET_PRODUCT_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_PRODUCT_FAIL
        });
    }
};

export const get_products = (filter, page = 1) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    };
    try {
        let params = {
            store_slug          : filter?.store_slug,
            category_id         : filter?.category_id,
            sub_category_id     : filter?.sub_category_id,
            sub_sub_category_id : filter?.sub_sub_category_id,
            min                 : filter?.min || 0,
            max                 : filter?.max || 10000,
            descuento           : filter?.descuento || 0,
            page: page,
        };
        // console.log("API GET PRODCUTS PARAMS: ", params)
        const res = await axios.get(`${process.env.REACT_APP_API_URL}api/products`, { params }, config);
        // console.log("API GET PRODCUTS DATA: ",  res.data.data)
        if (res.status === 200) {
            dispatch({
                type: GET_PRODUCTS_SUCCESS,
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
        console.log("get_products fails", err);
    }
};

export const get_search_products = (filter, page = 1) => async dispatch => {
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
            search      : filter?.search,
            page        : page,
        };

        console.log('search: ' , filter);
        

        const res = await axios.get(`${process.env.REACT_APP_API_URL}api/products`, { params }, config);
    
        if (res.status === 200) {
            dispatch({
                type: GET_SEARCH_PRODUCTS_SUCCESS,
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
        console.log("get_search_products fails", err);
    }
};


export const get_products_relations = (data, page = 1) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    };
    try {
        let params = {
            category_id: data.category_id,
            page: page,
        };
        const res = await axios.get(`${process.env.REACT_APP_API_URL}api/products`, { params }, config);
        if (res.status === 200) {
            dispatch({
                type: GET_PRODUCTS_RELATIONS_SUCCESS,
                payload: res.data.data.products
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
        console.log("get_products_relations fails", err);
    }
};

export const set_favorite_product = (productId, isFavorite) => async dispatch => {

    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    // Configurar headers con el token
    const config = {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`
        },
    };


    const body = {
        'product_id': productId,
        'user_id': user['id'],
    };
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}api/add_or_remove_product_to_favorites`, body, config)
        dispatch({
            type: UPDATE_FAVORITE_STATUS,
            payload: { productId, isFavorite }
        });
    } catch (err) {
        dispatch({
            type: null,
        });
    }
};
