import React from "react";
import { API_URL }  from './Config'

class Auth extends React.Component {
    //static loggedIn = false;

    static login(username, password) {
        console.log("Login");
        if (username === 'admin' && password === 'admin') {
            localStorage.setItem('token', JSON.stringify('token'));
            //Auth.loggedIn = true;
            console.log("Logged");
        } else {
            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'},
                body: JSON.stringify({username, password})
            };
            console.log(requestOptions);
            return fetch(API_URL, requestOptions)
                .then(res => {
                    if (res.ok) {
                        return res.json()
                    } else {
                        console.log(res);
                        throw Error(res.statusText);
                    }
                })
                .then (data => {
                    //should check for token field
                    console.log(data);
                    localStorage.setItem('token', data['token']);
                    console.log("Loggin successful");
                })
                .catch(error => {
                    console.log(error);
                    return false
                })
        }
    }

    static logout(){
        //Auth.loggedIn = false;
        localStorage.removeItem('token');
        console.log("Logout")
    }

    static isAuthenticated(){
        //return this.loggedIn
        return (localStorage.getItem('token') != null)
    }

    getToken() { return localStorage.getItem('token')}

}

export {Auth}
