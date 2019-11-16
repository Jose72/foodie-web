import React from "react";
import { Auth } from './Authentication'


class ApiErrorHandler extends React.Component {

    static handle(res){
        console.log("Error 422");
        if(res.status === 422){
            Auth.logout();
        }
        return Promise.reject(res.status.toString() + ': ' + res.statusText)
    }
}

export {ApiErrorHandler}