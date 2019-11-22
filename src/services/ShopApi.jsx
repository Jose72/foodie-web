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

        return CommonApi.delete(API_URL + SHOP_ROUTE + '?id='  + id, params, headers);
    };

    static modifyShop(shop){

        let params = {};

        let data = {
            name: shop.name,
            address: shop.address,
            description: shop.description,
            photoUrl: shop.photoUrl,
            coordinates: {latitude: parseFloat(shop.latitude), longitude: parseFloat(shop.longitude)},
            rating: shop.rating,
        };

        let headers = {
            Authorization: Auth.getToken()
        };

        return CommonApi.put(API_URL + SHOP_ROUTE + '?id='  + shop.id, params, headers, data);
    }

    static addShop(shop){

        let params = {};

        let data = {
            name: shop.name,
            address: shop.address,
            description: shop.description,
            photoUrl: 'https://p7.hiclipart.com/preview/3/10/517/computer-icons-shopping-cart-retail-sales-thumbnail.jpg',
            coordinates: {latitude: parseFloat(shop.latitude), longitude: parseFloat(shop.longitude)},
            rating: 0,
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

        return CommonApi.get(API_URL + SHOP_ROUTE + '?id='  + id, params, headers);
    };


}

export {ShopApi}