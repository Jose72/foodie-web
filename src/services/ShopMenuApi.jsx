import React from "react";
import axios from "axios";
import {Auth} from "../services";
import {API_URL} from "../utils/Config";
import {CommonApi} from "./CommonApi"

const MENU_ROUTE = 'menu';
const PRODUCT_ROUTE = 'product';

axios.defaults.headers.common['Content-Type'] =  'application/json';

class ShopMenuApi extends React.Component {

    static getShopMenu(shopId, pIndex, pSize){

        let params = {
            id: shopId,
            p: pIndex,
            pSize: pSize,
        };

        let headers = {
            Authorization: Auth.getToken()
        };

        return CommonApi.get(API_URL + MENU_ROUTE, params, headers);
    };


    static deleteMenuFood(shopId, foodId){

        let params = {
            id: foodId,
        };

        let headers = {
            Authorization: Auth.getToken()
        };

        return CommonApi.delete(API_URL + PRODUCT_ROUTE, params, headers);
    };

    static modifyMenuFood(shopId, food){

        let params = {
            id: food.id,
        };

        let data = {
            shop_id: food.shop_id,
            name: food.name,
            price: food.price,
            description: food.description,
        };

        let headers = {
            Authorization: Auth.getToken()
        };

        return CommonApi.put(API_URL + PRODUCT_ROUTE, params, headers, data);
    }

    static addMenuFood(shopId, food){

        let params = {};

        let data = {
            shop_id: shopId,
            name: food.name,
            price: food.price,
            description: food.description,
        };

        let headers = {
            Authorization: Auth.getToken()
        };

        return CommonApi.post(API_URL + PRODUCT_ROUTE, params, headers, data);
    }

    static getMenuFood(foodId){

        let params = {
            id: foodId,
        };

        let headers = {
            Authorization: Auth.getToken()
        };

        return CommonApi.get(API_URL + PRODUCT_ROUTE, params, headers);
    };
    
}

export {ShopMenuApi}