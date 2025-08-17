import {
    ADD_TO_CART, CLEAN_PURCHASE, DEC_TO_CART, INC_TO_CART, POST_SALE_SUCCESS, REMOVE_TO_CART, SET_STORE, UPDATE_TO_CART,
} from '../actions/types';

const initialState = {
    carrito: JSON.parse(localStorage.getItem('carrito')) ?? [],
    quantity: 0,
    saled: false,
    store_id: localStorage.getItem('store_id') ?? null,
};

export default function Cart(state = initialState, action) {
    let findPro;
    let index;
    const {type, payload} = action;

    switch (type) {
        case ADD_TO_CART:
            let {producto, quantity} = payload;
            const check = state.carrito.find(prd => prd.id === producto.id);
            if (check) {
            } else {
                producto.quantity = quantity;
                updateStorage([...state.carrito, producto]);
                let quant = get_quantity([...state.carrito, producto]);
                return {
                    ...state,
                    carrito: [...state.carrito, producto],
                    quantity: quant
                };
            }
        case INC_TO_CART:
            findPro = state.carrito.find((pd) => pd.id === payload.producto.id);
            index = state.carrito.findIndex((pd) => pd.id === payload.producto.id);
            findPro.quantity += 1;
            state.carrito[index] = findPro;
            updateStorage(state.carrito)
            let quant = get_quantity(state.carrito);
            return {
                ...state,
                quantity: quant
            };
        case DEC_TO_CART:
            findPro = state.carrito.find((pd) => pd.id === payload.producto.id);
            index = state.carrito.findIndex((pd) => pd.id === payload.producto.id);
            if (findPro.quantity > 1) {
                findPro.quantity -= 1;
                state.carrito[index] = findPro;
                updateStorage(state.carrito)
                let quant = get_quantity(state.carrito);
                return {
                    ...state,
                    quantity: quant
                };
            } else {
                return state
            }
        case REMOVE_TO_CART:
            findPro = state.carrito.find((pd) => pd.id === payload.producto.id);
            const filtered = state.carrito.filter((pd) => pd.id !== payload.producto.id);
            updateStorage(filtered)
            if (filtered.length === 0) {
                updateStoreStorage(null);
                let quant = get_quantity(filtered);
                return {
                    ...state,
                    carrito: filtered,
                    store_id: null,
                    quantity: quant
                };
            } else {
                let quant = get_quantity(filtered);
                return {
                    ...state,
                    carrito: filtered,
                    quantity: quant
                };
            }

        case UPDATE_TO_CART:
            let {carrito} = payload;
            updateStorage(carrito)
            if (carrito.length === 0) {
                updateStoreStorage(null);
                return {
                    ...state,
                    carrito: carrito,
                    store_id: null,
                    quantity: 0
                };
            } else {
                let quant = get_quantity(carrito);
                return {
                    ...state,
                    carrito: carrito,
                    quantity: quant
                };
            }


        case POST_SALE_SUCCESS:
            console.log("llego aqui a sale")
            return {
                ...state,
                saled: true
            };
        case CLEAN_PURCHASE:
            updateStorage([]);
            clean_all();
            updateStoreStorage(null);
            return {
                ...state,
                carrito: [],
                store_id: null,
                quantity: 0
            };
        case SET_STORE:
            if (state.carrito.length === 0) {
                updateStoreStorage(payload.producto.store_id);
                return {
                    ...state,
                    store_id: payload.producto.store_id
                };
            } else {
                return {
                    ...state
                };
            }


        default:
            return state
    }
}

function updateStorage(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function get_quantity(carrito) {
    return carrito.reduce((acc, producto) => {
        let quant = producto.quantity;
        return acc + quant;
    }, 0);
}


function updateStoreStorage(store_id) {
    if (store_id === null) {
        localStorage.setItem("store_id", null);
    } else {
        localStorage.setItem("store_id", store_id);
    }

}


function clean_all() {
    localStorage.removeItem("data_entrega");
    localStorage.removeItem("delivery_method_id");
    localStorage.removeItem("invoice_id");
    localStorage.removeItem("payment_method_id");
}