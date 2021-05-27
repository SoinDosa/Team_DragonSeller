import React, { Component } from 'react'
import { createMedia } from '@artsy/fresnel'
import PropTypes from 'prop-types'
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Segment,
  Sidebar,
  Visibility,
  Dropdown,
} from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import '../style/footer.css'

const FixedMenuLayout = () => (
  <div>
    {/* <Menu fixed='top' inverted>
        <Container>
          <Menu.Item as='a' header>
            <Image size='mini' src='/logo.png' style={{ marginRight: '1.5em' }} />
            Project Name
          </Menu.Item>
          <Menu.Item as='a'>Home</Menu.Item>
  
          <Dropdown item simple text='Dropdown'>
            <Dropdown.Menu>
              <Dropdown.Item>List Item</Dropdown.Item>
              <Dropdown.Item>List Item</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Header>Header Item</Dropdown.Header>
              <Dropdown.Item>
                <i className='dropdown icon' />
                <span className='text'>Submenu</span>
                <Dropdown.Menu>
                  <Dropdown.Item>List Item</Dropdown.Item>
                  <Dropdown.Item>List Item</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown.Item>
              <Dropdown.Item>List Item</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Container>
      </Menu> */}



    <Segment inverted vertical style={{ margin: '0em 0em 0em', padding: '3em 0em 3em' }}>
      <Image centered size='large' src='https://i.ibb.co/G31bqkJ/TEAM.png' />
      <Container textAlign='center'>
        <Divider inverted section />
        <List horizontal inverted divided link size='small'>

          <List.Item as='a'>
            <Link to="/sitemap">사이트맵</Link>
          </List.Item>
          <List.Item as='a'>
            <Link to="/policy">이용약관</Link>
          </List.Item>
          <List.Item as='a'>
            <Link to="/privacy">개인정보처리방침</Link>
          </List.Item>
          <List.Item as='a' >
            <Link to="/teaminfo">팀 정보</Link>
          </List.Item>
        </List>
        <p>
          서울과학기술대학교 컴퓨터공학과 소프트웨어공학 19팀 용팔이
              </p>
      </Container>
    </Segment>
  </div>
)

export default FixedMenuLayout