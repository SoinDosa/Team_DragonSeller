import React, { useState } from 'react'
import { Typography, Button, Form, Input} from 'antd';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

const stars = [
    {key:1, value: "1점"},
    {key:2, value: "2점"},
    {key:3, value: "3점"},
    {key:4, value: "4점"},
    {key:5, value: "5점"},
]

const chuchans = [
    {key:1, value: "1점"},
    {key:2, value: "2점"},
    {key:3, value: "3점"},
    {key:4, value: "4점"},
    {key:5, value: "5점"},
]

const deliverys = [
    {key:1, value: "1점"},
    {key:2, value: "2점"},
    {key:3, value: "3점"},
    {key:4, value: "4점"},
    {key:5, value: "5점"},
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
            productId: props.detail._id,
            star: star,
            chuchan: chuchan,
            delivery: delivery,
            comment: Comment,
        }


        axios.post("/api/product/addComment", body)
            .then(response => {
                if(response.data.success){
                    alert("상품평이 등록되었습니다")
                    console.log(body)
                    window.location.reload()
                } else {
                    alert("상품평 업로드중 오류 발생")
                    console.log(response)
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
                별점<br/>
                <select onChange={chuchanChangeHandler} value={chuchan}>
                    {chuchans.map(item => (
                        <option key={item.key} value={item.key}>{item.value}</option> 
                    ))}
                </select>
                추천하시나요<br/>
                <select onChange={deliveryChangeHandler} value={delivery}>
                    {deliverys.map(item => (
                        <option key={item.key} value={item.key}>{item.value}</option> 
                    ))}
                </select>
                배달은 어떤가요<br/>



                <TextArea onChange={commentChangeHandler} value={Comment}/>
                <Button type="primary" danger size="small"  htmlType="submit" onClick={commentSubmitHandler}>
                    상품평 남기기
                </Button>
            </Form>
        </div>
    )
}

export default withRouter(ProductComment)
