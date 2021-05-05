import React, { useEffect, useState } from 'react'
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import { withRouter } from 'react-router-dom';
// import '../style/LPS.css';
import Footer from '../Footer/Footer';
import LogButton from '../Button/Button';
import Header from '../Header/Header';
//...
function LandingPage(props) {

    const [Products, setProducts] = useState([])

    useEffect(() => {
        // 여기 수정함
        axios.post('/api/product/products')
            .then(response => { 
                if(response.data.success){
                    setProducts(response.data.productInfo)
                } else {
                    alert("상품 정보를 가져오는데 실패했습니다")
                }
            })
    }, [])


    const renderCards = Products.map((product, index) => {
        // <a href={`/product/${product._id}`}></a>
    })

    const onClicLogoutkHandler = () => {
        axios.get(`/api/users/logout`)
            .then(response => {
                if (response.data.success) {
                    props.history.push("/");
                    alert('로그아웃 하였습니다.');
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

    return (
        <div id= 'wrap'>
            <div className= "headerWrap">
                <div>
                    <Header/>
                </div>
                {/* <div className="header logo">로고</div>
                <div className="header header-name"> Dragon Seller </div>
                <nav className="header Nav">
                <LogButton/>
                </nav> */}
            </div>
            <div id= 'containerWrap'>
                <div id='main'>
                   {/* 이 아래 부분은 상품 불러오기 가안 */}
                   <div style={{ width: '75%', margin: '3rem auto' }}>
                    <h2>손님 맞을래요?</h2>
                    {renderCards}
                   </div>
                </div>
            </div>
            <div id='footerWrap'>
                <Footer />
            </div>
        </div>
    )
}

export default withRouter(LandingPage)