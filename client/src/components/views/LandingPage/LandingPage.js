import React, { useEffect,useState } from 'react'
import { Button,Card,Grid } from 'semantic-ui-react';
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
    const s3path= 'https://seonhwi.s3.amazonaws.com/';
    const [Products, setProducts] = useState([])
    useEffect(() => {
        axios.get('/api/hello')
            .then(response => { console.log(response) })
            getNewProducts()
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

    const getNewProducts = () => {
        axios.get('api/product/getNewProducts')
        .then(response => {
            //searchPage에서 바뀐부분.
            if(response.data.success){
                if(response.data.length>0){
                    //여기 바꿔야될듯..?
                    setProducts([...Products, ...response.data.products])
                }else{
                    setProducts(response.data.products)
                }
            }else{
                alert('Failed to fetch product datas')
            }
        })
    }

    const renderCards = Products.map((product, index) => {
        return (
               <Grid.Column columns={5} width={4} key={index}>
                    <Link to={`/product/${product._id}`}>
                        <Card
                            image={`${s3path}${product.images[0]}`}
                            header={product.title}
                            description={product.price}
                            style={{margin:'30px 10px', maxwidth: '30px'}}
                        />
                    </Link>
               </Grid.Column>     
                )
    })

    return (
        
        <div id= 'wrap'>
            <div>
                <Header/>
            </div>
            <div id= 'containerWrap'>
                <div id='main' style={{witdh: '100%', marginBottom:'200px'}}>
                    <br/>
                    <Banner/>
                </div>
            </div>
            <div>
                <h1 style={{textAlign: "center"}}>최신상품</h1>
                    {Products.length === 0?
                        <div style={{display: 'flex', height: '300px', justifyContent: 'center', alignItems: 'Center'}}>
                            <h2>No post yet...</h2>
                        </div> :
                        <div style={{width: '75%', margin: '3rem auto'}}>
                            <Grid>
                                {renderCards}
                            </Grid>  
                        </div>
                    }
                </div>
        </div>
    )
}

/*
product.js에 추가할 부분.
router.get('/getNewProducts', (req, res) => {
  Product.find()
  .sort({'_id': 1})
  .limit(5)
  .exec((err,products) => {
    if(err) return res.status(400).json({success: false, err})
    res.status(200).json({success:true, products})
  })
})
*/
export default withRouter(LandingPage)