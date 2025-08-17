import {
    GET_PURCHASES_FAIL,
    GET_PURCHASES_SUCCESS,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    GET_PURCHASE_SUCCESS,
    GET_PURCHASE_FAIL,
    PETITION_GET_PURCHASE,
} from './types'
import axios from 'axios';


export const get_purchases = (page = 1) => async dispatch => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));


    const config = {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`
        }
    };

    try {
        let params = {
            page: page
        };

        const res = await axios.get(
            `${process.env.REACT_APP_API_URL}api/user_purchases/${user.id}`,
            { params, ...config }
        );
        if (res.status === 200) {
            dispatch({
                type: GET_PURCHASES_SUCCESS,
                payload: {
                    data: res.data.data.purchases,
                    page: page
                }
            });
        } else {
            dispatch({
                type: GET_PURCHASES_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_PURCHASES_FAIL
        });
        console.log("Error en la petición de compras", err);
    }
};


export const update_user_name = (newName) => async dispatch => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    const config = {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`
        }
    };

    const body = JSON.stringify({
        name: newName,
        user_id: user.id
    });


    try {
        const res = await axios.put(`${process.env.REACT_APP_API_URL}api/user`, body, config);

        if (res.status === 200) {
            const updatedUser = { ...user, name: newName };
            localStorage.setItem('user', JSON.stringify(updatedUser));

            dispatch({
                type: UPDATE_USER_SUCCESS,
                payload: updatedUser
            });

            return true;
        } else {
            dispatch({ type: UPDATE_USER_FAIL });
            return false;
        }
    } catch (err) {
        console.log("Error actualizando usuario:", err);
        dispatch({ type: UPDATE_USER_FAIL });
        return false;
    }
};

export const petition_true_get_sale = () => async dispatch => {
    dispatch({type: PETITION_GET_PURCHASE});
};

export const get_sale = (sale_code) => async dispatch => {
    const token = localStorage.getItem("token");

    const config = {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`
        }
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}api/sale/${sale_code}`, config);
        

        console.log('DETAIL SALE:', JSON.stringify(res));
        if (res.status === 200) {
            dispatch({
                type: GET_PURCHASE_SUCCESS,
                payload: {
                    data: res.data.data.sale,
                }
            });
        } else {
            dispatch({
                type: GET_PURCHASE_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_PURCHASE_FAIL
        });
        console.log("Error en la petición de DETALLE COMPRA", err);
    }
};

