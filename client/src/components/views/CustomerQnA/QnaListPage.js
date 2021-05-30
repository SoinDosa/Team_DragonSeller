import React, { useEffect, useState } from 'react'
import { Button, Item,Pagination } from 'semantic-ui-react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import Sort from '../SearchPage/Sections/Sort'
import Header from '../Header/Header';
import { requirePart, sortTime } from '../SearchPage/Sections/Datas'
//...
function QnaListPage(props) {
    const s3path = 'https://seonhwi.s3.amazonaws.com/';
    const [RequireEvent, setRequireEvent] = useState([])
    const [SearchTerms, setSearchTerms] = useState("")
    const [Allpage, setAllpage] = useState(1)
    const [Limit, setLimit] = useState(8)
    const [ActivePage, setActivePage] = useState(0)
    const [Skip, setSkip] = useState(0)
    const [checkAdmin, setcheckAdmin] = useState(false)
    const [Filters, setFilters] = useState({
        requirePart: [],
        sortBy: [],
    })
    useEffect(() => {
        const variables = {
            skip : Skip,
            limit: Limit,
            filters: Filters,
        }
        getRequires(variables)
        axios.get('/api/users/auth')
        .then((response)=>{
            if(response.data){
                setcheckAdmin(response.data.isAdmin)
            }
        } )
    }, [])

    const updateSearchTerm = (newSearchTerm) => {
        const variables = {
            filters: Filters,
            searchTerm: newSearchTerm
        }
        setSearchTerms(newSearchTerm);
        getRequires(variables)
    }
    const handlePaginationChange = (e, value) => {
        let skip = (value.activePage-1)*Limit;
        const variables = {
            skip : skip,
            limit: Limit,
            filters: Filters,
        }
        getRequires(variables)
        setSkip(skip)
        setActivePage(value.activePage);
    }

    const getRequires = (variables) => {
        axios.post('/api/require/getRequireList', variables)
            .then(response => {
                if (response.data.success) {
                    console.log("require data")
                    console.log(response.data.requires)
                    //여기 바꿔야될듯..?
                    if (response.data.loadMore) {
                        setRequireEvent([...RequireEvent, ...response.data.requires])
                    } else {
                        setRequireEvent(response.data.requires)
                    }
                    setAllpage(response.data.allPage)
                } else {
                    alert('Failed to fetch require images')
                }
            })
    }


    const showFilteredResults = (filters) => {

        const variables = {
            filters: filters
        }
        getRequires(variables)
    }
    const handleFilters = (filters, cate) => {

        const newFilters = { ...Filters }

        newFilters[cate] = filters
        //있다가 할 것

        showFilteredResults(newFilters)
        setFilters(newFilters)
    }

    const renderCards = RequireEvent.map((item, index) => {
        return (
            <div>
                <Item style={{ display: 'flex', marginBottom: '30px' }}>
                    <Item.Content>
                        <Item.Header><Link to={`./qnalist/${item._id}`}>{item.title}</Link></Item.Header>
                        <Item.Description>{`${new Date(item.createAt)}`}</Item.Description>
                        <Item.Description>{item.comment.length>0 ? <span>답변완료</span> : <div>답변대기</div>}</Item.Description>
                        <Item.Extra>{checkAdmin ? <Link to=""><Button>답변하기</Button></Link> : null}</Item.Extra>
                    </Item.Content>
                </Item>
            </div>

        )
    })

    return (
        <div id='wrap'>
            <Header />
            <div>
                <h1>문의사항 리스트</h1>
                {/*Filter */}
                <div style={{ display: "flex", justifyContent: 'space-between' }}>
                    <div style={{ display: "flex" }}>
                        <Sort list={sortTime}
                            handleFilters={filters => handleFilters(filters, "sortBy")} />
                    </div>
                </div>

                {RequireEvent.length === 0 ?
                    <div style={{ display: 'flex', height: '300px', justifyContent: 'center', alignItems: 'Center' }}>
                        <h2>No post yet...</h2>
                    </div> :
                    <div style={{ width: '80%', margin: '3rem auto' }}>
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
        </div>
    )
}

export default withRouter(QnaListPage)