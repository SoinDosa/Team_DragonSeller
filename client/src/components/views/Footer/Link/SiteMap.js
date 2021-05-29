import Header2 from '../../Header/Header'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { List, Header } from 'semantic-ui-react'


function SiteMap(props) {
    const dispatch = useDispatch();

    return (
        <div>
            <div>
                <Header2 />
            </div>
            <div>

                <Header as='h2' image='https://image.flaticon.com/icons/png/512/659/659999.png' content='사이트맵' />
                <br></br>
                <br></br>
                <h3>내부 페이지</h3>
                <List bulleted>
                    <List.Item><Link to="/">메인 페이지</Link></List.Item>
                    <List.Item><Link to="/">유저 페이지</Link></List.Item>
                    <List.Item><Link to="/">상품 페이지</Link></List.Item>
                    <List.Item><Link to="/">회원가입 페이지</Link></List.Item>
                    <List.Item><Link to="/">장바구니 페이지</Link></List.Item>
                </List>
                <br></br>
                <h3>외부 페이지</h3>
                <List bulleted>
                    <List.Item href="http://eclass.seoultech.ac.kr">서울과학기술대학교 E-Class</List.Item>
                    <List.Item href="http://portal.seoultech.ac.kr">서울과학기술대학교 포털</List.Item>
                    <List.Item href="https://github.com/SoinDosa/Team_DragonSeller">19팀 드래곤샐러 깃허브</List.Item>
                    <List.Item href="https://www.notion.so/b900c39f0ab94437bcb3f44f3e55a6b7?v=23a81c3576554f489894bc42b1384e61">19팀 드래곤샐러 노션</List.Item>
                </List>

            </div>
        </div>
    )
}

export default withRouter(SiteMap)