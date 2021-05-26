import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { registerUser, loginUser, checkIdUser, checkEmailUser } from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom';
import Header from '../Header/Header'
import { Form, Input, Image, Button } from 'semantic-ui-react'
import { IoT1ClickDevicesService } from 'aws-sdk';


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

    const onCheckIdHandler = (event) => {
        event.preventDefault();

        let body = {
            id: Id
        }
        
        if(!Id) {
            return alert('아이디를 적어주세요!')
        }
        dispatch(checkIdUser(body))
            .then(response => {
                if (response.payload.checkId) {
                    console.log(response)
                    console.log(response.payload)
                   alert('아이디가 이미 존재합니다.')
                } else{
                    console.log(response)
                    console.log(response.payload)
                    alert("사용 가능한 아이디 입니다.")
                }
            }
        )
    }

    function validateEmail(email) {
        var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        return re.test(email);
        }

    const onCheckEmailHandler = (event) => {
        event.preventDefault();
        
        let body = {
            email: Email
        }
        
        if(!Email) {
            return alert('이메일을 적어주세요!')
        }
        if(!validateEmail(Email)){
            return alert('잘못된 이메일 형식')
        }
        dispatch(checkEmailUser(body))
            .then(response => {
                if (response.payload.checkEmail) {
                    console.log(response)
                    console.log(response.payload)
                   alert('이메일이 이미 존재합니다.')
                } else{
                    console.log(response)
                    console.log(response.payload)
                    alert("사용 가능한 이메일 입니다.")
                }
            }
        )
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
            return alert('비밀번호는 최소 8자리 이상이여야 합니다.(숫자, 글자 포함)')
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
                                alert('회원가입 성공!!')
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
                    // onSubmit={onSubmitHandler}
                >
                    <Form.Field
                        id={Email}
                        type="email"
                        control={Input}
                        placeholder='email@example.com'
                        onChange={onEmailHandler}
                    />
                    <input type="submit" color='black' value="이메일 중복 체크" onClick={onCheckEmailHandler} />
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
                    <input type="submit" color='black' value="아이디 중복 체크" onClick={onCheckIdHandler} />
                    <Form.Field
                        id={Password}
                        type="password"
                        control={Input}
                        placeholder='비번(글자,숫자 8자리 이상)'
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
                    <input type="submit" color='black' value="회원가입" onClick={onSubmitHandler} />
                        {/* <a style={{ color: "white" }}>회원가입</a> */}
                    
                </Form>
            </div>
        </div >
    )
}

export default withRouter(RegisterPage)