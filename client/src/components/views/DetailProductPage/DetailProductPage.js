import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Descriptions } from 'antd'
import ProductImage from './Sections/ProductImage';
import ProductInfo from './Sections/ProductInfo';
import Header from '../Header/Header';
function DetailProductPage(props) {

    const productId = props.match.params.productId

    const [Product, setProduct] = useState({})

    useEffect(() => {
        axios.get(`/api/product/products_by_id?id=${productId}&type=single`)
            .then(response => {
                console.log('response data : ', response.data);
                setProduct(response.data.product[0])
            })
            .catch(err => alert(err))
    }, [])



    return (
        <div>
            <Header/>
        <div style={{ width: '75%', padding: '1rem 4rem', paddingLeft: '30%'}}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
            </div>

            <ProductImage detail={Product} />
            <br />
            <Descriptions title={Product.title}>
                    <Descriptions.Item labels="Description">상품 설명 : {Product.description}</Descriptions.Item>
                    <br/>
                    <Descriptions.Item labels="Price">가격 : {Product.price}$</Descriptions.Item>
            </Descriptions>
                    
            <ProductInfo detail={Product} />
        </div>
        </div>
    )
}

export default DetailProductPage