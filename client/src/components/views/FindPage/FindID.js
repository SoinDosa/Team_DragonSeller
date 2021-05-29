import React, { useState, Component } from 'react'
import { useDispatch } from 'react-redux';
import { findIdUser } from '../../../_actions/user_action';
import { withRouter, Link } from 'react-router-dom';
import { Button, Form, Input, Image } from 'semantic-ui-react';



function FindIDPage(props) {

    const dispatch = useDispatch();

    const [Email, setEmail] = useState("")
    const [Name, setName] = useState("")

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }

    const onNameHandler = (event) => {
        setName(event.currentTarget.value)
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();

        let body = {
            email: Email,
            name: Name
        }

        dispatch(findIdUser(body))
            .then(response => {
                if (response.payload.findId) {
                    console.log(response.payload)
                    console.log(response.userId)
                    alert('아이디는 "' + response.payload.userId + '"입니다. 로그인 페이지로 이동합니다.');
                    props.history.push("/login")
                } else {
                    alert('ERROR!!')
                }
            })
    }

    return (

        <div style={{ background: '#f1f1f1' }}>
            <div style={{
                display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto'
                , width: '400px', height: '100vh', flexDirection: 'column', background: 'white'
            }}>
                <Link to="/login">
                    <Image
                        src="https://i.ibb.co/jf54gZ5/FINDID.png"
                        as='a'
                        size='medium'
                    />
                </Link>
                <Form style={{ display: 'flex', flexDirection: 'column', marginTop: '50px' }}
                    onSubmit={onSubmitHandler}>
                    <Form.Field
                        id={Email}
                        control={Input}
                        placeholder='이메일주소'
                        onChange={onEmailHandler}
                    />
                    <Form.Field
                        id={Name}
                        control={Input}
                        placeholder='이름'
                        onChange={onNameHandler}
                    />
                    <br />
                    <Button type="submit" color='black'>
                        <a style={{ color: "white" }}>아이디 찾기</a>
                    </Button>
                </Form>
            </div>
        </div>
    )
}

export default withRouter(FindIDPage)
