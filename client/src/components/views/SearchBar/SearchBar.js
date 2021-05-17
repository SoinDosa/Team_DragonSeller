import React,{useState} from 'react'
import { Grid, Header, Segment, Input } from 'semantic-ui-react'
import axios from 'axios'

function SearchBar(props) {
  const [SearchTerms, setSearchTerms] = useState("")


  const onChangeSearch = (event) => {
    setSearchTerms(event.currentTarget.value)

    props.refreshFunction(event.currentTarget.value)
  }

  return (
          <div className="ui search">
            <div className="ui icon input">
              <input className="prompt" type="text" value={SearchTerms} placeholder="Search" onChange={onChangeSearch}/>
              <i className="search icon"></i>
            </div>
          <div className="results"></div>
          </div>
  )
}

export default SearchBar
