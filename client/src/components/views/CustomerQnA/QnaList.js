import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import Header from '../Header/Header';
import { Button, Item, Pagination } from 'semantic-ui-react';
import axios from 'axios';
import { Descriptions } from 'antd'
import Comment from './Sections/Comment';


function QnaList(props) {
    const requireId = props.match.params.requireId

    const [Qna, setQna] = useState({})

    useEffect(() => {
        axios.get(`/api/require/requires_by_id?id=${requireId}&type=single`)
            .then(response => {
                console.log('response data : ', response.data);
                setQna(response.data.require[0])
            })
            .catch(err => alert(err))
    }, [])
    const whichPart = (value) => {
        switch (value) {
            case 1: return "배송문의"
                break;
            case 2: return "상품문의"
                break;
            default: return ""
        }
    }
    const renderComment = () => (
        Qna.comment && Qna.comment.map((require, index) => (
            <p key={index}>
                {require.comment}
            </p>
        )
        )
    )

    return (
        <div>
            <Header />
            <div style={{ width: '75%', padding: '1rem 4rem', paddingLeft: '30%' }}>

                <br />
                <Descriptions title={whichPart(Qna.requirePart)} />
                <Descriptions title={`작성자 : ${Qna.writer}`} />
                <Descriptions title={`제목 : ${Qna.title}`}>
                    <Descriptions.Item labels="Description">{Qna.description}</Descriptions.Item>

                    <br />
                </Descriptions>

                <br />
                <div style={{ justifyContent: 'center' }}>
                    {renderComment()}
                </div>
                <br />

                <Comment detail={Qna} />

            </div>
        </div>

    )
}

export default QnaList