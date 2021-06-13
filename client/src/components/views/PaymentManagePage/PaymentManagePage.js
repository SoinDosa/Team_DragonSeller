import SearchBar from '../SearchBar/SearchBar'
import React, { useEffect,useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Item ,Card, Pagination} from 'semantic-ui-react'
import Axios from 'axios';
import { withRouter } from 'react-router-dom';
import Header from '../Header/Header';
import axios from 'axios';
import Sort from '../SearchPage/Sections/Sort'
import {payment} from '../SearchPage/Sections/Datas'
import DeliveryStep from '../HistoryPage/DeliveryStep'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';

const selectionRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
};

function PaymentManagePage(props) {
    const [SearchTerms, setSearchTerms] = useState("")
    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(8)
    const [Products, setProducts] = useState([])
    //post사이즈가 loadmore버튼 더이상 생기게 할 거 없으면 숨겨줌.
    const [ActivePage, setActivePage] = useState(1)
    const [Allpage, setAllpage] = useState(1)
    const [Filters, setFilters] = useState({
        sortBy: [],
    })

  
    
    const updateSearchTerm = (newSearchTerm) => {
        const variables = {
            skip : 0,
            limit: Limit,
            filters: Filters,
            searchTerm : newSearchTerm
        }
        setSkip(0)
        setSearchTerms(newSearchTerm);
        getPayment(variables)
    }

    useEffect(() => {
        const variables = {
            skip: Skip,
            limit: Limit,
            filters: Filters
        }
        getPayment(variables)
    }, [])

    const getPayment = (variables) => {
        Axios.post('/api/orderlist/getPayment',variables)
        .then(response => {
            if(response.data.success){
                //여기 바꿔야될듯..?
                if(variables.loadMore){
                    setProducts([...Products, ...response.data.datas])
                }else{
                    setProducts(response.data.datas)
                }
                console.log(Products)
                setAllpage(response.data.allPage)
            }else{  
                alert('Failed to fetch banner images')
            }
        })
    }

    //데이터 더 보여줌.
    //limit: fetch될 데이터 수 제한 위에서 skip은 0 limit은 8로 초기화
    //SKIP and LIMIT MONGODB method 사용

    const handlePaginationChange = (e, value) => {
        let skip = (value.activePage-1)*Limit;
        const variables = {
            skip : skip,
            limit: Limit,
        }
        getPayment(variables)
        setSkip(skip)
        setActivePage(value.activePage);
    }
    const deliveryHander = (value) => {
        axios.post('/api/orderlist/delivery', value)
        .then(response => {
            if(response.data.success){
                alert("배송시작")
                props.history.push("/adminpage")
                props.history.push("/payment")
            }
        })
    }
    const completeHandler = (value) => {
        axios.post('/api/orderlist/deliveryComplete', value)
        .then(response => {
            if(response.data.success){
                alert("배송완료")
                props.history.push("/adminpage")
                props.history.push("/payment")
            }
        })
    }

    const deleteHandler = (value) =>{
        axios.post('/api/orderlist/deletePayment', value)
        .then(response => {
            if(response.data.success){
                alert("삭제완료")
                props.history.push("/adminpage")
                props.history.push("/payment")
                //여기 바꿔야될듯..?
            }else{
                alert('Failed to delete product')
            }
        })
    }
    
    const renderCards = Products.map((item, index) => {
        console.log(item)
        return (
            <div>
            <Item style={{display:'flex', marginBottom: '30px', borderBottom:'solid #A4A4A4'}}>
            <Item.Content>
                <Item.Header>{item[0][0].name}</Item.Header>
                <Item.Description>
                <span>상세주소: {item[1].line1}</span>    
                    {item[1].line2}
                </Item.Description>
                <Item.Description>
                <span>제품 구매날짜:{item[4]}</span>
                </Item.Description>
                {(item[2]).map((purchase)=>{
                    return (
                        <Item.Description style={{borderBottom:'solid #D8D8D8'}}>
                            <div>
                                    <span>제품명: {purchase.name} <span>{item[5]===2 || item[5]===3? 
                                    <Link to={`/product/${purchase.id}`}><Button primary floated='right'>후기확인</Button></Link> :null}</span>
                                    </span>
                                    <br/>
                                    <span>가격{purchase.price}</span>
                                    <br/>
                                    <span>수량 : {purchase.quantity}</span>
                                </div>
                        </Item.Description>
                        )}
                    )
                })
                <Item.Description>
                    <span>계산금액: {item[6]}</span>
                </Item.Description>
                <DeliveryStep step={item[5]}/>
                     <Item.Extra>
                    {
                    item[5]===0 ?
                        <Button onClick={() => {deliveryHander(item)}}>배송하기</Button> : null
                    }
                    {item[5]===1 ?
                        <Button onClick={() => {completeHandler(item)}}>배송완료</Button>
                        : null
                    }
                        <Button primary floated='right' onClick={() => {deleteHandler(item)}}>삭제</Button>
                    </Item.Extra>
                   
                
            </Item.Content>
            </Item>
            </div>
            )
    })

    //필터처리한 품목들 보여줌.
    const showFilteredResults = (filters) => {

        const variables = {
            skip : 0,
            limit: Limit,
            filters: filters
        }
            getPayment(variables)
            setSkip(0)
    }


    //부모 컴포넌트에 전달역할
    const handleFilters = (filters, cate) => {
        
        let arr = []
        const newFilters = {...Filters}
        
        newFilters[cate] = filters
        //있다가 할 것
       if(cate === "sortBy"){
            newFilters[cate] = arr.concat([filters])
        }

        showFilteredResults(newFilters)
        setFilters(newFilters)
    }
    function handleSelect(ranges){
        console.log(ranges);
      }

    return (
        
        <div>
            <Header/>
            <DateRangePicker
             ranges={[selectionRange]}
             onChange={handleSelect}/>
            <div style={{display:'flex', justifyContent:'space-between'}}>
                {/* Filter
                <div style={{display:'flex'}}>
                <Sort list= {payment}
                    handleFilters={filters => handleFilters(filters, "sortBy")}/>
                </div>
                {/*Search */}
                {/* <div style={{display:'flex', justifyContent:'flex-end'}}>
                    <SearchBar
                    refreshFunction={updateSearchTerm}        
                    />
                </div>   */}
            </div>
            

                
            
            

        {Products.length === 0?
            <div style={{display: 'flex', height: '300px', justifyContent: 'center', alignItems: 'Center'}}>
                <h2>No post yet...</h2>
            </div> :
            <div style={{width: '75%', margin: '3rem auto'}}>
                <Item.Group>
                    {renderCards}
                </Item.Group>  
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

export default withRouter(PaymentManagePage)
