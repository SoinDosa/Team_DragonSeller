import React, { useEffect, useState, useRef } from 'react'
import { withRouter } from 'react-router-dom';
import Header from '../Header/Header';
import { Form, Input, Button, Segment, Grid, Divider } from 'semantic-ui-react'
import CouponList from './CouponList';
import CreateCoupon from './CreateCoupon';

function Coupon(props) {
    
    const [inputs, setInputs] = useState({
        couponname: '',
        price: ''
    });
    const { couponname, price } = inputs; 
    
    const onChange = e => {
        const { name, value } = e.target;
        setInputs({
          ...inputs,
          [name]: value
        });
      };
    const [coupons, setCoupons] = useState([
        {
            id: 1,
            couponname: '200$ 이상 구매시 10$달러 할인 쿠폰',
            price: 20
        },
        {
            id: 2,
            couponname: '20%할인 쿠폰',
            price: 20
        }
    ]);

    const nextId = useRef(3);
    const onCreate = () => {
        const coupon = {
            id: nextId.current,
            couponname,
            price
        };

        setCoupons([...coupons, coupon]);


        setInputs({
            couponname: '',
            price: ''
          });
        nextId.current += 1;
    };

    const onRemove = id => {
        // user.id 가 파라미터로 일치하지 않는 원소만 추출해서 새로운 배열을 만듬
        // = user.id 가 id 인 것을 제거함
        setCoupons(coupons.filter(coupon => coupon.id !== id));
    };
    
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
                        <CreateCoupon 
                            couponname={couponname}
                            price={price}
                            onChange={onChange}
                            onCreate={onCreate}
                        />
                    </Grid.Column>

                    {/* 쿠폰 리스트*/}
                    <Grid.Column verticalAlign='middle'>
                        <h2 style={{color: " blue"}}>등록된 쿠폰 리스트</h2>
                        <br/>
                        <CouponList coupons={coupons} onRemove={onRemove}/>
                        {/* <Button content='등록된 쿠폰 목록'size='big' /> */}
                    </Grid.Column>
                </Grid>
                {/* <Divider vertical>|
                </Divider> */}
            </Segment>
        </div>
    )
}

export default Coupon;