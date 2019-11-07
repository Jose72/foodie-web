import React from "react";
import axios from "axios";
import { API_URL }  from '../utils/Config'

class Auth extends React.Component {

    static login(username, password) {

        //TODO: remove this
        if (username === "admin" && password === "admin"){
            return new Promise(function(resolve, reject) {
                // call resolve if the method succeeds
                localStorage.setItem('token', 'admin_token');
                console.log("Login successful");
                resolve({status: true, text: 'Login successful'});
            })
        } else {
            return axios.post(API_URL + 'auth/', {username, password})
                .then(res => {
                    if (res.ok) {
                        let data = res.json();
                        localStorage.setItem('token', data['token']);
                        console.log("Loggin successful");
                    } else {
                        return Promise.reject(res.status.toString() + ': ' + res.statusText)
                    }
                })
                .catch(error => {
                    console.log(error);
                    return Promise.reject(error)
                })
        }
    }

    static logout(){
        localStorage.removeItem('token');
        console.log("Logout")
    }

    static isAuthenticated(){
        return (localStorage.getItem('token') != null)
    }

    static getToken() { return localStorage.getItem('token')}

}

export {Auth}
