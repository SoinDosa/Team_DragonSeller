import axios from 'axios';
import {
    LOGIN_USER,
    LOGOUT_USER,
    REGISTER_USER,
    AUTH_USER,
    FIND_ID_USER,
    FIND_PW_USER,
    CHANGE_PW_USER,
    AUTH_ADMIN
} from './types';
export function loginUser(dataToSubmit) {

    const request = axios.post('/api/users/login', dataToSubmit)
        .then(response => response.data)

    return {
        type: LOGIN_USER,
        payload: request
    }
}

export function logoutUser(dataToSubmit) {

    const request = axios.post('/api/users/logout', dataToSubmit)
        .then(response => response.data)

    return {
        type: LOGOUT_USER,
        payload: request
    }
}

export function registerUser(dataToSubmit) {

    const request = axios.post('/api/users/register', dataToSubmit)
        .then(response => response.data)

    return {
        type: REGISTER_USER,
        payload: request
    }
}

export function findIdUser(dataToSubmit) {

    const request = axios.post('/api/users/find_id', dataToSubmit)
        .then(response => response.data)

    return {
        type: FIND_ID_USER,
        payload: request
    }

}

export function findPwUser(dataToSubmit) {

    const request = axios.post('/api/users/forget_pass', dataToSubmit)
        .then(response => response.data)

    return {
        type: FIND_PW_USER,
        payload: request
    }

}

export function changePwUser(dataToSubmit) {

    const request = axios.post('/api/users/change_pass', dataToSubmit)
        .then(response => response.data)

    return {
        type: CHANGE_PW_USER,
        payload: request
    }

}

export function auth(dataTosubmit) {

    const request = axios.get('/api/users/auth')
        .then(response => response.data)

    return {
        type: AUTH_USER,
        payload: request

    }
}

export function adminAuth(dagtTosubmit){
    const request = axios.get('/api/users/admin_auth')
        .then(response => response.data)

    return {
        type: AUTH_ADMIN,
        payload: request

    }
}