import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom';
import { Button, Icon, Form, Input } from 'semantic-ui-react';
import { createMedia } from '@artsy/fresnel'
import titleimg from '../../../images/title.png';

const { MediaContextProvider, Media } = createMedia({
    breakpoints: {
        mobile: 0,
        tablet: 768,
        computer: 1024,
    },
})

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

    const onSubmitHandler = (submit) => {
        submit.preventDefault();

        let body = {
            id: Id,
            password: Password
        }

        dispatch(loginUser(body))
            .then(response => {
                if (response.payload.loginSuccess) {
                    props.history.push('/')
                } else {
                    alert('Error')
                }
            })
    }

    const onSubmitbackHandler = () => {

    }
    // const onClickLandingHandler = () => {
    //     axios.get(`/api/users/logout`)
    //         .then(response => {
    //             if (response.data.error) {
    //                 props.history.push("/register");
    //                 alert('로그인화면으로 이동합니다.');
    //             } else {

    //                 alert('로그인하는데 실패 했습니다.')
    //             }
    //         })
    // }

    return (
        <div style={{ background: '#f1f1f1' }}>
            <div style={{
                display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto'
                , width: '400px', height: '100vh', flexDirection: 'column', background: 'white'
            }}>
                <img src={titleimg} alt="title" height="80vh" weight="80vh" />

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
                    <div>
                        <a href="../register">회원가입</a> |<a> 아이디 찾기</a> |<a> 비밀번호 찾기</a>
                    </div>
                </Form>
            </div>
        </div >
    )
}

export default withRouter(LoginPage)