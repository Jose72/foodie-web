import React from "react";
import axios from "axios";
import {Auth} from "../services";
import {API_URL} from "../utils/Config";
import {CommonApi} from "./CommonApi"

const SHOP_ROUTE = 'shop';
const MENU_ROUTE = 'menu';

axios.defaults.headers.common['Content-Type'] =  'application/json';

class ShopMenuApi extends React.Component {

    static deleteMenuFood(shopId, foodId){

        let params = {};

        let headers = {
            Authorization: Auth.getToken()
        };

        return CommonApi.delete(API_URL + SHOP_ROUTE + '/' + shopId + '/' + MENU_ROUTE + '/' + foodId, params, headers);
    };

    static modifyMenuFood(shopId, food){

        let params = {};

        let data = {
            id: food.id,
            name: food.name,
        };

        let headers = {
            Authorization: Auth.getToken()
        };

        return CommonApi.put(API_URL + SHOP_ROUTE + '/' + shopId + '/' + MENU_ROUTE, params, headers, data);
    }

    static addMenuFood(shopId, food){

        let params = {};

        let data = {
            name: food.name,
        };

        let headers = {
            Authorization: Auth.getToken()
        };

        return CommonApi.post(API_URL + SHOP_ROUTE + '/' + shopId + '/' + MENU_ROUTE, params, headers, data);
    }

    static getShopMenu(shopId){

        let params = {};

        let headers = {
            Authorization: Auth.getToken()
        };

        return CommonApi.get(API_URL + SHOP_ROUTE + '/' + shopId + '/' + MENU_ROUTE, params, headers);
    };


}

export {ShopMenuApi}