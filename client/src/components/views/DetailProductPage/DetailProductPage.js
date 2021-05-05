import React, { useEffect } from 'react'
import axios from 'axios'

function DetailProductPage(props) {


    const productId = props.match.params.productId
    useEffect(() => {
        

        axios.get(`/api/product/products_by_id?id=${productId}&type=single`)
            .then(response => {
                if(response.data.success) {
                    console.log('response.data',response.data)
                } else {
                    alert('상세 페이지 로드 실패')
                }
            })
    }, [])

    return (
        <div>
            DetailProductPage
        </div>
    )
}

export default DetailProductPage
