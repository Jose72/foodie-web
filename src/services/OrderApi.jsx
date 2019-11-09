import React from "react";
import { Auth } from './Authentication'
import {CommonApi} from "./CommonApi"
import {API_URL} from "../utils/Config";

const ORDER_ROUTE = 'order';
const ORDERS_ROUTE = 'orders';

class OrderApi extends React.Component {

    static getOrders(pIndex, pSize, userId, deliveryId){

        let params = {
            p: pIndex,
            pSize: pSize,
            userId: userId,
            deliveryId: deliveryId
        };

        let headers = {
            Authorization: Auth.getToken()
        };

        return CommonApi.get(API_URL + ORDERS_ROUTE, params, headers);
    }

    static deleteOrder(id) {

        let params = {};

        let headers = {
            Authorization: Auth.getToken()
        };

        return CommonApi.delete(API_URL + ORDER_ROUTE + '/' + id, params, headers);
    }

    static getOrder(id){

        let params = {};

        let headers = {
            Authorization: Auth.getToken()
        };

        return CommonApi.delete(API_URL + ORDER_ROUTE + '/' + id, params, headers);
    };

}

export {OrderApi}