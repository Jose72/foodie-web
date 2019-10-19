import React from "react";
import { API_URL }  from './Config'

class Auth extends React.Component {

    static login(username, password) {

        //TODO: remove this
        if (username === "admin" && password === "admin"){
            return new Promise(function(resolve, reject) {
                // call resolve if the method succeeds
                localStorage.setItem('token', 'admin_token');
                console.log("Loggin successful");
                resolve({status: true, text: 'Login successful'});
            })
        }

        console.log("Login");
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'},
            body: JSON.stringify({username, password})
        };
        console.log(requestOptions);
        return fetch(API_URL + 'auth/', requestOptions)
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
