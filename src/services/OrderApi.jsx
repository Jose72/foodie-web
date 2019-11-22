import React from "react";
import { Auth } from './Authentication'
import {CommonApi} from "./CommonApi"
import {API_URL} from "../utils/Config";

const ORDER_ROUTE = 'order';
const ORDERS_ROUTE = 'orders';

class OrderApi extends React.Component {

    static getOrders(pIndex, pSize, userId, deliveryId, shopId){

        let params = {
            p: pIndex,
            pSize: pSize,
            user_id: userId,
            delivery_id: deliveryId,
            shop_id: shopId
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