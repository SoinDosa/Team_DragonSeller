//import { response } from 'express';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getCartItems } from '../../../_actions/user_action'
import UserCardBlock from './Sections/UserCardBlock'

function CartPage(props) {

    const [Total, setTotal] = useState(0)

    const dispatch = useDispatch();
    useEffect(() => {

        let cartItmes=[]
        // 카트에 물건이 있는지
        if(props.user.userData && props.user.userData.cart){
            if(props.user.userData.cart.length > 0){
                props.user.userData.cart.forEach(item => {
                    cartItmes.push(item.id)
                })
            }

            dispatch(getCartItems(cartItmes, props.user.userData.cart))
            .then(response => { calculateTotal(response.payload) })
        }
    }, [props.user.userData])


    let calculateTotal = (cartDetail) => {
        let total = 0;

        cartDetail.product.map(item => {
            total += parseInt(item.price, 10) * item.quantity
        })

        setTotal(total)
    }


    return (
        <div>
            CartPage
            <UserCardBlock products={ props.user.cartDetail && props.user.cartDetail.product } />
            <h3>총 가격 : ${Total}</h3>
        </div>
    )
}

export default CartPage
