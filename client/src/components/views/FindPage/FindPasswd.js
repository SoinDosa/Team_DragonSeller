import React, { useState } from 'react'
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
<<<<<<< Updated upstream
                if (response.payload.loginSuccess) {
                    props.history.push('/')
=======
                if (response.payload.success) {
                    console.log(response.payload)
                    console.log(response.userId)
                    alert('비밀번호가 초기화 되었습니다. (변경번호 : 1234qwerasdf)');
                    props.history.push('/login')
>>>>>>> Stashed changes
                } else {
                    alert('Error')
                }
            })
    }

    const onSubmitbackHandler = () => {

    }
<<<<<<< Updated upstream
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

        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center'
            , width: '100%', height: '100vh', flexDirection: 'column'
        }}>
            <form style={{ display: 'flex', flexDirection: 'column' }}
                onSubmit={onSubmitHandler}>
                <label>ID</label>
                <input type="id" value={Id} onChange={onIdHandler} />
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler} />
                <br />
                <Button positive type="submit">
                    Login
                </Button>
            </form>
            {/* <div style={{display: 'flex', paddig: '10px'}}>
            <Button positive>
                <a style={{color:'white'}} href ="/">홈으로 가기</a>
            </Button>
            </div> */}
=======

    return (

        <div style={{ background: '#f1f1f1' }}>
            <div style={{
                display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto'
                , width: '400px', height: '100vh', flexDirection: 'column', background: 'white'
            }}>
                <Image
                    src="https://i.ibb.co/YcVkJPH/FINDPW.png"
                    as='a'
                    size='medium'
                    href='../'
                />
                <Form style={{ display: 'flex', flexDirection: 'column', marginTop: '50px' }}
                    onSubmit={onSubmitHandler}>

                    <Form.Field
                        id={Email}
                        control={Input}
                        placeholder='이메일주소'
                        onChange={onEmailHandler}
                    />
                    <Form.Field
                        id={Id}
                        control={Input}
                        placeholder='ID'
                        onChange={onIdHandler}
                    />
                    <Form.Field
                        id={Name}
                        control={Input}
                        placeholder='이름'
                        onChange={onNameHandler}
                    />
                    <br />
                    <Button type="submit" color='black'>
                        <a style={{ color: "white" }}>비밀번호 찾기</a>
                    </Button>
                </Form>
            </div>
>>>>>>> Stashed changes
        </div>
    )
}

<<<<<<< Updated upstream
export default withRouter(LoginPage)
=======
export default withRouter(FindPWPage)
>>>>>>> Stashed changes
