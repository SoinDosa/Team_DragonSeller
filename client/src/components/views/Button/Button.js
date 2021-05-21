import React,{useState,useEffect} from 'react';
import {useSelector} from "react-redux";
import {withRouter} from 'react-router-dom';
import axios,{push} from 'axios';
import { Button } from 'semantic-ui-react';

const LogButton = (props) =>{
    const user = useSelector(state => state.user);
    useEffect(() => {
        axios.get('/api/hello')
            .then(response => { console.log(response) })
    }, [])
    // const onClickHandler = () => {
    //     axios.get(`/api/users/logout`)
    //         .then(response => {
    //             if (response.data.success) {
    //                 props.history.push("/login")
    //             } else {
    //                 alert('로그아웃 하는데 실패 했습니다.')
    //             }
    //         })
    // }
    const onClicLogoutkHandler = () => {
        axios.get(`/api/users/logout`)
            .then(response => {
                if (response.data.success) {
                    alert('로그아웃 하였습니다.');
                    props.history.push("/login");
                    props.history.push("/")
                    
                } else {
                    alert('로그아웃 하는데 실패 했습니다.')
                }
            })
    }

    const onClicLoginkHandler = () => {
        axios.get(`/api/users/logout`)
            .then(response => {
                if (response.data.error) {
                    props.history.push("/login");
                    alert('로그인화면으로 이동합니다.');
                } else {
                    
                    alert('로그인하는데 실패 했습니다.')
                }
            })
    }

    const onClicSignUpHandler = () => {
        axios.get(`/api/users/logout`)
            .then(response => {
                if (response.data.error) {
                    props.history.push("/register");
                    alert('회원가입화면으로 이동합니다.');
                } else {
                    
                    alert('회원가입이동 error')
                }
            })
    }
    
    if( user.userData && !user.userData.isAuth){
        return (
        <div>
            <nav>
            <Button primary onClick={onClicLoginkHandler}>Login</Button>
            <Button primary onClick={onClicSignUpHandler}>SignUp</Button>
            </nav>
        </div> 
        )
    }else{
        return (
            <div>
            <Button primary onClick={onClicLogoutkHandler}>Logout</Button>
            </div>
        )        

    }  
}   
    

export default withRouter(LogButton)