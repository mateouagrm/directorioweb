import {
    GET_CATEGORY_SUCCESS,
    GET_BANNER_SUCCESS,
    GET_BANNER_FAIL,
    GET_HOME_SUCCESS,
    GET_HOME_FAIL,
    GET_PRODUCT_NEW_SUCCESS,
    GET_PRODUCT_OFFER_SUCCESS,
    UPDATE_FAVORITE_STATUS,

    GET_PRODUCT_BEST_SELLINGS_SUCCESS,
} from '../actions/types';

const initialState = {
    homes: null,
    categories: [],
    banners: [],
    product_news: [],
    product_offers: [],
    product_best_sellings: [],
    secciones: [],
};

export default function Home(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_CATEGORY_SUCCESS:
            return {
                ...state,
                categories: payload.categories,
            }

        case GET_BANNER_SUCCESS:
            if (payload.banners.length > 0) {
                return {
                    ...state,
                    banners: payload.banners,
                };
            } else {
                return {
                    ...state,
                }
            }

        case GET_PRODUCT_OFFER_SUCCESS:
            if (payload.products.data.length > 0) {
                return {
                    ...state,
                    product_offers: payload.products.data,
                };
            } else {
                return {
                    ...state,
                }
            }

        case GET_PRODUCT_NEW_SUCCESS:
            if (payload.products.data.length > 0) {
                return {
                    ...state,
                    product_news: payload.products.data,
                };
            } else {
                return {
                    ...state,
                }
            }

        case GET_PRODUCT_BEST_SELLINGS_SUCCESS:
            if (payload.products.data.length > 0) {
                return {
                    ...state,
                    product_best_sellings: payload.products.data,
                };
            } else {
                return {
                    ...state,
                }
            }

        case GET_HOME_SUCCESS:
            return {
                ...state,
                homes: payload.data,
            }

        case GET_HOME_FAIL:
            return {
                ...state
            }

        case UPDATE_FAVORITE_STATUS:
            const { productId, isFavorite } = action.payload;

            return {
                ...state,
                product_offers: state.product_offers.map(product =>
                    product.id === productId
                        ? { ...product, is_favorite: isFavorite ? 1 : 0 }
                        : product
                ),
                product_news: state.product_news.map(product =>
                    product.id === productId
                        ? { ...product, is_favorite: isFavorite ? 1 : 0 }
                        : product
                ),

            };

        default:
            return state
    }
}


