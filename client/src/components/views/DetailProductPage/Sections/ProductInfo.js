import React from 'react'
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../../_actions/user_action';
function ProductInfo(props) {
    const dispatch = useDispatch();


    const clickHandler = () => {
        //필요한 정보를 Cart 필드에다가 넣어 준다.
        dispatch(addToCart(props.detail._id))
    }

    return (
        <div>

            <br />
            <br />
            <br />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button size="large" shape="round" type="danger" onClick={clickHandler}>
                    Add to Cart
                </button>
            </div>


        </div>
    )
}

export default ProductInfo