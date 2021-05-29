import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import Footer from '../Footer/Footer';
import LogButton from '../Button/Button';

import {
    Button,
    Container,
    Icon,
    Header,
    Segment
  } from 'semantic-ui-react'
  import '../../../App.css';

  function UserPage(props) {

    const style = {
        backgroundColor : '#1b1c1d',
        width: '100vw',
        height: '100vh'
    }

      return (
        <div id= 'wrap' >
            <div className= "headerWrap">
            </div>
            <div id= 'containerWrap'>
                <div id='main' style={style}>
                    <Segment
                    inverted
                    textAlign='center'
                    style={{ minHeight: '30px', padding: '2em 0em' }}
                    vertical
                    >
                    <Container>
                        <Link to="/">
                            <Header as='h1' color='red'>Dragon Seller</Header> 
                        </Link>
                    </Container>
                    <Container align="right"><LogButton/></Container>
                    </Segment>
                    <div style={{ width: '75%', margin: '3rem auto', }}>
                        <h1 align="center" style={{color: 'white'}}>사용자 설정 메뉴</h1>
                    </div>
                    <div className="menuwrapper">
                        <div className="menuwrapperitem">
                            <br/>
                            비밀번호 변경
                            <form style={{ display: 'flex', flexDirection: 'column' }}>
                                <br/>
                                <div>
                                    <Link to="changePw"><Button color='olive'>변경</Button></Link>
                                </div>
                            </form>
                        </div>
                        <div className="menuwrapperitem"><br/>
                            기본 주소지 설정
                            <form style={{ display: 'flex', flexDirection: 'column' }}>
                                <br/>
                                <div>
                                    <Button color='olive'>수정</Button>
                                </div>
                            </form>
                        </div>
                        <div className="menuwrapperitem">
                            <br/>
                            장바구니 확인
                            <form style={{ display: 'flex', flexDirection: 'column' }}>
                                <br/>
                                <div>
                                    <Link to="/user/cart"><Button color='olive'>확인</Button></Link>
                                </div>
                            </form></div>
                        <div className="menuwrapperitem"><br/>
                            결제 내역
                            <form style={{ display: 'flex', flexDirection: 'column' }}>
                                <br/>
                                <div>
                                    <Link to='/history'><Button color='olive'>확인</Button></Link>
                                </div>
                            </form>
                        </div>
                        
                    </div>
                </div>
                
            </div>
          
        </div>
          
      )
  }

  export default withRouter (UserPage)