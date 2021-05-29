import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getCartItems, removeCartItem, onSuccessBuy } from '../../../_actions/user_action';
import { Table, Button} from 'semantic-ui-react'
import UserCardBlock from './Sections/UserCardBlock'
import Paypal from '../../util/Paypal';
import axios from 'axios';
import Header from '../Header/Header';
import Coupons from '../CouponPage/Coupon';
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
            total += item.deliverPrice
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
            cartDetail: props.user.cartDetail,
            totalPrice: Total
        }))
            .then(response => {
                if (response.payload.success) {
                    setShowTotal(false)
                    setShowSuccess(true)
                    
                    props.history.push('../history')
                }
            })
    }

    useEffect(() => {
        axios.get(`/api/coupon/getCoupon`)
            .then(response => {
                console.log('response data : ', response.data)
                setCoupon(response.data.coupons)
            })
            .catch(err => alert(err))
    }, [])

    const [Coupon, setCoupon] = useState([])
    
    const renderCoupon = () => (
        Coupon &&  Coupon.map((coupon, index) => (
            <li key={index}>
                {coupon.title} &nbsp;<button onClick={() => couponHandler(coupon)}>use</button>
                <br/>
            </li>
        ))
    )
    
    const couponHandler = (e) => {
        if(Total>200){
        if(e.couponsType == 1){
            alert(e.price)
            setTotal(Total - e.price)
        }
        else{
            let result = parseInt(Total * ((100-(e.price))/100))
            alert(result)                
            setTotal(result)
        }
        } else {
            alert('쿠폰 사용하기에 너무 가격이 낮습니다.')
        }
    }
    // const selectCouponHandler = (event) => {
    //     if()
        
    
    // }

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
            <div>
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
                <Table.Row style={{textAlign:"center"}}>
                    <Table.Cell >
                        200달러 사용시 가능한 무한 쿠폰 목록
                        {renderCoupon()}
                    </Table.Cell>
                    <Table.Cell></Table.Cell>
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
        </div>
            
            
    )
}

export default CartPage