import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getCartItems } from '../../../_actions/user_action'
import UserCardBlock from './Sections/UserCardBlock'

function CartPage(props) {

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
        }
    }, [props.user.userData])

    return (
        <div>
            CartPage
            <UserCardBlock products={ props.user.cartDetail && props.user.cartDetail.product } />
        </div>
    )
}

export default CartPage
