import React from "react";
import axios from "axios";
import { Auth } from './Authentication'
import {CommonApi} from "./CommonApi"

import {API_URL} from "../utils/Config";

const USER_ROUTE = 'user';
const USERS_ROUTE = 'users';

axios.defaults.headers.common['Content-Type'] =  'application/json';

class UserApi extends React.Component {

    static getUsers(pIndex, pSize){

        let params = {
            p: pIndex,
            pSize: pSize,
        };

        let headers = {
            Authorization: Auth.getToken()
        };

        return CommonApi.get(API_URL + USERS_ROUTE, params, headers);
    }

    static deleteUser(id){

        let params = {};

        let headers = {
            Authorization: Auth.getToken()
        };

        return CommonApi.delete(API_URL + USER_ROUTE + '/' + id, params, headers);
    };

    static modifyUser(user){

        let params = {};

        let data = {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
            subscription: user.subscription,
            reputation: user.reputation,
            gratitudePoints: user.gratitudePoints
        };

        let headers = {
            Authorization: Auth.getToken()
        };

        return CommonApi.put(API_URL + USER_ROUTE + '/' + user.id, params, headers, data);
    }

    static addUser(user){

        let params = {};

        let data = {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
            subscription: user.subscription
        };

        let headers = {
            Authorization: Auth.getToken()
        };

        return CommonApi.post(API_URL + USER_ROUTE, params, headers, data);
    }

    static getUser(id){

        let params = {};

        let headers = {
            Authorization: Auth.getToken()
        };

        return CommonApi.get(API_URL + USER_ROUTE + '/' + id, params, headers);
    };

}

export {UserApi}
