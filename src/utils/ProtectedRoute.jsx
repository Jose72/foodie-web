import React from 'react';
import { Auth } from './Authentication'
import { Route, Redirect} from 'react-router-dom';

export const ProtectedRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props =>
        Auth.isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to={{pathname: "/"}} />
        )
      }
    />
);
