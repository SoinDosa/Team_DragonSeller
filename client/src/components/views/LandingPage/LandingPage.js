import React, { useEffect } from 'react'
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import { withRouter } from 'react-router-dom';
// import '../style/LPS.css';
import Footer from '../Footer/Footer';
import LogButton from '../Button/Button';
import Header from '../Header/Header';
import Banner from '../Banner/Banner';
//...
function LandingPage(props) {
    useEffect(() => {
        axios.get('/api/hello')
            .then(response => { console.log(response) })
    }, [])


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
                    <Banner/>
                </div>
            </div>
            <div id='footerWrap'>
                <Footer />
            </div>
        </div>
    )
}

export default withRouter(LandingPage)