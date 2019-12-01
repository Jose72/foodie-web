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

        return CommonApi.delete(API_URL + USER_ROUTE + '?id=' + id, params, headers);
    };

    static modifyUser(user){

        let params = {};

        let data = {
            name: user.name,
            email: user.email,
            phone_number: user.phone_number,
            suscripcion: user.suscripcion,
            rating: user.rating,
            favourPoints: user.favourPoints,
            picture: user.picture,
        };

        let headers = {
            Authorization: Auth.getToken()
        };

        return CommonApi.put(API_URL + USER_ROUTE + '?id=' + user.user_id, params, headers, data);
    }

    static addUser(user){

        let params = {};

        let data = {
            name: user.name,
            password: user.password,
            email: user.email,
            phone_number: user.phone_number,
            suscripcion: user.suscripcion,
            picture: user.picture,
            firebase_uid: user.email,
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

        return CommonApi.get(API_URL + USER_ROUTE + '?id=' + id, params, headers);
    };

    static cancelSubscription(id){

        let params = {};

        let headers = {
            Authorization: Auth.getToken()
        };

        return CommonApi.post(API_URL + USER_ROUTE + '/subscription/cancel' + '?id=' + id, params, headers);
    };

    static upgradeSubscription(id){

        let params = {};

        let headers = {
            Authorization: Auth.getToken()
        };

        return CommonApi.post(API_URL + USER_ROUTE + '/subscription/upgrade' + '?id=' + id, params, headers);
    };

}

export {UserApi}
