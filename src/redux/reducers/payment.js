import {

    GET_DELIVERY_METHOD_SUCCESS, GET_INVOICE_CURRENT,
    GET_PAYMENT_METHOD_SUCCESS,
    GET_USER_INVOICE_SUCCESS,
    UPDATE_DATA_PAYMENT
} from '../actions/types';

const initialState = {
    payment_methods: [],
    delivery_methods: [],
    invoices: [],
    data_payment: {},
    invoice: null,
};

export default function Payment(state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case GET_PAYMENT_METHOD_SUCCESS:
            console.log("GET_PAYMENT_METHOD_SUCCESS ", payload)
            if (payload.payment_methods.length > 0) {
                return {
                    ...state,
                    payment_methods: payload.payment_methods
                };
            }
        case GET_DELIVERY_METHOD_SUCCESS:
            console.log("GET_DELIVERY_METHOD_SUCCESS ", payload)
            if (payload.delivery_methods.length > 0) {
                return {
                    ...state,
                    delivery_methods: payload.delivery_methods
                };
            }
        case GET_USER_INVOICE_SUCCESS:
            console.log("GET_DELIVERY_METHOD_SUCCESS ", payload)
            if (payload.invoices.length > 0) {
                return {
                    ...state,
                    invoices: payload.invoices
                };
            }
        case GET_INVOICE_CURRENT:
            return {
                ...state,
                invoice: payload
            };

        case UPDATE_DATA_PAYMENT:
            return {
                ...state,
                data_payment: payload.data
            };


        default:
            return state
    }
}

function updateStorage(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

