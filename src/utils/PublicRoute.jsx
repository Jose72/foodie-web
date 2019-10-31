import React from 'react';
import { Auth } from '../services/Authentication'
import { Route, Redirect} from 'react-router-dom';

export const PublicRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props =>
        Auth.isAuthenticated() ? (
            <Redirect to={{pathname: "/menu"}} />
        ) : (
            <Component {...props} />
        )
    }
    />
);