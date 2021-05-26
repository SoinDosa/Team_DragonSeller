import React, { useState } from 'react'
import { Typography, Button, Form, Input} from 'antd';
import axios from 'axios';

const stars = [
    {key:1, value: "1점"},
    {key:2, value: "2점"},
    {key:3, value: "3점"},
    {key:4, value: "4점"},
    {key:5, value: "5점"},
]

const chuchans = [
    {key:1, value: "존재해서는 안될 상품"},
    {key:2, value: "비추천"},
    {key:3, value: "보통"},
    {key:4, value: "추천"},
    {key:5, value: "적극추천"},
]

const deliverys = [
    {key:1, value: "속도=0"},
    {key:2, value: "느림"},
    {key:3, value: "보통"},
    {key:4, value: "빠름"},
    {key:5, value: "미사일"},
]

function ProductComment(props) {

    const { TextArea } = Input;

    const [star, setstar] = useState(5)
    const [chuchan, setchuchan] = useState(5)
    const [delivery, setdelivery] = useState(5)
    const starChangeHandler = (event) => {
        setstar(event.currentTarget.value)
    }
    const chuchanChangeHandler = (event) => {
        setchuchan(event.currentTarget.value)
    }
    const deliveryChangeHandler = (event) => {
        setdelivery(event.currentTarget.value)
    }

    const [Comment, setComment] = useState("")
    const commentChangeHandler = (event) => {
        setComment(event.currentTarget.value)
    }

    const commentSubmitHandler = () => {
        
        const body = {
            star: star,
            chuchan: chuchan,
            delivery: delivery,
            date: Date.now(),
        }


        axios.post("/api/product/addComment", body)
            .then(response => {
                if(response.data.success){
                    alert("상품평이 등록되었습니다")
                    props.history.push('/')
                } else {
                    alert("상품평 업로드중 오류 발생")
                }
            })
    }

    return (
        <div>
            <Form onSubmit={commentSubmitHandler}>
                <select onChange={starChangeHandler} value={star}>
                    {stars.map(item => (
                        <option key={item.key} value={item.key}>{item.value}</option> 
                    ))}
                </select>
                <select onChange={chuchanChangeHandler} value={chuchan}>
                    {chuchans.map(item => (
                        <option key={item.key} value={item.key}>{item.value}</option> 
                    ))}
                </select>
                <select onChange={deliveryChangeHandler} value={delivery}>
                    {deliverys.map(item => (
                        <option key={item.key} value={item.key}>{item.value}</option> 
                    ))}
                </select>



                <TextArea onChange={commentChangeHandler} value={Comment}/>
                <Button type="primary" danger size="small"  htmlType="submit" onClick={commentSubmitHandler}>
                    상품평 남기기
                </Button>
            </Form>
        </div>
    )
}

export default ProductComment
