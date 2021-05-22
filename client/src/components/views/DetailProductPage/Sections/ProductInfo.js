import React, {useState} from 'react'
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../../_actions/user_action';
import { Typography, Button, Form, Input} from 'antd';
function ProductInfo(props) {
    const dispatch = useDispatch();

    const [Count, setCount] = useState(0)

    const clickHandler = () => {
        //필요한 정보를 Cart 필드에다가 넣어 준다.
        dispatch(addToCart(props.detail._id, parseInt(Count)))
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
            <Form>
                <Input type="number" onChange={countChangeHandler} value={Count}/>
                <Button size="large" shape="round" htmlType="submit" onClick={clickHandler}>
                    카트 담기
                </Button>
            </Form>
                
            </div>


        </div>
    )
}

export default ProductInfo