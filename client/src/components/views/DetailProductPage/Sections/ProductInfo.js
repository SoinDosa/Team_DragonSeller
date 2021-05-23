import React, {useState} from 'react'
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../../_actions/user_action';
import { Typography, Button, Form, Input} from 'antd';
function ProductInfo(props) {
    const dispatch = useDispatch();

    const [Count, setCount] = useState(0)

    const clickHandler = () => {
        //필요한 정보를 Cart 필드에다가 넣어 준다.
        if(Count <= 0)
            alert("손님 갯수를 정해주셔야 합니다")
        else {
            dispatch(addToCart(props.detail._id, parseInt(Count)))
            alert("상품을 " + Count + "개 담았습니다!")
        }
    }

    const purchaseHandler = () => {
        //필요한 정보를 Cart 필드에다가 넣어 준다.
        if(Count <= 0)
            alert("손님 갯수를 정해주셔야 합니다")
        else {
            alert("상품을 " + Count + "개 구매합니다!")
        }
    }

    const countChangeHandler = (event) => {
        setCount(event.currentTarget.value)
    }

    return (
        <div>

            <br />
            <br />
            <br />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Form style={{ display: 'flex', flexDirection: 'column' }}>
                <Input type="number" onChange={countChangeHandler} value={Count}/>
                <br/>
                <Button type="primary" danger size="large"  htmlType="submit" onClick={clickHandler}>
                    카트 담기
                </Button>
                <br/>
                <Button type="primary" danger size="large"  htmlType="submit" onClick={purchaseHandler}>
                    바로 구매
                </Button>
            </Form>
                
            </div>


        </div>
    )
}

export default ProductInfo