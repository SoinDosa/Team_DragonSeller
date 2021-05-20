import React,{Component,useState,useEffect} from 'react'
import {Icon ,Radio, Dropdown, Form} from 'semantic-ui-react'



export default class AccordionExampleMenu extends Component {
    state = { 
        sortType : 1,
    }

    handleSort = (value) => {
        const {sortType} = this.state
        this.setState({sortType: value}, () => {
            console.log(this.state.sortType);
        })
        this.props.handleFilters(value)
    }

    //Radio, Checkbox form

    // PriceForm = (
    //     <Form>
    //         <Form.Group grouped>
    //             {
    //                 price.map((val, index) => (
    //                     <React.Fragment key={index}>
    //                         <Form.Field>
    //                             <Radio label={val.name} name='price'  onChange={() => this.handleTogglePrice(val._id)} checked={this.state.checkedPrice===val._id}/>
    //                         </Form.Field>
    //                     </React.Fragment>
    //                 ))
    //             }
                
    //         </Form.Group>
    //     </Form>
    // )


    render() {
      const { activeIndex } = this.state
  
      return (
        <div>
            {/* <Accordion as={Menu} vertical>
                <Menu.Item>
                    <Accordion.Title
                    active={activeIndex === 1}
                    content='Price 범위'
                    index={1}
                    onClick={this.handleClick}
                    />
                    <Accordion.Content active={activeIndex === 1} content={this.PriceForm} />
                </Menu.Item>
            </Accordion> */}
            <Dropdown
                text='SortBy'
                floating    
                labeled
                button
                icon='filter'
                className='icon'
                fluid
            >
                <Dropdown.Menu>
                    <Dropdown.Header icon='tags' content='정렬' />
                    <Dropdown.Divider />
                    {
                        this.props.list.map((val) => (
                            <Dropdown.Item content={val.name} key={val._id} {...val} onClick={() => this.handleSort(val._id)}/>
                        ))
                    }
                </Dropdown.Menu>
            </Dropdown>
        </div>
        
    
      )
    }
  }
