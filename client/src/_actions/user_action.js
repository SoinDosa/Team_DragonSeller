import axios from 'axios';
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
    CHECK_ID_USER,
    CHECK_EMAIL_USER,
    CREATE_COUPON,
    GET_COUPON,
} from './types';

import { USER_SERVER } from '../Config';
import { responsiveArray } from 'antd/lib/_util/responsiveObserve';
// import { response } from 'express';

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

export function checkIdUser(dataToSubmit) {

    const request = axios.post('/api/users/check_id', dataToSubmit)
        .then(response => response.data)

    return {
        type : CHECK_ID_USER,
        payload: request
    }
}

export function checkEmailUser(dataToSubmit) {

    const request = axios.post('/api/users/check_email', dataToSubmit)
        .then(response => response.data)

    return {
        type : CHECK_EMAIL_USER,
        payload: request
    }
}

export function findIdUser(dataToSubmit) {

    const request = axios.post('/api/users/find_id', dataToSubmit, {
        validateStatus: function (status) {
          // 상태 코드가 500 이상일 경우 거부. 나머지(500보다 작은)는 허용.
          return status < 500;
        }
      })
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

export function addToCart(id, count) {
    let body = {
        productId: id,
        productQuantity : count

    }
    const request = axios.post(`${USER_SERVER}/addToCart`, body)
        .then(response => response.data);

    return {
        type: ADD_TO_CART,
        payload: request
    }
}

export function getCartItems(cartItems, userCart) {

    const request = axios.get(`/api/product/products_by_id?id=${cartItems}&type=array`)
        .then(response => {
            // CartItem들에 해당하는 정보들을  
            // Product Collection에서 가져온후에 
            // Quantity 정보를 넣어 준다.
            userCart.forEach(cartItem => {
                response.data.product.forEach((productDetail, index) => {
                    if (cartItem.id === productDetail._id) {
                        response.data.product[index].quantity = cartItem.quantity
                    }
                })
            })
            return response.data;
        });

    return {
        type: GET_CART_ITEMS,
        payload: request
    }
}


export function removeCartItem(productId) {

    const request = axios.get(`/api/users/removeFromCart?id=${productId}`)
        .then(response => {
            //productInfo ,  cart 정보를 조합해서   CartDetail을 만든다. 
            response.data.cart.forEach(item => {
                response.data.productInfo.forEach((product, index) => {
                    if (item.id === product._id) {
                        response.data.productInfo[index].quantity = item.quantity
                    }

                })
            })
            return response.data;
        });

    return {
        type: REMOVE_CART_ITEM,
        payload: request
    }
}



export function onSuccessBuy(data) {

    const request = axios.post(`/api/users/successBuy`, data)
        .then(response => response.data);

    return {
        type: ON_SUCCESS_BUY,
        payload: request
    }
}

export function createCoupon(dataToSubmit) {

    const request = axios.post('/api/coupon/', dataToSubmit)
        .then(response => response.data);

    return {
         type: CREATE_COUPON,
         payload: request
    } 
}

export function getCoupon(couponTitle) {

    const request = axios.get('/api/coupon/getCoupon')
        .then(response => response.data)
}