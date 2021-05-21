import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { findPwUser } from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom';
import { Button, Icon } from 'semantic-ui-react';


function FindPWPage(props) {
    const dispatch = useDispatch();

    const [Id, setId] = useState("")
    const [Email, setEmail] = useState("")
    const [Name, setName] = useState("")

    const onIdHandler = (event) => {
        setId(event.currentTarget.value)
    }

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }

    const onNameHandler = (event) => {
        setName(event.currentTarget.value)
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();

        let body = {
            id: Id,
            email: Email,
            name: Name
        }

        dispatch(findPwUser(body))
            .then(response => {
                if (response.payload.success) {
                    console.log(response.payload)
                    console.log(response.userId)
                    alert('비밀번호가 초기화 되었습니다. (변경번호 : 1234qwerasdf)' );
                    props.history.push('/login')
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
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler} />
                <label>Name</label>
                <input type="text" value={Name} onChange={onNameHandler} />
                <br />
                <Button positive type="submit">
                    비밀번호 초기화
                </Button>
            </form>
            {/* <div style={{display: 'flex', paddig: '10px'}}>
            <Button positive>
                <a style={{color:'white'}} href ="/">홈으로 가기</a>
            </Button>
            </div> */}
        </div>
    )
}

export default withRouter(FindPWPage)
