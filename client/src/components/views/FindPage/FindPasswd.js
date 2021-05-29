import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { findPwUser } from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom';
import { Button, Form, Input, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom'



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
                    alert('비밀번호가 초기화 되었습니다. (변경번호 : 1234qwerasdf)');
                    props.history.push('/login')
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
                <Link to="/login">
                    <Image
                        src="https://i.ibb.co/YcVkJPH/FINDPW.png"
                        as='a'
                        size='medium'
                    />
                </Link>
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
                        <a style={{ color: "white" }}>비밀번호 초기화</a>
                    </Button>
                </Form>
            </div>
        </div>
    )
}

export default withRouter(FindPWPage)
