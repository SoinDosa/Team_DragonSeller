import Header from '../../Header/Header'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Message } from 'semantic-ui-react'


function Privacy(props) {
    const dispatch = useDispatch();

    return (
        <div>
            <div>
                <Header />
            </div>
            <div>
                <div > <h1>개인정보처리방침</h1> </div>

                <Message>
                    <Message.Header>DragonSeller는 이메일주소, 이름, 아이디, 비밀번호 외의 개인정보를 다루지 아니하며 해당 정보에 대해 잘 관리합니다.</Message.Header>
                </Message>
            </div>
        </div>
    )
}

export default withRouter(Privacy)