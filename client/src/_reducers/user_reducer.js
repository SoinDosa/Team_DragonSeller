import {
    LOGIN_USER,
    LOGOUT_USER,
    REGISTER_USER,
    AUTH_USER,
    AUTH_ADMIN,
    ADD_TO_CART,
    GET_CART_ITEMS,
    REMOVE_CART_ITEM,
    ON_SUCCESS_BUY,
    FIND_ID_USER,
    FIND_PW_USER,
    CHANGE_PW_USER,
} from '../_actions/types';

export default function (state = {}, action) {
    switch (action.type) {
        case LOGIN_USER:
            return { ...state, loginSuccess: action.payload }
            break;
        case LOGOUT_USER:
            return { ...state, logoutSuccess: action.payload }
            break;
        case REGISTER_USER:
            return { ...state, register: action.payload }
            break;
        case FIND_ID_USER:
            return { ...state, findIdSuccess: action.payload }
            break;
        case FIND_PW_USER:
            return { ...state, findPwSuccess: action.payload }
            break;
        case CHANGE_PW_USER:
            return { ...state, findPwSuccess: action.payload }
            break;
        case AUTH_USER:
            return { ...state, userData: action.payload }
            break;
        case AUTH_ADMIN:
            return { ...state, userData: action.payload}
            break;
        case ADD_TO_CART:
            return {
                ...state,
                userData: {
                    ...state.userData,
                    cart: action.payload
                }
            }
        case GET_CART_ITEMS:
            return { ...state, cartDetail: action.payload }
        case REMOVE_CART_ITEM:
            return {
                ...state, cartDetail: action.payload.productInfo,
                userData: {
                    ...state.userData,
                    cart: action.payload.cart
                }
            }
        case ON_SUCCESS_BUY:
            return {
                ...state, cartDetail: action.payload.cartDetail,
                userData: {
                    ...state.userData, cart: action.payload.cart
                }
            }
        default:
            return state;
    }
}