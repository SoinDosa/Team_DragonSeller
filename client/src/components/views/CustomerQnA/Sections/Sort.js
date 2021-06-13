import React, { Component, useState, useEffect } from 'react'
import { Dropdown, } from 'semantic-ui-react'



export default class AccordionExampleMenu extends Component {
    state = {
        sortType: 1,
    }

    handleSort = (value) => {
        const { sortType } = this.state
        this.setState({ sortType: value }, () => {
            console.log(this.state.sortType);
        })
        this.props.handleFilters(value)
    }

    render() {
        const { activeIndex } = this.state

        return (
            <div>
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
                                <Dropdown.Item content={val.name} key={val._id} {...val} onClick={() => this.handleSort(val._id)} />
                            ))
                        }
                    </Dropdown.Menu>
                </Dropdown>
            </div>


        )
    }
}