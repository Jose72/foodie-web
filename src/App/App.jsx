import React from 'react';
import ReactDOM from "react-dom";
import './App.css';
import { LoginPage } from '../Login'
import { DeliveriesPage } from "../Deliveries";
import { DeliveryAdd } from "../Deliveries";
import { DeliveryPage } from "../Deliveries";
import { DeliveryModify } from "../Deliveries";
import { MenuPage } from '../MenuPage'
import { HomePage } from '../HomePage'
import { BrowserRouter, Switch, Route, Link, Redirect } from 'react-router-dom';
import { ProtectedRoute } from '../utils/ProtectedRoute'
import { PublicRoute } from '../utils/PublicRoute'


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
              <ProtectedRoute exact path="/menu" component={MenuPage} />
              <ProtectedRoute exact path="/deliveries" component={DeliveriesPage} />
              <ProtectedRoute exact path="/deliveries/add" component={DeliveryAdd} />
              <ProtectedRoute exact path="/delivery/:id" component={DeliveryPage} />
              <ProtectedRoute exact path="/delivery/modify/:id" component={DeliveryModify} />
              <Route component={NotFound} />
            </Switch>
        </div>
        </BrowserRouter>
      </div>
    )
    }
  
}

export {App};
