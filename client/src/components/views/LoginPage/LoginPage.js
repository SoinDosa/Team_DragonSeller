import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom';
import { Button, Form, Input, Image } from 'semantic-ui-react';


function LoginPage(props) {
    const dispatch = useDispatch();

    const [Id, setId] = useState("")
    const [Password, setPassword] = useState("")

    const onIdHandler = (event) => {
        setId(event.currentTarget.value)
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();

        let body = {
            id: Id,
            password: Password
        }

        dispatch(loginUser(body))
            .then(response => {
                if (response.payload.loginSuccess) {
                    alert(response.payload.userId + '님 환영합니다!!')
                    axios.get('/api/users/admin_auth', body)
                        .then(response => {
                            if (response.data.isAdmin) {
                                setTimeout(function () {
                                    props.history.push('/adminpage')
                                }, 100)


                            } else {

                                props.history.push('/')

                            }
                        })
                } else {
                    alert('Error')
                }
            })
    }


    return (

        <div style={{ background: '#f1f1f1' }}>
            <div style={{
                display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto'
                , width: '400px', height: '100vh', flexDirection: 'column', background: 'white'
            }}>
                <Image
                    src="https://i.ibb.co/84GnTjM/LOGIN.png"
                    as='a'
                    size='medium'
                    href='../'
                />
                <Form style={{ display: 'flex', flexDirection: 'column', marginTop: '50px' }}
                    onSubmit={onSubmitHandler}>
                    <Form.Field
                        id={Id}
                        control={Input}
                        placeholder='아이디'
                        onChange={onIdHandler}
                    />
                    <Form.Field
                        id={Password}
                        type="password"
                        control={Input}
                        placeholder='비밀번호'
                        onChange={onPasswordHandler}
                    />
                    <br />
                    <Button type="submit" color='black'>
                        <a style={{ color: "white" }}>로그인</a>
                    </Button>
                    <br />
                    <div >
                        <a href="../register" style={{ color: "black" }} >회원가입</a> |<a href="../findId" style={{ color: "black" }}> 아이디 찾기</a> |<a href="../findPw" style={{ color: "black" }}> 비밀번호 찾기</a>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default withRouter(LoginPage)