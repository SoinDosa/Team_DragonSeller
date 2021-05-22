import React, {useState} from 'react'
import { Button, Form, Input } from 'antd';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../../_actions/user_action';
const s3path = 'https://seonhwi.s3.amazonaws.com/';

function UserCardBlock(props) {
    const [data,setData] = useState(0);

    const renderCartImg = (images) => {
        if(images.length > 0){
            let image = images[0]
            return `${s3path}${image}`
        }
    }

    const inHan = (e) =>{
        console.log(e)
        dispatch(addToCart(e._id, parseInt(1)))
    }

    const deHan = (e) =>{
        console.log(e)
        if(e.quantity > 1)
            dispatch(addToCart(e._id, parseInt(-1)))
    }
    const dispatch = useDispatch();

    const renderItems = () => (
        props.products && props.products.map((product, index) => (
            <p key={index}>
                <img 
                src={renderCartImg(product.images)} width="200px"/>
                <br/>
                <h3>{product.quantity} 개 </h3>
                <button onClick={() => inHan(product)}>더 살래요</button>
                <button onClick={() => deHan(product)}>더 안 살래요</button>
                <h3>{product.price} 원 </h3>
                <button onClick={ () => props.removeItem(product._id) }>삭제</button>
            </p>
        ))
    )


    return (
        <div>
            {renderItems()}
        </div>
    )
}

export default UserCardBlock
