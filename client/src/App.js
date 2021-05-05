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
import FindID from './components/views/FindPage/FindID'
import FindPasswd from './components/views/FindPage/FindPasswd'
import Auth from './hoc/auth'
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
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/findid" component={Auth(FindID, false)} />
          <Route exact path="/findpasswd" component={Auth(FindPasswd, false)} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
