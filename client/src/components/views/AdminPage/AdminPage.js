import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { withRouter } from 'react-router-dom';
// import '../style/LPS.css';
import Footer from '../Footer/Footer';
import LogButton from '../Button/Button';
import Banner from '../Banner/Banner';
import {
    Button,
    Container,
    Divider,
    Grid,
    Icon,
    Image,
    List,
    Menu,
    Segment,
    Sidebar,
    Visibility,
} from 'semantic-ui-react'
import '../../../App.css';
import Header from "../Header/Header";
function AdminPage(props) {

    const style = {
        backgroundColor: '#1b1c1d',
        width: '100vw',
        height: '100vh'
    }
    return (
        <div id='wrap' >
            <div className="headerWrap">
            </div>
            <div id='containerWrap'>
                <div id='main' style={style}>
                    <Segment
                        inverted
                        textAlign='center'
                        style={{ minHeight: '30px', padding: '1em 0em' }}
                        vertical
                    >
                        <Container>
                            <Header />
                        </Container>

                    </Segment>
                    <div className="menuwrapper">

                        <div className="menuwrapperitem">
                            <br />
                            공지/이벤트/Banner
                            <form style={{ display: 'flex', flexDirection: 'column' }}>
                                <br />
                                <div>
                                    <Link to="/banner/upload"><Button color='olive'>추가</Button></Link>
                                </div>
                                <div>
                                    <Link to="/banner/revise"><Button color='orange'>수정</Button></Link>
                                </div>
                            </form></div>
                        <div className="menuwrapperitem"><br />
                            상품 관리
                            <form style={{ display: 'flex', flexDirection: 'column' }}>
                                <br />
                                <div>
                                    <Link to='/product/upload'><Button color='olive'>추가</Button></Link>
                                </div>
                                <div>
                                    <Link to='/product/revise'><Button color='orange'>수정</Button></Link>
                                </div>
                            </form></div>
                        <div className="menuwrapperitem"><br />
                            주문 관리
                            <form style={{ display: 'flex', flexDirection: 'column' }}>
                                <br />
                                <div>
                                    <Link to='/payment'><Button color='orange'>관리</Button></Link>
                                </div>
                            </form>
                        </div>
                        <div className="menuwrapperitem">
                            <br />
                            쿠폰 관리
                            <form style={{ display: 'flex', flexDirection: 'column' }}>
                                <br />
                                <div>
                                    <Link to="/coupon"><Button color='orange'>관리</Button></Link>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default withRouter(AdminPage)