import {
    GET_NEW_PRODUCTS_SUCCESS,
    GET_OFFER_PRODUCTS_SUCCESS,
    PETITION_PROD_OFFER,
    PETITION_PROD_NEW,
    GET_FAVORITE_PRODUCTS,
    UPDATE_FAVORITE_STATUS,
    PETITION_PROD_FAVORITE,

    GET_BEST_SELLING_PRODUCTS_SUCCESS,
    PETITION_PROD_BEST_SELLING,
} from '../actions/types';

const initialState = {
    offer_products: [],
    peticion_offer: false,
    productos_peticion_offer: true,

    new_products: [],
    peticion_new: false,
    productos_peticion_new: true,

    favorite_products: [],
    peticion_favorites: false,
    productos_peticion_favorites: true,

    bs_products: [],
    peticion_bs: false,
    productos_peticion_bs: true,

};

export default function Catalog(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {

        case GET_OFFER_PRODUCTS_SUCCESS:
            const offerProducts = payload.data;

            if (offerProducts.length > 0) {
                const allProducts = payload.page === 1
                    ? offerProducts
                    : [...state.offer_products, ...offerProducts];

                // Eliminar duplicados por ID
                const filtered = allProducts.filter(
                    (item, index, self) =>
                        index === self.findIndex(p => p.id === item.id)
                );

                return {
                    ...state,
                    offer_products: filtered,
                    peticion_offer: false,
                    productos_peticion_offer: true
                };
            } else {
                return {
                    ...state,
                    offer_products: payload.page === 1 ? [] : state.offer_products,
                    peticion_offer: false,
                    productos_peticion_offer: false
                };
            }

        case GET_NEW_PRODUCTS_SUCCESS:
            const newProducts = payload.data;

            if (newProducts.length > 0) {
                const allProducts = payload.page === 1
                    ? newProducts
                    : [...state.new_products, ...newProducts];

                // Eliminar duplicados por ID
                const filtered = allProducts.filter(
                    (item, index, self) =>
                        index === self.findIndex(p => p.id === item.id)
                );
                return {
                    ...state,
                    new_products: filtered,
                    peticion_new: false,
                    productos_peticion_new: true
                };
            } else {
                return {
                    ...state,
                    new_products: payload.page === 1 ? [] : state.new_products,
                    peticion_new: false,
                    productos_peticion_new: false
                };
            }

        case GET_FAVORITE_PRODUCTS:
            if (payload.data.length > 0) {
                return {
                    ...state,
                    favorite_products: payload.page === 1 ? payload.data : [...state.favorite_products, ...payload.data],
                    peticion_favorites: false,
                    productos_peticion_favorites: true,
                };
            } else {
                return {
                    ...state,
                    favorite_products: payload.page === 1 ? [] : state.favorite_products,
                    peticion_favorites: false,
                    productos_peticion_favorites: false,
                };
            }

        case GET_BEST_SELLING_PRODUCTS_SUCCESS:
            const bsProducts = payload.data;

            if (bsProducts.length > 0) {
                const allProducts = payload.page === 1
                    ? bsProducts
                    : [...state.bs_products, ...bsProducts];

                // Eliminar duplicados por ID
                const filtered = allProducts.filter(
                    (item, index, self) =>
                        index === self.findIndex(p => p.id === item.id)
                );
                return {
                    ...state,
                    bs_products: filtered,
                    peticion_bs: false,
                    productos_peticion_bs: true
                };
            } else {
                return {
                    ...state,
                    bs_products: payload.page === 1 ? [] : state.bs_products,
                    peticion_bs: false,
                    productos_peticion_bs: false
                };
            }
        case UPDATE_FAVORITE_STATUS:
            const { productId, isFavorite } = action.payload;

            return {
                ...state,
                offer_products: state.offer_products.map(product =>
                    product.id === productId
                        ? { ...product, is_favorite: isFavorite ? 1 : 0 }
                        : product
                ),
                new_products: state.new_products.map(product =>
                    product.id === productId
                        ? { ...product, is_favorite: isFavorite ? 1 : 0 }
                        : product
                ),
            };

        case PETITION_PROD_OFFER:
            return {
                ...state,
                peticion_offer: true
            };

        case PETITION_PROD_NEW:
            return {
                ...state,
                peticion_new: true
            };

        case PETITION_PROD_FAVORITE:
            return {
                ...state,
                peticion_favorites: true
            };

        case PETITION_PROD_BEST_SELLING:
            return {
                ...state,
                peticion_bs: true
            };

        default:
            return state
    }
}


