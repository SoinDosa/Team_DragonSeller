import React, { useEffect,useState } from 'react'
import { Button,Item } from 'semantic-ui-react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import { withRouter } from 'react-router-dom';
// import '../style/LPS.css';
import Footer from '../Footer/Footer';
import Sort from '../SearchPage/Sections/Sort'
import Dropdown from '../SearchPage/Sections/Dropdown'
import Header from '../Header/Header';
import SearchBar from '../SearchBar/SearchBar'
import {bannerPart,sortTime} from '../SearchPage/Sections/Datas'
//...
function BannerCheckPage(props) {
    const s3path= 'https://seonhwi.s3.amazonaws.com/';
    const [BannerEvent, setBannerEvent] = useState([])
    const [SearchTerms, setSearchTerms] = useState("")
    const [Filters, setFilters] = useState({
        bannerPart:[],
        sortBy:[],
    })
    useEffect(() => {
        const variables = {
            filters: Filters
        }
        getBanners(variables)
    }, [])

    const updateSearchTerm = (newSearchTerm) => {
        const variables = {
            filters: Filters,
            searchTerm : newSearchTerm
        }
        setSearchTerms(newSearchTerm);
        getBanners(variables)
    }
  
    const getBanners = (variables) => {
        axios.post('/api/bannerPost/getBannerList',variables)
        .then(response => {
            if(response.data.success){
                console.log("banner data")
                console.log(response.data.banners)
                //여기 바꿔야될듯..?
                if(response.data.length>0){
                    setBannerEvent([...BannerEvent, ...response.data.banners])
                }else{
                  setBannerEvent(response.data.banners)
                }
  
            }else{
                alert('Failed to fetch banner images')
            }
        })
    }


    const deleteHandler = (value) =>{
        axios.post('/api/bannerPost/deleteBanner', value)
        .then(response => {
            if(response.data.success){
                alert("배너삭제완료")
                props.history.push("/adminpage")
                props.history.push("/banner/revise")
                //여기 바꿔야될듯..?
            }else{
                alert('Failed to delete banner')
            }
        })
    }
    const showFilteredResults = (filters) => {

        const variables = {
            filters: filters
        }
            getBanners(variables)
    }
    const handleFilters = (filters, cate) => {
        
        const newFilters = {...Filters}
        
        newFilters[cate] = filters
        //있다가 할 것

        showFilteredResults(newFilters)
        setFilters(newFilters)
    }

    const renderCards = BannerEvent.map((item, index) => {
        return (    
                        <div>
                        <Item style={{display:'flex', marginBottom: '30px'}}>
                            <Item.Image size='small' src={`${s3path}${item.images[0]}`} />
                            <Item.Content>
                                <Item.Header>{item.title}</Item.Header>
                                <Item.Extra>
                                    <Button primary floated='right' onClick={() => {deleteHandler(item)}}>삭제</Button>
                                </Item.Extra>
                            </Item.Content>
                            </Item>
                        </div>
                       
                )
    })

    return (
        <div id= 'wrap'>
           <Header/>
            <div>
                <h1>배너관리</h1>
                
                <h2>배너 유효기간은 업로드일부터 5분입니다. (테스트를 위해 짧게 함)</h2>
                {/*Filter */}
                <div style={{display:"flex", justifyContent:'space-between'}}>
                    <div style={{display:"flex"}}>
                        <Dropdown
                            list = {bannerPart}
                            name = {"Filter by Category"}
                            handleFilters = {filters => handleFilters(filters, "bannerPart")}
                        />
                        <Sort list= {sortTime}
                            handleFilters = {filters => handleFilters(filters, "sortBy")}/>
                    </div>
                    
                        <SearchBar refreshFunction={updateSearchTerm}/>
                </div>
                
                    {BannerEvent.length === 0?
                        <div style={{display: 'flex', height: '300px', justifyContent: 'center', alignItems: 'Center'}}>
                            <h2>No post yet...</h2>
                        </div> :
                        <div style={{width: '80%', margin: '3rem auto'}}>
                            <Item.Group>
                                {renderCards}
                            </Item.Group>
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
export default withRouter(BannerCheckPage)