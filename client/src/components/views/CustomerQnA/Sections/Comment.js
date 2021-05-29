import React, { useState } from 'react'
import { Typography, Button, Form, Input } from 'antd';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

function Comment(props) {

    const { TextArea } = Input;

    const [Comment, setComment] = useState("")
    const commentChangeHandler = (event) => {
        setComment(event.currentTarget.value)
    }

    const commentSubmitHandler = () => {

        const body = {
            requireId: props.detail._id,
            comment: Comment,
        }

        axios.post("/api/require/addComment", body)
            .then(response => {
                if (response.data.success) {
                    alert("답변이 작성되었습니다.")
                    console.log(body)
                    window.location.reload()
                } else {
                    alert("오류 발생")
                    console.log(response)
                }
            })
    }

    return (
        <div>
            <Form onSubmit={commentSubmitHandler}>

                <TextArea onChange={commentChangeHandler} value={Comment} />
                <Button type="primary" danger size="small" htmlType="submit" onClick={commentSubmitHandler}>
                    답변 작성
                </Button>
            </Form>
        </div>
    )
}

export default withRouter(Comment)
