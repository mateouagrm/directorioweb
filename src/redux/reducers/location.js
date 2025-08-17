import {
    GET_LOCATION_SUCCESS, GET_LOCATION_FAIL, GET_LOCATION_CURRENT
} from '../actions/types';

const initialState = {
    locations: [],
    location: null,
};

export default function Location(state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case GET_LOCATION_SUCCESS:
            return {
                ...state,
                locations: payload.addresses
            };
        case GET_LOCATION_CURRENT:
            return {
                ...state,
                location: payload
            };

        case GET_LOCATION_FAIL:
            return {
                ...state
            };
        default:
            return state
    }
}


