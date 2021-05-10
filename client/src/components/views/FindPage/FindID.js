import React, { useState, Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { findIdUser } from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom';
import { Button, Icon } from 'semantic-ui-react';


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
                    // props.history.push('/')
                    console.log(response.payload)
                    console.log(response.userId)
                    alert('아이디는 '+ response.payload.userId);
                    props.history.push("/login")
                } else {
                    alert('에러뜨죠?ㅅㅂ')
                }
            })
    }

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center'
            , width: '100%', height: '100vh'
        }}>
            <form style={{ display: 'flex', flexDirection: 'column' }}
                onSubmit={onSubmitHandler}
            >
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler} />

                <label>Name</label>
                <input type="text" value={Name} onChange={onNameHandler} />

                <br />
                <Button positive type="submit">
                    아이디 찾기
                </Button>
            </form>
        </div>
    )
}

export default withRouter(FindIDPage)