import React, { Component } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Nav from './components2/Smart-Can-Nav/Navigation.jsx';
import Home from './components2/Smart-Can-Dash/DashBoard';
import Login from './components2/Smart-Can-Auth/Login-SmartCan';
import Scanner from './components2/Smart-Can-Code/Scan';
import About from './components2/Smart-Can-Dash/About-Smart-Can';
import ErrorPg from './components2/Smart-Can-Dash/ErrorBound';
import Profile from './components2/Smart-Can-Accout/Users';
import SignUp from './components2/Smart-Can-Auth/SignUp-SmartCan'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Nav></Nav>
          <br />
         <Switch>
            <Route exact path='/' component={ Home } />
            <Route path='/login' component={ Login } />
            <Route path='/scan' component={ Scanner } />
            <Route path='/about' component={ About } />
            <Route path='/profile' component={ Profile } />
            <Route path='/signup' component={ SignUp } />
            <Route component = {ErrorPg}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
