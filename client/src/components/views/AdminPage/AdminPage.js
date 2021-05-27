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
    Header,
    Image,
    List,
    Menu,
    Segment,
    Sidebar,
    Visibility,
  } from 'semantic-ui-react'
import '../../../App.css';
function AdminPage(props) {

    const style = {
        backgroundColor : '#1b1c1d',
        width: '100vw',
        height: '100vh'
    }
    
    // const [Products, setProducts] = useState([])

    // useEffect(() => {
    //     // 여기 수정함
    //     axios.post('/api/product/products')
    //         .then(response => { 
    //             if(response.data.success){
    //                 setProducts(response.data.productInfo)
    //             } else {
    //                 alert("상품 정보를 가져오는데 실패했습니다")
    //             }
    //         })
    // }, [])


    // const renderCards = Products.map((product, index) => {
    //     // <a href={`/product/${product._id}`}></a>
    // })

    // const onClicLogoutkHandler = () => {
    //     axios.get(`/api/users/logout`)
    //         .then(response => {
    //             if (response.data.success) {
    //                 props.history.push("/");
    //                 alert('로그아웃 하였습니다.');
    //             } else {
    //                 alert('로그아웃 하는데 실패 했습니다.')
    //             }
    //         })
    // }

    // const onClicLoginkHandler = () => {
    //     axios.get(`/api/users/logout`)
    //         .then(response => {
    //             if (response.data.error) {
    //                 props.history.push("/login");
    //                 alert('로그인화면으로 이동합니다.');
    //             } else {
                    
    //                 alert('로그인하는데 실패 했습니다.')
    //             }
    //         })
    // }

    // return (
    //     <div id= 'wrap'>
    //         <div className= "headerWrap">
    //             <div>
    //                 <Header/>
    //             </div>
    //             {/* <div className="header logo">로고</div>
    //             <div className="header header-name"> Dragon Seller </div>
    //             <nav className="header Nav">
    //             <LogButton/>
    //             </nav> */}
    //         </div>
    //         <div id= 'containerWrap'>
    //             <div id='main'>
    //                 <Banner/>
    //                {/* 이 아래 부분은 상품 불러오기 가안 */}
    //                <div style={{ width: '75%', margin: '3rem auto' }}>
    //                 <h2>손님 맞을래요?</h2>
    //                 {renderCards}
    //                </div>
    //             </div>
    //         </div>
    //         <div id='footerWrap'>
    //             <Footer />
    //         </div>
    //     </div>
    // )
    return (
        <div id= 'wrap' >
            <div className= "headerWrap">
              
                {/* <div className="header logo">로고</div>
                <div className="header header-name"> Dragon Seller </div>
                <nav className="header Nav">
                <LogButton/>
                </nav> */}
            </div>
            <div id= 'containerWrap'>
                <div id='main' style={style}>
                    <Segment
                    inverted
                    textAlign='center'
                    style={{ minHeight: '30px', padding: '1em 0em' }}
                    vertical
                    >
                    <Container>
                        <Header as='h1' color='red'>Dragon Seller</Header>
                    </Container>
                    <Container align="right"><LogButton/></Container>
                    </Segment>
                    <div style={{ width: '75%', margin: '3rem auto', }}>
                        <h1 align="center" style={{color: 'white'}}>관리자 설정 메뉴</h1>
                    </div>
                    <div className="menuwrapper">
                        
                        <div className="menuwrapperitem">
                            <br/>
                            공지/이벤트/Banner
                            <form style={{ display: 'flex', flexDirection: 'column' }}>
                                <br/>
                                <div>
                                    <Link to="/banner/upload"><Button color='olive'>추가</Button></Link>
                                </div>
                                <div>
                                   <Link to="/banner/revise"><Button color='orange'>수정</Button></Link> 
                                </div>
                            </form></div>
                        <div className="menuwrapperitem"><br/>
                            상품 관리
                            <form style={{ display: 'flex', flexDirection: 'column' }}>
                                <br/>
                                <div>
                                    <Link to='/product/upload'><Button color='olive'>추가</Button></Link>
                                </div>
                                <div>
                                    <Link to='/product/revise'><Button color='orange'>수정</Button></Link>
                                </div>
                            </form></div>
                        <div className="menuwrapperitem"><br/>
                            주문 관리
                            <form style={{ display: 'flex', flexDirection: 'column' }}>
                                <br/>
                                <div>
                                    <Link to='/payment'><Button color='orange'>관리</Button></Link>
                                </div>
                            </form>
                        </div>
                        <div className="menuwrapperitem">
                            <br/>
                            쿠폰 관리
                            <form style={{ display: 'flex', flexDirection: 'column' }}>
                                <br/>
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

export default withRouter (AdminPage)