import React from "react";
import axios from "axios";
import { API_URL_LOGIN }  from '../utils/Config'

axios.defaults.headers.common['Content-Type'] =  'application/json';

const TOKEN_KEY = 'foodie_token';

class Auth extends React.Component {

    static login(username, password) {

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
                    localStorage.setItem(TOKEN_KEY, res.data.token);
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
        localStorage.removeItem(TOKEN_KEY);
    }

    static isAuthenticated(){
        return (localStorage.getItem(TOKEN_KEY) != null)
    }

    static getToken() { return localStorage.getItem(TOKEN_KEY)}

}

export {Auth}
