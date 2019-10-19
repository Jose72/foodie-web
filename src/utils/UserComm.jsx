import React from "react";
import axios from "axios";
import { Auth } from '../utils/Authentication'

import {API_URL} from "./Config";

const USER_ROUTE = 'user/';
const USERS_ROUTE = 'users/';

axios.defaults.headers.common['Content-Type'] =  'application/json';

class UserComm extends React.Component {

    static getUsers(p){
        return axios.get(API_URL + USERS_ROUTE, {
            params: {
                page: p
                },
            headers: {
                Authorization: "Bearer " + Auth.getToken()
            }
            })
            .then(res => {
                if (res.status === 200) {
                    return res.data;
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
        return axios.delete(API_URL + USER_ROUTE + id, {
            headers: {
                Authorization: "Bearer " + Auth.getToken()
            }
        })
            .then(res => {
                if (res.status === 200) {
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

    static modifyUser(user, opts){
        return axios.put(API_URL + USER_ROUTE + user.id,
            {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    phone: user.phone,
                    subscription: user.subscription,
                    reputation: user.reputation,
                    gratitudePoints: user.gratitudePoints
            },
            {
                headers: {
                    Authorization: "Bearer " + Auth.getToken()
                }
            })
            .then(res => {
                if (res.status === 200) {
                    return Promise.resolve('Update Successful')
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
        return axios.post(API_URL + USER_ROUTE,
            {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phone: user.phone,
                subscription: user.subscription
            },
            {
                headers: {
                    Authorization: "Bearer " + Auth.getToken()
                }
            })
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
