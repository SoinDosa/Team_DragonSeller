import React from 'react'

const s3path = 'https://seonhwi.s3.amazonaws.com/';

function UserCardBlock(props) {

    const renderCartImg = (images) => {
        if(images.length > 0){
            let image = images[0]
            return `${s3path}${image}`
        }
    }

    const renderItems = () => (
        props.products && props.products.map((product, index) => (
            <p key={index}>
            <img 
            src={renderCartImg(product.images)} />
            <br/>
            <h3>{product.quantity} 개 </h3>
            <h3>{product.price} 원 </h3>
            <button onClick={ () => props.removeItem(product._id) }>삭제</button>
            </p>
        ))
    )


    return (
        <div>
            <h3>이미지</h3>
            <h3>수량</h3>
            <h3>삭제</h3>
            <p>칸 띄우기용</p>
            {renderItems()}
        </div>
    )
}

export default UserCardBlock
