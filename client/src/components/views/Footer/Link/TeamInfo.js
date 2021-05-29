import Header2 from '../../Header/Header'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { List, Header } from 'semantic-ui-react'

function TeamInfo(props) {
    const dispatch = useDispatch();

    return (
        <div>
            <div>
                <Header2 />
            </div>
            <div>
                <Header as='h2' image='https://image.flaticon.com/icons/png/512/1935/1935066.png' content='소프트웨어공학 19팀 정보' />
                <List divided relaxed>
                    <List.Item href="https://github.com/SoinDosa">
                        <List.Icon name='github' size='large' verticalAlign='middle' />
                        <List.Content>
                            <List.Header as='a'>서울과학기술대학교 컴퓨터공학과 17101195 김선휘</List.Header>
                            <List.Description as='a'>Back-End Developer</List.Description>
                        </List.Content>
                    </List.Item>
                    <List.Item href="https://github.com/JangHanjun">
                        <List.Icon name='github' size='large' verticalAlign='middle' />
                        <List.Content>
                            <List.Header as='a'>서울과학기술대학교 컴퓨터공학과 17101237 장한준</List.Header>
                            <List.Description as='a'>Back-End Developer</List.Description>
                        </List.Content>
                    </List.Item>
                    <List.Item href="https://github.com/DDing77">
                        <List.Icon name='github' size='large' verticalAlign='middle' />
                        <List.Content>
                            <List.Header as='a'>서울과학기술대학교 컴퓨터공학과 17101218 서명교</List.Header>
                            <List.Description as='a'>Front-End Developer</List.Description>
                        </List.Content>
                    </List.Item>
                    <List.Item href="https://github.com/qudtjs0753">
                        <List.Icon name='github' size='large' verticalAlign='middle' />
                        <List.Content>
                            <List.Header as='a'>서울과학기술대학교 컴퓨터공학과 17101181 강병선</List.Header>
                            <List.Description as='a'>Front-End Developer</List.Description>
                        </List.Content>
                    </List.Item>
                    <List.Item href="https://github.com/lhi7837">
                        <List.Icon name='github' size='large' verticalAlign='middle' />
                        <List.Content>
                            <List.Header as='a'>서울과학기술대학교 컴퓨터공학과 17101235 임해일</List.Header>
                            <List.Description as='a'>Front-End Developer</List.Description>
                        </List.Content>
                    </List.Item>
                </List>
                <br></br>

            </div>
            </div>
    )
}

export default withRouter(TeamInfo)