import React,{Component,useState,useEffect} from 'react'
import {Icon ,Radio, Checkbox ,Accordion, Menu ,Form} from 'semantic-ui-react'

const category = [
    {
        "_id": 1,
        "name": "CPU",
    },
    {
        "_id": 2,
        "name": "Mainboard",
    },
    {
        "_id": 3,
        "name": "RAM",
    },
    {
        "_id": 4,
        "name": "GraphicCard",
    },
    {
        "_id": 5,
        "name": "SSD",
    },
    {
        "_id": 6,
        "name": "HDD",
    },
]
const price= [
    {
        "_id": 1,
        "name": "~500$"
    },
    {
        "_id": 2,
        "name": "500$~1000$"
    },
    {
        "_id": 3,
        "name": "1000$~2000$"
    },
    {
        "_id": 4,
        "name": "2000$~3000$"
    },
    {
        "_id": 5,
        "name": "3000$~4000$"
    },
    {
        "_id": 6,
        "name": "4000$이상"
    }
]

export default class AccordionExampleMenu extends Component {
    state = { 
        activeIndex:0,
        checkedCategory:[],
        checkedPrice:[]
        }

    
    //category,price 내려가게해서 보여줌.    
    handleClick = (e, value) => {
        const { index } = value
        const { activeIndex } = this.state
        const newIndex = activeIndex === index ? -1 : index
    
        this.setState({ activeIndex: newIndex })
        console.log(this.state.activeIndex)
    }

    //price중 하나 클릭시에 반응하게.
    handleTogglePrice = (e, val) => {
        const {checkedPrice} = this.state;
        const currentIndex = checkedPrice.findIndex( obj => obj.value.name === val.value.name)
        const newChecked = [...checkedPrice];
        if(currentIndex===-1){
            newChecked.push(val);
        }
        else {
            newChecked.splice(currentIndex,1)
        }
        this.setState({checkedPrice:newChecked});
        this.props.handleFilters(newChecked)
    }

    //category중 하나 클릭시에 반응.
    handleToggleCategory = (e, value) => {
        this.setState({checkedCategory: [value]})
        console.log(this.state.checkedCategory)
    }

    //Radio, Checkbox form
    CategoryForm = (
        <Form>
            <Form.Group radio grouped>
                {
                    category.map((value, index) => (
                        <React.Fragment key={index}>
                            <Form.Field radio>
                                <Radio label={value.name} name='category' value={value.name} onChange={this.handleToggleCategory}/>
                            </Form.Field>
                        </React.Fragment>
                    ))
                }
            </Form.Group>
        </Form>
    )

    PriceForm = (
        <Form>
            <Form.Group grouped>
                {
                    price.map((val, index) => (
                        <React.Fragment key={index}>
                            <Form.Field>
                                <Checkbox label={val.name} value={val} name='price' onChange={this.handleTogglePrice}/>
                            </Form.Field>
                        </React.Fragment>
                    ))
                }
                
            </Form.Group>
        </Form>
    )


    render() {
      const { activeIndex } = this.state
  
      return (
        <div style={{display:'flex'}}>
            <Accordion as={Menu} vertical>
                <Menu.Item>
                    <Accordion.Title
                        active={activeIndex === 0}
                        content='category 설정'
                        index={0}
                        onClick={this.handleClick}
                    />
            <Accordion.Content active={activeIndex === 0} content={this.CategoryForm}/>
                </Menu.Item>
            </Accordion>

            <Accordion as={Menu} vertical>
                <Menu.Item>
                    <Accordion.Title
                    active={activeIndex === 1}
                    content='Price 범위'
                    index={0}
                    onClick={this.handleClick}
                    />
                    <Accordion.Content active={activeIndex === 0} content={this.PriceForm} />
                </Menu.Item>
            </Accordion>
        </div>
        
    
      )
    }
  }
