import React, { useState, useEffect } from 'react'
import { Typography, Button, Form, Input } from 'antd';
import axios from 'axios';
import Header from '../Header/Header';

//import { response } from 'express';

const { TextArea } = Input;

const RequireParts = [
    { key: 1, value: "배송문의" },
    { key: 2, value: "상품문의" },
]

function RequirePage(props) {
    // const [Name, setName] = useState("")
    // useEffect(axios.get('/api/users/auth/')
    //     .then((response => {
    //         if (response.data) {
    //             setName(response.data.name)
    //         }
    //     })), [])
    const [Title, setTitle] = useState("")
    const [Description, setDescription] = useState("")
    const [RequirePart, setRequirePart] = useState(1)


    const titleChangeHandler = (event) => {
        setTitle(event.currentTarget.value)
    }

    const descriptionChangeHandler = (event) => {
        setDescription(event.currentTarget.value)
    }


    const partsChangeHandler = (event) => {
        setRequirePart(event.currentTarget.value)
    }

    const submitHandler = (event) => {
        // 확인을 누를 떄 자동으로 리프레쉬 안되게
        event.preventDefault();

        // 유효성 체크
        // 모든 칸을 채워야

        if (Title.length < 4) {
            return alert("제목은 3글자 이상 작성해주세요.")
        }

        if (!Title || !Description || !RequirePart) {
            return alert("빈 칸이 없는지 확인해주세요.")
        }

        // 서버에 값들을 request
        const body = {
            writer: props.user.userData.id,
            title: Title,
            description: Description,
            requirePart: RequirePart,

        }


        axios.post("/api/require", body)
            .then(response => {
                if (response.data.success) {
                    alert("문의사항이 업로드 되었습니다")
                    props.history.push('/')
                } else {
                    alert("문의는 고구마 사러 갔는뎅")
                }
            })
    }

    return (



        <div>
            <Header />
            <div style={{ maxWidth: '700px', margin: '2rem auto' }}>

                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <h2>문의사항</h2>
                </div>

                <Form onSubmit={submitHandler}>

                    <label>문의 제목</label>
                    <Input onChange={titleChangeHandler} value={Title} />
                    <br />
                    <br />
                    <label>내용</label>
                    <TextArea onChange={descriptionChangeHandler} value={Description} />
                    <br />
                    <br />
                    <select onChange={partsChangeHandler} value={RequirePart}>
                        {RequireParts.map(item => (
                            <option key={item.key} value={item.key}>{item.value}</option>
                        ))}
                    </select>
                    <br />
                    <br />
                    <Button htmlType="submit" onClick={submitHandler}>문의 등록</Button>
                </Form>

            </div>
        </div>
    )
}

export default RequirePage