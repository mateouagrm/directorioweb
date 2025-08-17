import {
    GET_LOCATION_SUCCESS,
    GET_LOCATION_FAIL,
    GET_LOCATION_CURRENT,
    REGISTER_USER,
    SEND_CODE_MAIL,
    UPDATE_LOCATION_SUCCESS, UPDATE_LOCATION_FAIL
} from './types'
import axios from 'axios';

export const get_locations = () => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}api/locations`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_LOCATION_SUCCESS,
                payload: res.data.data
            });
            dispatch(set_location_current(res.data.data.addresses));
        } else {
            dispatch({
                type: GET_LOCATION_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_LOCATION_FAIL
        });
    }
};

export const check_user_address = (data) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    };
    const body = {
        'user_id': data.user_id,
        'address_id': data.address_id
    };
    try {
        const res = await axios.patch(`${process.env.REACT_APP_API_URL}api/check_user_address`, body, config)

        console.log("petition check user ", res)

        if (res.status === 200 && res.data.success) {
            dispatch(get_locations());
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

export const set_location_current = (array) => async dispatch => {
    if (array.length > 0) {
        let location = array.find((location) => location.is_check);
        dispatch({
            type: GET_LOCATION_CURRENT,
            payload: location
        });
    }
}

export const post_user_addresses = (data) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    };
    const body = {
        'user_id': data.user_id,
        'address': data.address,
        'description': data.description,
        'phone': data.phone,
        'lng': data.lng,
        'lat': data.lat,
    };
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}api/user_addresses`, body, config)

        if (res.status === 200 && res.data.success) {
            dispatch(get_locations());
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




