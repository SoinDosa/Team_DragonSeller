import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getCartItems, removeCartItem } from '../../../_actions/user_action'
import UserCardBlock from './Sections/UserCardBlock'
const s3path = 'https://seonhwi.s3.amazonaws.com/';

function CartPage(props) {

    const [Total, setTotal] = useState(0)
    const [ShowTotal, setShowTotal] = useState(false)

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
        setShowTotal(true)
    }

    let removeFromCart = (productId) => {

        dispatch(removeCartItem(productId))
        .then(response => {
            if (response.payload.productInfo.length <= 0) {
                setShowTotal(false)
            }
        })

    }

    

    return (
        <div>
            CartPage
            <UserCardBlock products={ props.user.cartDetail && props.user.cartDetail.product } 
            removeItem = {removeFromCart}/>
            {ShowTotal ?
            <h3>총 가격 : {Total}원</h3>
            :
            <h3>총 가격 : 0원</h3>
        }
            
        </div>
    )
}

export default CartPage
