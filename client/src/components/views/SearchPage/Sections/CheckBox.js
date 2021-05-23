import React,{Component} from 'react'
import {Icon ,Checkbox ,Accordion, Menu ,Form} from 'semantic-ui-react'


//Product schema에서
export default class AccordionExampleMenu extends Component {
    state = { 
        activeIndex:0,
        checkedComputerPart:[],
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
    handleToggleCategory = (val) => {
        console.log(val)
        const {checkedComputerPart} = this.state;
        const currentIndex = checkedComputerPart.findIndex( obj => obj === val)
        const newChecked = [...checkedComputerPart];
        if(currentIndex===-1){
            newChecked.push(val);
        }
        else {
            newChecked.splice(currentIndex,1)
        }
        this.setState({checkedComputerPart:newChecked});
        this.props.handleFilters(newChecked)
    }


    ComputerPartForm = (
        <Form>
            <Form.Group grouped>
                {
                    this.props.list.map((val, index) => (
                        <React.Fragment key={index}>
                            <Form.Field>
                                <Checkbox label={val.name} name='computerPart' onChange={() => this.handleToggleCategory(val._id)}/>
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
            <Accordion as={Menu} vertical fluid>
                <Menu.Item>
                    <Accordion.Title
                        active={activeIndex === 0}
                        content='category 설정'
                        index={0}
                        onClick={this.handleClick}
                    />
            <Accordion.Content active={activeIndex === 0} content={this.ComputerPartForm}/>
                </Menu.Item>
            </Accordion>
        </div>
        
    
      )
    }
  }
