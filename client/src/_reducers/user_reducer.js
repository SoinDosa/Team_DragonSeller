import {
    LOGIN_USER,
    LOGOUT_USER,
    REGISTER_USER,
    AUTH_USER,
    FIND_ID_USER,
    FIND_PW_USER,
    CHANGE_PW_USER,
    AUTH_ADMIN
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
        default:
            return state;
    }
}