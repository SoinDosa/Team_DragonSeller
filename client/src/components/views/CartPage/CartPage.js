import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getCartItems, removeCartItem, onSuccessBuy } from '../../../_actions/user_action';
import { Table} from 'semantic-ui-react'
import UserCardBlock from './Sections/UserCardBlock'
import Paypal from '../../util/Paypal';
import Header from '../Header/Header';
const s3path = 'https://seonhwi.s3.amazonaws.com/';

function CartPage(props) {

    const [Total, setTotal] = useState(0)
    const [ShowTotal, setShowTotal] = useState(false)
    const [ShowSuccess, setShowSuccess] = useState(false)

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
    
    const transactionSuccess = (data) => {
        dispatch(onSuccessBuy({
            paymentData: data,
            cartDetail: props.user.cartDetail
        }))
            .then(response => {
                if (response.payload.success) {
                    setShowTotal(false)
                    setShowSuccess(true)
                }
            })
    }

    

    return (
        <div>
            <div>
                <Header/>
            </div>
            <br/>
            <div align="center">
                <h1>CartPage</h1>
            </div>
            <br/>
            
            <UserCardBlock products={ props.user.cartDetail && props.user.cartDetail.product } 
            removeItem = {removeFromCart}/>
            <br/>
            <Table border="1" style={{width:"70vw", margin:"0 auto" ,marginBottom: "5px"}} celled padded>
                <Table.Row>
                    <Table.Cell textAlign="center" bgColor="#62d2a2" fgColor="#eeeeee">
                        <h3>총 가격</h3> 
                    </Table.Cell>
                    <Table.Cell textAlign="right">
                        {ShowTotal ?
                            <h1 style={{color:"red"}}>{Total}$</h1>
                            :
                            <h1 style={{color:"red"}}>0$</h1>
                        }
                    </Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell textAlign="center">
                        <h3>결제하기</h3>
                    </Table.Cell>
                    <Table.Cell style={{width: "200px"}}>
                        {ShowTotal && <Paypal total={Total} onSuccess={transactionSuccess}/>}
                    </Table.Cell>
                </Table.Row>
            </Table>
           
        </div>
            
            
    )
}

export default CartPage
