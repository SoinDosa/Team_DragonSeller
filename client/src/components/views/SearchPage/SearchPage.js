import SearchBar from '../SearchBar/SearchBar'
import React, { useEffect,useState } from 'react'
import { Link } from 'react-router-dom'
import { Grid, Button, Input, Image , Card, Pagination} from 'semantic-ui-react'
import Axios from 'axios';
import { withRouter } from 'react-router-dom';
// import '../style/LPS.css';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Sidebar from '../SideBar/SideBar';
import axios from 'axios';

const s3path = `https://seonhwi.s3.amazonaws.com/`

const SearchPage = (props) =>{
    const [SearchTerms, setSearchTerms] = useState("")
    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(8)
    const [Products, setProducts] = useState([])
    //post사이즈가 loadmore버튼 더이상 생기게 할 거 없으면 숨겨줌.
    const [PostSize, setPostSize] = useState(0)
    const [ActivePage, setActivePage] = useState(1)
    


    
  
    
    const updateSearchTerm = (newSearchTerm) => {
        setSearchTerms(newSearchTerm);
        console.log(SearchTerms);
    }

    useEffect(() => {
        const variables = {
            skip: Skip,
            limit: Limit,
        }
        getProducts(variables)
    }, [])

    const getProducts = (variables) => {
        Axios.post('api/product/getProducts', variables)
        .then(response => {
            if(response.data.success){
                setProducts(response.data.products)
                setPostSize(response.data.postSize)
                console.log(response.data.products)
                console.log(response.data.postSize)

            }else{
                alert('Failed to fetch product datas')
            }
        })
    }

    //데이터 더 보여줌.
    //limit: fetch될 데이터 수 제한 위에서 skip은 0 limit은 8로 초기화
    //SKIP and LIMIT MONGODB method 사용
    //이거 활용해서 앞으로 뒤로가는거 만들겠음.
    const onLoadMore = () =>{

        let skip = Skip + Limit;
        const variables = {
            skip : skip,
            limit: Limit,

        }
        getProducts(variables)
        
        setSkip(skip)

    }
    const handlePaginationChange = (e, value) => {
        let skip = (value.activePage-1)*Limit;
        const variables = {
            skip : skip,
            limit: Limit,

        }
        getProducts(variables)
        console.log(value.activePage);
        setSkip(skip)
        setActivePage(value.activePage)
    }


    //고쳐야됨. responsive랑 배치랑 다 만들어야됨.
    const renderCards = Products.map((product, index) => {
        return (
               <Grid.Column columns={4} width={4} key={index}>
                   
                    <Card
                        image={`${s3path}${product.images[0]}`}
                        header={product.title}
                        description={product.price}
                        style={{margin:'30px 10px', maxwidth: '30px'}}
                    />
               </Grid.Column>     
                )
    })

    return (
        
        <div>
            {/*Filter */}
        
            {/*Search */}
            <SearchBar
            refreshFunction={updateSearchTerm}        
            />

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
        {
            <div style={{ justifyContent: 'center', display: 'flex'}}>
                <Pagination defaultActivePage={1} totalPages={3} onPageChange={handlePaginationChange}/>
                <Button onClick={onLoadMore}>Load More</Button>
            </div>
        }
        

        </div>

    )
}

export default withRouter(SearchPage)


/*
product.js에 올릴 것
router.post('/getProducts', auth ,(req, res) => {

  //mongoDB condition 말하는 것
    let order = req.body.order ? req.body.order: "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);
  
  // data fetch할때 order, ~대로 sorting, 띄우는 수 제한, skip
    Product.find()
      //.populate("Writer")
      .sort([[sortBy, order]])
      .limit(limit)
      .skip(skip)
      .exec((err,products) => {
        if(err) return res.status(400).json({success: false, err})
        res.status(200).json({success:true, products, postSize: products.length})
      })
  })

 */