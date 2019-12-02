import React from "react";
import axios from "axios";
import {Auth} from "./Authentication";
import {API_URL} from "../utils/Config";
import {CommonApi} from "./CommonApi";

const DELIVERY_ROUTE = 'delivery';
const DELIVERIES_ROUTE = 'deliveries';

axios.defaults.headers.common['Content-Type'] =  'application/json';

class DeliveryApi extends React.Component {

    static getDeliveries(pIndex, pSize){

        let params = {
            p: pIndex,
            pSize: pSize,
        };

        let headers = {
            Authorization: Auth.getToken()
        };

        return CommonApi.get(API_URL + DELIVERIES_ROUTE, params, headers);
    }

    static deleteDelivery(id){
        let params = {};

        let headers = {
            Authorization: Auth.getToken()
        };

        return CommonApi.delete(API_URL + DELIVERY_ROUTE + '?id=' + id, params, headers);
    };

    static modifyDelivery(delivery){

        let params = {};

        let data = {
            name: delivery.name,
            email: delivery.email,
            phone_number: delivery.phone_number,
            rating: delivery.rating,
            balance: delivery.balance,
            picture: delivery.picture,
            favourPoints: delivery.favourPoints,
        };
        let headers = {
            Authorization: Auth.getToken()
        };

        return CommonApi.put(API_URL + DELIVERY_ROUTE + '?id=' + delivery.user_id, params, headers, data);
    }

    static addDelivery(delivery, opts){
        let params = {};

        let data = {
            name: delivery.name,
            password: delivery.password,
            email: delivery.email,
            balance: 0,
            phone_number: delivery.phone_number,
            picture: delivery.picture,
            firebase_uid: delivery.email,
        };

        let headers = {
            Authorization: Auth.getToken()
        };

        return CommonApi.post(API_URL + DELIVERY_ROUTE, params, headers, data);
    }

    static getDelivery(id){
        let params = {};

        let headers = {
            Authorization: Auth.getToken()
        };

        return CommonApi.get(API_URL + DELIVERY_ROUTE + '?id=' + id, params, headers);
    };

    static balanceAdd(user, balance){

        let d = user;
        d.balance = balance;

        return DeliveryApi.modifyDelivery(d);
    }
}

export {DeliveryApi}
