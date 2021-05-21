import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux';
import {useSelector} from "react-redux";
import { changePwUser } from '../../../_actions/user_action';
import { logoutUser } from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom';
import { Button, Icon } from 'semantic-ui-react';


function ChangePWPage(props) {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const [newPassword, setnewPassword] = useState("")
    const [newcomfirmPassword, setnewcomfirmPassword] = useState("")

    const onnewPasswordHandler = (event) => {
        setnewPassword(event.currentTarget.value)
    }

    const onnewcomfirmPasswordHandler = (event) => {
        setnewcomfirmPassword(event.currentTarget.value)
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();
        if(user.userData && !user.userData.isAuth) {
            alert('로그인 상태가 아닙니다!');

        }
        else{
        if(newPassword !== newcomfirmPassword ) {
            return alert('비밀번호가 일치하지 않습니다!');
        }
        let body = {
            password: newcomfirmPassword
        }

        dispatch(changePwUser(body))
            .then(response => {
                if (response.payload.success) {
                    alert('비밀번호가 변경되었습니다!' );

                    // 강제 로그아웃
                    // dispatch(logoutUser(body))
                    // .then(response => {
                    //     if(response.payload.success) {
                    //         //
                    //     }
                    // })
                    // props.history.push("/login");
                    axios.get(`/api/users/logout`)
                    .then(response => {
                        if(response.data.success){
                            alert('다시 로그인을 해주세요');
                            props.history.push("/login");
                        }
                        else {
                            alert('로그아웃 하는데 실패 했습니다.');
                        }
                    })
                } else {
                    alert('Error')
                }
            })
    }
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
                <label>새로운 비밀번호</label>
                <input type="password" value={newPassword} onChange={onnewPasswordHandler} />
                <label>새로운 비밀번호 확인</label>
                <input type="password" value={newcomfirmPassword} onChange={onnewcomfirmPasswordHandler} />
                <br />
                <Button positive type="submit">
                    비밀번호 변경
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

export default withRouter(ChangePWPage)