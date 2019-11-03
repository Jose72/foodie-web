import React from 'react';
import ReactDOM from "react-dom";
import './App.css';
import { LoginPage } from '../LoginPage'
import { UsersPage } from '../UsersPage'
import { MenuPage } from '../MenuPage'
import { HomePage } from '../HomePage'
import {StatisticsPage} from "../StatisticsPage";
import { BrowserRouter, Switch, Route, Link, Redirect } from 'react-router-dom';
import { ProtectedRoute } from '../utils/ProtectedRoute'
import { PublicRoute } from '../utils/PublicRoute'
import { Auth } from '../utils/Authentication'


const NotFound = () => <div>Not found</div>;


class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <BrowserRouter>
        <div>
            <Switch>
              <PublicRoute exact path="/" component={HomePage} />
              <PublicRoute path="/login" component={LoginPage} />
              <ProtectedRoute path="/menu" component={MenuPage} />
              <ProtectedRoute path="/users" component={UsersPage} />
              <ProtectedRoute  path="/statistics" component={StatisticsPage} />
              <Route component={NotFound} />
            </Switch>
        </div>
        </BrowserRouter>
      </div>
    )
    }
  
}

export {App};
