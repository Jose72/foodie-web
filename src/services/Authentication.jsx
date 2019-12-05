import React from "react";
import axios from "axios";
import { API_URL_LOGIN }  from '../utils/Config'

axios.defaults.headers.common['Content-Type'] =  'application/json';

class Auth extends React.Component {

    static login(username, password) {

        //TODO: remove this
        if (username === "admin" && password === "admin"){
            return new Promise(function(resolve, reject) {
                // call resolve if the method succeeds
                localStorage.setItem('token', 'token');
                resolve({status: true, text: 'Login successful'});
            })
        }

        return axios.post(API_URL_LOGIN,
            {
                email: username,
                password: password
            },
            {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => {
                if (res.status === 200) {
                    localStorage.setItem('token', res.data.token);
                    return 'Login successful';
                } else {
                    return Promise.reject(res.status.toString() + ': ' + res.statusText)
                }
            })
            .catch(error => {
                return Promise.reject(error.toString())
            })
    }

    static logout(){
        localStorage.removeItem('token');
    }

    static isAuthenticated(){
        return (localStorage.getItem('token') != null)
    }

    static getToken() { return localStorage.getItem('token')}

}

export {Auth}
