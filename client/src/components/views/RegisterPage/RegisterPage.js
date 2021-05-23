import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { registerUser, loginUser } from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom';
import Header from '../Header/Header'
import { Form, Input, Image, Button } from 'semantic-ui-react'


function RegisterPage(props) {
    const dispatch = useDispatch();

    const [Email, setEmail] = useState("")
    const [Id, setId] = useState("")
    const [Name, setName] = useState("")
    const [Password, setPassword] = useState("")
    const [ConfirmPassword, setConfirmPassword] = useState("")


    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }

    const onIdHandler = (event) => {
        setId(event.currentTarget.value)
    }

    const onNameHandler = (event) => {
        setName(event.currentTarget.value)
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }

    const onConfirmPasswordHandler = (event) => {
        setConfirmPassword(event.currentTarget.value)
    }
    const onSubmitHandler = (event) => {
        event.preventDefault();

        if (!Email || !Id || !Password || !Name) {
            return alert('모든 정보를 입력해주세요!')
        }
        if (Password !== ConfirmPassword) {
            return alert('비밀번호와 비밀번호 확인은 같아야 합니다.')
        }
        if (Password.length < 8) {
            return alert('비밀번호는 최소 8자리 이상이여야 합니다.')
        }

        let body = {
            email: Email,
            id: Id,
            password: Password,
            name: Name
        }
        dispatch(registerUser(body))
            .then(response => {
                if (response.payload.success) {
                    dispatch(loginUser(body))
                        .then(
                            setTimeout(function () {
                                props.history.push("/")
                            }, 1000)
                        )
                } else {
                    alert("아이디 혹은 이메일이 이미 존재합니다.")
                }
            })
    }



    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center'
            , width: '100%', height: '100vh', background: '#f1f1f1'
        }}>
            <div style={{
                display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto'
                , width: '400px', height: '100vh', flexDirection: 'column', background: 'white'
            }}>

                <Image
                    src="https://i.ibb.co/pvF1cCf/REGISTER.png"
                    as='a'
                    size='medium'
                    href='../'
                />

                <Form style={{ display: 'flex', flexDirection: 'column', marginTop: '50px' }}
                    onSubmit={onSubmitHandler}
                >
                    <Form.Field
                        id={Email}
                        control={Input}
                        placeholder='email@example.com'
                        onChange={onEmailHandler}
                    />

                    <Form.Field
                        id={Name}
                        control={Input}
                        placeholder='이름'
                        onChange={onNameHandler}
                    />
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
                        placeholder='비밀번호(8자리 이상)'
                        onChange={onPasswordHandler}
                    />
                    <Form.Field
                        id={ConfirmPassword}
                        type="password"
                        control={Input}
                        placeholder='비밀번호 확인(위와 동일)'
                        onChange={onConfirmPasswordHandler}
                    />
                    <br />
                    <Button type="submit" color='black'>
                        <a style={{ color: "white" }}>회원가입</a>
                    </Button>
                </Form>
            </div>
        </div >
    )
}

export default withRouter(RegisterPage)