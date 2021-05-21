import { createMedia } from '@artsy/fresnel'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
  Container,
  Menu,
  Segment,
  Visibility,
} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import Axios from 'axios'

const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    mobile: 0,
    tablet: 768,
    computer: 1024,
  },
})


/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */
class DesktopContainer extends Component {
  state = {

  }

  hideFixedMenu = () => this.setState({ fixed: false });
  showFixedMenu = () => this.setState({ fixed: true });

  //메뉴 클릭 시에 원하는 정보 보여줌(서버로부터 데이터 가져옴) + eventHandling
  onClickNavbarHandler = (e,{name}) => {
    

    return this.setState({clickedName: name});
  }

  render() {
    const { children } = this.props
    const { fixed } = this.state
    const {clickedName} = this.state

    return (
      <Media greaterThan='mobile'>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            inverted
            textAlign='center'
            style={{ minHeight: '10%', padding: '0.5em 0em' }}
            vertical
          >
            <Menu
              
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size='large'
            >
              <Container>
                <Menu.Item link ={true} name='home' active={clickedName === 'home'} onClick={this.onClickNavbarHandler}>
                <Link to="/">
                  Home
                </Link>
                </Menu.Item>
                  <Menu.Item as='a' name='shop' onClick={this.onClickNavbarHandler} active={clickedName === 'shop'}><Link to="/search">SHOP</Link></Menu.Item>
                  <Menu.Item position='right'>
                </Menu.Item>
              </Container>
            </Menu>
          </Segment>
        </Visibility>

        {children}
      </Media>
    )
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
}


const ResponsiveContainer = ({ children }) => (
  /* Heads up!
   * For large applications it may not be best option to put all page into these containers at
   * they will be rendered twice for SSR.
   */
  <MediaContextProvider>
    <DesktopContainer>{children}</DesktopContainer>
  </MediaContextProvider>
)

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
}

const Navbar = () => (
  <ResponsiveContainer>
  </ResponsiveContainer>
)

export default Navbar