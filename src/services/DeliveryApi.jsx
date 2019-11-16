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

    static modifyDelivery(delivery, opts){
        let params = {};

        let data = {
            name: delivery.firstName + " " + delivery.lastName,
            firstName: delivery.firstName,
            lastName: delivery.lastName,
            email: delivery.email,
            phone_number: delivery.phone_number,
            rating: delivery.rating,
            balance: delivery.balance,
            gratitudePoints: delivery.gratitudePoints
        };

        let headers = {
            Authorization: Auth.getToken()
        };

        return CommonApi.put(API_URL + DELIVERY_ROUTE + '/' + delivery.user_id, params, headers, data);
    }

    static addDelivery(delivery, opts){
        let params = {};

        let data = {
            name: delivery.firstName + " " + delivery.lastName,
            firstName: delivery.firstName,
            lastName: delivery.lastName,
            password: delivery.password,
            email: delivery.email,
            phone_number: delivery.phone_number,
            picture: 'https://user-images.githubusercontent.com/11250/39013954-f5091c3a-43e6-11e8-9cac-37cf8e8c8e4e.jpg',
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

        return CommonApi.get(API_URL + DELIVERY_ROUTE + '/' + id, params, headers);
    };
}

export {DeliveryApi}
