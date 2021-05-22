import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom';
import { Button, Icon } from 'semantic-ui-react';


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
                    alert(response.payload.userId+'님 환영합니다!!')
                    axios.get('/api/users/admin_auth', body)
                    .then(response => {
                        if(response.data.isAdmin){
                            props.history.push('/adminpage')
                        } else {
                            
                        props.history.push('/')
                        
                        }
                    })
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
                <Link to="/findId">아이디 찾기</Link>
                <Link to="/findPw">비밀번호 찾기</Link>
                <Link to="/changePw">비밀번호 초기화</Link>
            </form>
            {/* <div style={{display: 'flex', paddig: '10px'}}>
            <Button positive>
                <a style={{color:'white'}} href ="/">홈으로 가기</a>
            </Button>
            </div> */}
        </div>
    )
}

export default withRouter(LoginPage)