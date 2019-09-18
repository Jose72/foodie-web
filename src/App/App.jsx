import React from 'react';
import ReactDOM from "react-dom";
import './App.css';
import { LoginPage } from '../LoginPage'
import { UsersPage } from '../UsersPage'
import { MenuPage } from '../MenuPage'
import { HomePage } from '../HomePage'
import { BrowserRouter, Switch, Route, Link, Redirect} from 'react-router-dom';
import { ProtectedRoute } from '../utils/ProtectedRoute'
import { PublicRoute } from '../utils/PublicRoute'
import { Auth } from '../utils/Authentication'

const NotFound = () => <div>Not found</div>

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        currentUser: null
    };
  }

  logout() {
    Auth.logout();
    this.context.history.push('/login')
  }

  render() {
    console.log(Auth.isAuthenticated);
    return (
      <div>
        <BrowserRouter>
        <div>
            <Switch>
              <PublicRoute exact path="/" component={HomePage} />
              <PublicRoute path="/login" component={LoginPage} />
              <ProtectedRoute path="/menu" component={MenuPage} />
              <ProtectedRoute path="/users" component={UsersPage} />
              <Route component={NotFound} />
            </Switch>
        </div>
        </BrowserRouter>
      </div>
    )
    }
  
}

export {App};
