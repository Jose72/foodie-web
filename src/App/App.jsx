import React from 'react';
import ReactDOM from "react-dom";
import logo from './logo.svg';
import './App.css';
import { LoginPage } from '../LoginPage'
import { BrowserRouter, Router, Switch, Route, Link, Redirect} from 'react-router-dom';

const Home = () => (
  <div className='App'>
    <header className='App-header'>
      <h5>
        Foodie Web   
      </h5>
      
    </header>
    <div className='App-content'>
      <Link className='Link' to="/login">Login</Link>
      <p>
      </p>
    </div>
    <footer className='App-footer'>
      <p>
        <small>&copy; Copyright 2019. Foodie Inc.</small>
      </p>
    </footer>
  </div>
)

const NotFound = () => <div>Not found</div>

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        currentUser: null
    };
}

  render() {
    return (
      <div>
        <BrowserRouter>
        <div>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/login" component={LoginPage} />
              <Route component={NotFound} />
            </Switch>
        </div>
        </BrowserRouter>
      </div>
    )
  }
}

export {App};
