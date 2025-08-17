import {
    GET_PRODUCT_SUCCESS,
    GET_PRODUCTS_SUCCESS,
    GET_SEARCH_PRODUCTS_SUCCESS,
    PETITION_PROD,
    CLEAR_DATA,
    GET_PRODUCTS_RELATIONS_SUCCESS,
    SET_SEARCH_SUCCESS,
    CLEAR_SEARCH_SUCCESS,
    PETITION_PROD_SEARCH, CLEAR_PRODUCT,
} from '../actions/types';

const initialState = {
    item_product: null,
    products: [],
    search_products: [],
    products_relations: [],
    peticion: false,
    peticion_search: false,
    current_page: 0,
    search: localStorage.getItem('filter_global'),
    end_message: false,
    end_message_search: false,
    productos_peticion: true,
    productos_peticion_search: true,
};

export default function Product(state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case GET_PRODUCT_SUCCESS:
            return {
                ...state,
                item_product: payload.product
            };
        case GET_PRODUCTS_SUCCESS:
            const newProducts = payload.data;
            if (newProducts.length > 0) {
                const allProducts = payload.page === 1
                    ? newProducts
                    : [...state.products, ...newProducts];

                // Eliminar duplicados por ID
                const filtered = allProducts.filter(
                    (item, index, self) =>
                        index === self.findIndex(p => p.id === item.id)
                );
                return {
                    ...state,
                    products: filtered,
                    peticion: false,
                    productos_peticion: true,
                };
            } else {
                return {
                    ...state,
                    products: payload.page === 1 ? [] : state.new_products,
                    peticion: false,
                    productos_peticion: false,
                };
            }
        case GET_SEARCH_PRODUCTS_SUCCESS:
            const searchProducts = payload.data;
            if (searchProducts.length > 0) {

                const allProducts = payload.page === 1
                    ? searchProducts
                    : [...state.search_products, ...searchProducts];

                // Eliminar duplicados por ID
                const filtered = allProducts.filter(
                    (item, index, self) =>
                        index === self.findIndex(p => p.id === item.id)
                );
                return {
                    ...state,
                    search_products: filtered,
                    peticion_search: false,
                    productos_peticion_search: true,
                    end_message_search: false,
                };
            } else {
                return {
                    ...state,
                    search_products: payload.page === 1 ? [] : state.search_products,
                    peticion_search: false,
                    productos_peticion_search: false,
                    end_message_search: true,
                };
            }

        case GET_PRODUCTS_RELATIONS_SUCCESS:
            return {
                ...state,
                products_relations: payload.data,
            };
        case PETITION_PROD:
            return {
                ...state,
                peticion: true
            };
        case PETITION_PROD_SEARCH:
            return {
                ...state,
                peticion_search: true
            };

        case CLEAR_DATA:
            return {
                ...state,
                products: [],
                productos_peticion: true,
                end_message: false
            }
        case CLEAR_PRODUCT:
            return {
                ...state,
                item_product: null,
            }

        case SET_SEARCH_SUCCESS:
            return {
                ...state,
                search: payload,
                search_products: [],
            }
        case CLEAR_SEARCH_SUCCESS:
            return {
                ...state,
                search: null,
                search_products: [],
            }

        default:
            return state
    }
}


