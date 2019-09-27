import React from "react";
import {API_URL} from "./Config";

const USER_ROUTE = 'user/';
const USERS_ROUTE = 'users/';

class UserComm extends React.Component {

    static getUsers(n, p){
        const requestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'},
        };
        return fetch(API_URL + USERS_ROUTE + '?' + 'page=' + p + '&' + 'number' + n, requestOptions)
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject(res.status.toString() + ': ' + res.statusText)
                }
            })
            .catch(error => {
                console.log(error);
                return Promise.reject(error)
            })
    }

    static deleteUser(id){
        const requestOptions = {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'}
        };
        return fetch(API_URL + USER_ROUTE + id, requestOptions)
            .then(res => {
                if (res.ok) {
                    console.log("Delete Successful");
                } else {
                    return Promise.reject(res.status.toString() + ': ' + res.statusText)
                }
            })
            .catch(error => {
                console.log(error);
                return Promise.reject(error)
            })
    };

    static modifyUser(id, opts){
        const requestOptions = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'},
            body: JSON.stringify({id})
        };
        return fetch(API_URL + USER_ROUTE + id, requestOptions)
            .then(res => {
                if (res.ok) {
                    console.log("Update Successful");
                } else {
                    return Promise.reject(res.status.toString() + ': ' + res.statusText)
                }
            })
            .catch(error => {
                console.log(error);
                return Promise.reject(error)
            })
    }

    static addUser(user, opts){
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'},
            body: JSON.stringify({firstName: user.firstName, lastName: user.lastName,
                                        email: user.email, phone: user.phone, subscription: user.subscription})
        };
        return fetch(API_URL + USER_ROUTE, requestOptions)
            .then(res => {
                if (res.ok) {
                    console.log("Add Successful");
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

export {UserComm}
