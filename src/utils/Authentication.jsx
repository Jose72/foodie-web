import React from "react";

class Auth extends React.Component {

    //static loggedIn = false;

    static login(username, password) {
        console.log("Login");
        if (username === 'admin' && password === 'admin') {
            localStorage.setItem('token', JSON.stringify('token'));
            //Auth.loggedIn = true;
            console.log("Logged")
        } else {
            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({username, password})
            };
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
