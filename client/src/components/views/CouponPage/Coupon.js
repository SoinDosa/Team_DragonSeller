import React, { useEffect, useState, useRef } from 'react'
import { withRouter } from 'react-router-dom';
import Header from '../Header/Header';
import axios from 'axios';
import { Form, Input, Button, Segment, Grid, Divider } from 'semantic-ui-react'
import CouponList from './CouponList';
import CreateCoupon from './CreateCoupon';
import { useDispatch } from 'react-redux';
import { createCoupon } from '../../../_actions/user_action';

function Coupon(props) {
    
    const dispatch = useDispatch();

    const [Title, setTitle] = useState("");
    const [Price, setPrice] = useState("");
    const [CouponsType, setCouponsType] = useState("");

    const onTitleHandler = (event) => {
        setTitle(event.currentTarget.value)
    }

    const onPriceHandler = (event) => {
        setPrice(event.currentTarget.value)
    }

    const onCouponsTypeHandler = (event) => {
        setCouponsType(event.currentTarget.value)
    }

    const onCreateCouponButtonHandler = (event) => {
        event.preventDefault();
        
        let body = {
            title : Title,
            price : Price,
            couponsType : CouponsType
        };

        dispatch(createCoupon(body))
            .then(response => {
                if (response.payload.success) {
                    console.log(response)
                    console.log(response.payload)
                    window.location.reload()
                   alert('쿠폰 생성 성공!')
                } else{
                    console.log(response)
                    console.log(response.payload)
                    alert("쿠폰 생성 실패ㅠ")
                }
            }
        )
    };
    
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
                {coupon.title} &nbsp; 
            </li>
        ))
    )
    


    return (

        <div id= 'wrap'>
            <div>
                <Header/>
            </div>
            <br/>
            <h1 style={{color:"red", textAlign: "center"}}>쿠폰 등록 및 삭제</h1>
            <Segment placeholder style={{height: "500px"}}>
                <Grid columns={2} relaxed='very' stackable>
                    <Grid.Column>
                        <Form onSubmit={onCreateCouponButtonHandler}> 
                            <Form.Field
                                name="title"
                                placeholder='쿠폰 이름'
                                control={Input}
                                onChange={onTitleHandler}
                                id={Title} />
                            <Form.Field
                            // icon='lock'
                            // iconPosition='left'
                                name="price"
                                placeholder="가격"
                                control={Input}
                                onChange={onPriceHandler}
                                id={Price}
                                type='text' />
                            <Form.Field
                                name='type'
                                placeholder='할인타입(1 or 2)'
                                control={Input}
                                onChange={onCouponsTypeHandler}
                                id={CouponsType}
                                type='text' />
                            <Button name='등록' type="submit"  primary size='big'>add</Button>
                        </Form>
                    </Grid.Column>

                    {/* 쿠폰 리스트*/}
                    <Grid.Column verticalAlign='middle'>
                        <h2 style={{color: " blue"}}>등록된 쿠폰 리스트</h2>
                        <br/>
                        {renderCoupon()}
                    </Grid.Column>
                </Grid>
                {/* <Divider vertical>|
                </Divider> */}
            </Segment>
        </div>
    )
}

export default Coupon;