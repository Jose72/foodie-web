import React from 'react';
import ReactDOM from "react-dom";
import './App.css';
import { LoginPage } from '../LoginPage'
import { UsersPage } from '../UsersPage'
import { ShopsPage } from "../Shops";
import { ShopAdd } from "../Shops";
import { ShopModify } from "../Shops";
import { ShopPage } from "../Shops";
import { MenuPage } from '../MenuPage'
import { HomePage } from '../HomePage'
import { BrowserRouter, Switch, Route, Link, Redirect } from 'react-router-dom';
import { ProtectedRoute } from '../utils/ProtectedRoute'
import { PublicRoute } from '../utils/PublicRoute'
import { Auth } from '../services/Authentication'


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
              <ProtectedRoute exact path="/shops" component={ShopsPage} />
              <ProtectedRoute exact path="/shops/add" component={ShopAdd} />
              <ProtectedRoute exact path="/shop/:id" component={ShopPage} />
              <ProtectedRoute exact path="/shop/modify/:id" component={ShopModify} />
              <Route component={NotFound} />
            </Switch>
        </div>
        </BrowserRouter>
      </div>
    )
    }
  
}

export {App};
