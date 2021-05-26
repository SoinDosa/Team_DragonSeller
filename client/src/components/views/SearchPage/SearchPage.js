import SearchBar from '../SearchBar/SearchBar'
import React, { useEffect,useState } from 'react'
import { Link } from 'react-router-dom'
import { Grid, Button, Input, Image , Card, Pagination} from 'semantic-ui-react'
import Axios from 'axios';
import { withRouter } from 'react-router-dom';
import CheckBox from './Sections/CheckBox'
import Dropdown from './Sections/Dropdown'
// import '../style/LPS.css';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Sidebar from '../SideBar/SideBar';
import axios from 'axios';
import Sort from './Sections/Sort'
import {sortBy, price, computerPart} from './Sections/Datas'

const SearchPage = (props) =>{
    const [SearchTerms, setSearchTerms] = useState("")
    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(8)
    const [Products, setProducts] = useState([])
    //post사이즈가 loadmore버튼 더이상 생기게 할 거 없으면 숨겨줌.
    const [ActivePage, setActivePage] = useState(1)
    const [Allpage, setAllpage] = useState(1)
    const [Filters, setFilters] = useState({
        computerPart: [],
        price: [],
        sortBy: [],
    })
    const s3path = 'https://seonhwi.s3.amazonaws.com/'


    
  
    
    const updateSearchTerm = (newSearchTerm) => {
        const variables = {
            skip : 0,
            limit: Limit,
            filters: Filters,
            searchTerm : newSearchTerm
        }
        setSkip(0)
        setSearchTerms(newSearchTerm);
        getProducts(variables)
    }

    useEffect(() => {
        const variables = {
            skip: Skip,
            limit: Limit,
            filters: Filters
        }
        getProducts(variables)
    }, [])

    const getProducts = (variables) => {
        Axios.post('api/product/getProducts', variables)
        .then(response => {
            //searchPage에서 바뀐부분.
            console.log(response.data)
            if(response.data.success){
                if(variables.loadMore){
                    //여기 바꿔야될듯..?
                    setProducts([...Products, ...response.data.products])
                }else{
                    setProducts(response.data.products)
                }
                console.log(response.data.allPage)
                setAllpage(response.data.allPage)
                console.log("length: "  + Allpage)

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
        setSkip(skip)
        setActivePage(value.activePage);
    }


    
    const renderCards = Products.map((product, index) => {
        return (
               <Grid.Column columns={4} width={4} key={index}>
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

    //필터처리한 품목들 보여줌.
    const showFilteredResults = (filters) => {

        const variables = {
            skip : 0,
            limit: Limit,
            filters: filters
        }
            getProducts(variables)
            setSkip(0)
    }

    //price 
    const handlePrice = (value) => {
        const data = price;
        let array= [];

        for( let key in data){
            if(data[key]._id === parseInt(value, 10)){
                array = data[key].array;
            }
        }
        return array
    }


    //부모 컴포넌트에 전달역할
    const handleFilters = (filters, cate) => {
        
        let arr = []
        const newFilters = {...Filters}
        
        newFilters[cate] = filters
        //있다가 할 것
        if(cate === "price"){
            let priceValues = handlePrice(filters)
            newFilters[cate] = priceValues
        }else if(cate === "sortBy"){
            newFilters[cate] = arr.concat([filters])    
        }

        showFilteredResults(newFilters)
        setFilters(newFilters)
    }

    return (
        
        <div>
            <Header/>
            <div style={{display:'flex', justifyContent:'space-between'}}>
                {/*Filter */}
                <div style={{display:'flex'}}>
                <CheckBox
                    list={computerPart} 
                    handleFilters={filters => handleFilters(filters, "computerPart")}
                />
                
                <Dropdown
                    list = {price}
                    name = {"Filter by Price"}
                   handleFilters={filters => handleFilters(filters, "price")}
                />
                <Sort list= {sortBy}
                    handleFilters={filters => handleFilters(filters, "sortBy")}/>
                </div>
                {/*Search */}
                <div style={{display:'flex', justifyContent:'flex-end'}}>
                    <SearchBar
                    refreshFunction={updateSearchTerm}        
                    />
                </div>  
            </div>
            

                
            
            

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
               <Pagination defaultActivePage={1} totalPages={Allpage%8!==0 || Allpage===0 ? Math.ceil(Allpage/8) : Allpage/8} onPageChange={handlePaginationChange} />
            </div>
        }
        

        </div>

    )
}

export default withRouter(SearchPage)