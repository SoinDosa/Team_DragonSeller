import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import LandingPage from './components/views/LandingPage/LandingPage'
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import UploadProductPage from './components/views/UploadProductPage/UploadProductPage';
import DetailProductPage from './components/views/DetailProductPage/DetailProductPage';
import SearchPage from './components/views/SearchPage/SearchPage';
import CartPage from './components/views/CartPage/CartPage';
import FindIDPage from './components/views/FindPage/FindID';
import FindPWPage from './components/views/FindPage/FindPasswd';
import ChangePWPage from './components/views/FindPage/ChangePasswd';
import UploadBannerPage from './components/views/UploadBannerPage/UploadBannerPage'
import AdminPage from './components/views/AdminPage/AdminPage';
import Auth from './hoc/auth'
import Header from './components/views/Header/Header'
import Footer from './components/views/Footer/Footer'
import UserPage from './components/views/UserPage/UserPage';
import 'semantic-ui-css/semantic.min.css'

function App() {
  return (
    <Router>
      <div>
        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null )  } />
          <Route exact path="/login" component={Auth(LoginPage, false) } />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/userpage" component={Auth(UserPage, true)} />
          <Route exact path="/product/upload" component={Auth(UploadProductPage, true, true)} />
          <Route exact path="/product/:productId" component={Auth(DetailProductPage, null)} />
          <Route exact path="/search" component={SearchPage} />
          <Route exact path="/user/cart" component={Auth(CartPage, true)} />
          <Route exact path="/findId" component={Auth(FindIDPage, false)} />
          <Route exact path="/findPw" component={Auth(FindPWPage, false)} />
          <Route exact path="/changePw" component={Auth(ChangePWPage, true)} />
          <Route exact path="/banner/upload" component={Auth(UploadBannerPage, true, true)} />
          <Route exact path="/adminpage" component={Auth(AdminPage, true, true)} />
        </Switch>
      </div>
      <div>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
