import Header from '../../Header/Header'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { Breadcrumb, List } from 'semantic-ui-react'


function SiteMap(props) {
    const dispatch = useDispatch();

    return (
        <div>
            <div>
                <Header />
            </div>
            <div>
                <div > <h1>사이트맵</h1> </div>
                <List>
                    <List.Item as='a'>
                        <Breadcrumb>
                            <Breadcrumb.Section link>
                                <Link to="/">Home</Link>
                            </Breadcrumb.Section>

                        </Breadcrumb>
                    </List.Item>
                    <List.Item as='a'>
                        <Breadcrumb>
                            <Breadcrumb.Section link>
                                <Link to="/">Home</Link>
                            </Breadcrumb.Section>
                            <Breadcrumb.Divider />
                            <Breadcrumb.Section link>
                                <Link to="/search">SHOP</Link>
                            </Breadcrumb.Section>
                        </Breadcrumb>
                    </List.Item>
                    <List.Item as='a'>
                        <Breadcrumb>
                            <Breadcrumb.Section link>
                                <Link to="/">Home</Link>
                            </Breadcrumb.Section>
                            <Breadcrumb.Divider />
                            <Breadcrumb.Section link>
                                <Link to="/search">SHOP</Link>
                            </Breadcrumb.Section>
                        </Breadcrumb>
                    </List.Item>
                </List>
            </div>
        </div>
    )
}

export default withRouter(SiteMap)