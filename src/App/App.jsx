import React from 'react';
import './App.css';
import { DeliveriesPage } from "../Deliveries";
import { DeliveryAdd } from "../Deliveries";
import { DeliveryModify } from "../Deliveries";
import { LoginPage } from '../LoginPage'
import { ShopsPage } from "../Shops";
import { ShopAdd } from "../Shops";
import { ShopModify } from "../Shops";
import { ShopMenu, ShopMenuAdd, ShopMenuModify } from "../Shops";
import { UsersPage } from '../Users'
import { UserAdd } from '../Users'
import { UserModify} from "../Users";
import { OrdersPage } from "../Orders"
import { MenuPage } from '../MenuPage'
import { HomePage } from '../HomePage'
import { StatisticsPage } from "../StatisticsPage";
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import { ProtectedRoute } from '../utils/ProtectedRoute'
import { PublicRoute } from '../utils/PublicRoute'


const NotFound = () => <div>Not found</div>;


class App extends React.Component {

  render() {
    return (
      <div>
        <BrowserRouter>
        <div>
            <Switch>
              <PublicRoute exact path="/" component={HomePage} />
              <PublicRoute path="/login" component={LoginPage} />
              <ProtectedRoute path="/menu" component={MenuPage} />
              <ProtectedRoute exact path="/statistics" component={StatisticsPage} />
              <ProtectedRoute exact path="/deliveries" component={DeliveriesPage} />
              <ProtectedRoute exact path="/deliveries/add" component={DeliveryAdd} />
              <ProtectedRoute exact path="/delivery/modify/:id" component={DeliveryModify} />
              <ProtectedRoute exact path="/users" component={UsersPage} />
              <ProtectedRoute exact path="/users/add" component={UserAdd} />
              <ProtectedRoute exact path="/user/modify/:id" component={UserModify} />
              <ProtectedRoute exact path="/orders" component={OrdersPage} />
              <ProtectedRoute exact path="/shops" component={ShopsPage} />
              <ProtectedRoute exact path="/shops/add" component={ShopAdd} />
              <ProtectedRoute exact path="/shop/modify/:id" component={ShopModify} />
              <ProtectedRoute exact path="/shop/:shopId/menu" component={ShopMenu} />
              <ProtectedRoute exact path="/shop/:shopId/menu/add" component={ShopMenuAdd} />
              <ProtectedRoute exact path="/shop/:shopId/menu/modify/:foodId" component={ShopMenuModify} />
              <Route component={NotFound} />
            </Switch>
        </div>
        </BrowserRouter>
      </div>
    )
    }
  
}

export {App};
