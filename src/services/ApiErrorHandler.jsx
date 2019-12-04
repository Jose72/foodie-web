import React from "react";
import { Auth } from './Authentication'


class ApiErrorHandler extends React.Component {

    static handle(res){

        let err_msg = res.statusText;

        if(res.status === 422){
            Auth.logout();
            window.location.reload();
            err_msg = "Authentication Error - Login Out"
        }
        return Promise.reject(err_msg)
    }
}

export {ApiErrorHandler}