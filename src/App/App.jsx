import React from 'react';
import ReactDOM from "react-dom";
import './App.css';
import { LoginPage } from '../LoginPage'
import { UsersPage } from '../UsersPage'
import { MenuPage } from '../MenuPage'
import { HomePage } from '../HomePage'
import { BrowserRouter, Switch, Route, Link, Redirect} from 'react-router-dom';
import { ProtectedRoute } from '../utils/ProtectedRoute'
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
    return (
      <div>
        <BrowserRouter>
        <div>
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route path="/login" component={LoginPage} />
              <ProtectedRoute path="/menu" component={MenuPage} isAuthenticated={Auth.isAuthenticated} />
              <ProtectedRoute path="/users" component={UsersPage} isAuthenticated={Auth.isAuthenticated} />
              <Route component={NotFound} />
            </Switch>
        </div>
        </BrowserRouter>
      </div>
    )
    }
  
}

export {App};
