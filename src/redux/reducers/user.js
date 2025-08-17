import {
    GET_PURCHASES_SUCCESS,
    GET_PURCHASE_SUCCESS,
    PETITION_GET_PURCHASE,
} from '../actions/types';

const initialState = {
    purchases               : [],
    peticion_purchases      : false,
    items_peticion_purchases: true,
    current_page            : 1,
    last_page               : 1,
    links                   : [],

    purchase                : null,
    peticion_purchase           : false,

};

export default function User(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_PURCHASES_SUCCESS:
            return {
                ...state,
                purchases               : payload.data.data,
                current_page            : payload.data.current_page,
                last_page               : payload.data.last_page,
                links                   : payload.data.links,
                peticion_purchases      : false,
                items_peticion_purchases: payload.data.data.length > 0
            };

        case GET_PURCHASE_SUCCESS:
            console.log(payload);
            
            return {
                ...state,
                purchase            : payload.data,
                peticion_purchase   : false,
            };

        case PETITION_GET_PURCHASE:
            return {
                ...state,
                peticion_purchase: true
            };

        default:
            return state;
    }
}
