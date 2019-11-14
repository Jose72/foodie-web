import React from "react";
import axios from "axios";
import {Auth} from "../services";
import {API_URL} from "../utils/Config";
import {CommonApi} from "./CommonApi"

const SHOP_ROUTE = 'shop';
const SHOPS_ROUTE = 'shops';

axios.defaults.headers.common['Content-Type'] =  'application/json';

class ShopApi extends React.Component {

    static getShops(pIndex, pSize){

        let params = {
            p: pIndex,
            pSize: pSize,
        };

        let headers = {
            Authorization: Auth.getToken()
        };

        return CommonApi.get(API_URL + SHOPS_ROUTE, params, headers);
    }

    static deleteShop(id){

        let params = {};

        let headers = {
            Authorization: Auth.getToken()
        };

        return CommonApi.delete(API_URL + SHOP_ROUTE + '/' + id, params, headers);
    };

    static modifyShop(shop){

        let params = {};

        let data = {
            name: shop.name,
            description: shop.description,
            phone: shop.phone,
            reputation: shop.reputation,
            picture: shop.picture
        };

        let headers = {
            Authorization: Auth.getToken()
        };

        return CommonApi.put(API_URL + SHOP_ROUTE + '/' + shop.id, params, headers, data);
    }

    static addShop(shop){

        let params = {};

        let data = {
            name: shop.name,
            address: shop.address,
            description: shop.description,
            phone: shop.phone,
            picture: shop.picture
        };

        let headers = {
            Authorization: Auth.getToken()
        };

        return CommonApi.post(API_URL + SHOP_ROUTE, params, headers, data);
    }

    static getShop(id){

        let params = {};

        let headers = {
            Authorization: Auth.getToken()
        };

        return CommonApi.get(API_URL + SHOP_ROUTE + '/' + id, params, headers);
    };


}

export {ShopApi}