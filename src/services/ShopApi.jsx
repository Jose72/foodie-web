import React from "react";
import axios from "axios";
import {Auth} from "../services";
import {API_URL} from "../utils/Config";

const SHOP_ROUTE = 'shop';
const SHOPS_ROUTE = 'shops';

axios.defaults.headers.common['Content-Type'] =  'application/json';

class ShopApi extends React.Component {

    static getShops(pIndex, pSize){
        return axios.get(API_URL + SHOPS_ROUTE, {
            params: {
                p: pIndex,
                pSize: pSize
            },
            headers: {
                Authorization: "Bearer " + Auth.getToken()
            }
        })
            .then(res => {
                if (res.status === 200) {
                    return res.data;
                } else {
                    return Promise.reject(res.status.toString() + ': ' + res.statusText)
                }
            })
            .catch(error => {
                console.log(error);
                return Promise.reject(error)
            })
    }

    static deleteShop(id){
        return axios.delete(API_URL + SHOP_ROUTE + '/' + id, {
            headers: {
                Authorization: "Bearer " + Auth.getToken()
            }
        })
            .then(res => {
                if (res.status === 200) {
                    console.log("Delete Successful");
                } else {
                    return Promise.reject(res.status.toString() + ': ' + res.statusText)
                }
            })
            .catch(error => {
                console.log(error);
                return Promise.reject(error)
            })
    };

    static modifyShop(shop, opts){
        return axios.put(API_URL + SHOP_ROUTE + '/' + shop.id,
            {
                name: shop.name,
                address: shop.address,
                description: shop.description,
                pictureUrl: shop.pictureUrl
            },
            {
                headers: {
                    Authorization: "Bearer " + Auth.getToken()
                }
            })
            .then(res => {
                if (res.status === 200) {
                    return Promise.resolve('Update Successful')
                } else {
                    return Promise.reject(res.status.toString() + ': ' + res.statusText)
                }
            })
            .catch(error => {
                console.log(error);
                return Promise.reject(error)
            })
    }

    static addShop(shop){
        return axios.post(API_URL + SHOP_ROUTE,
            {
                name: shop.name,
                address: shop.address,
                phone: shop.phone,
                description: shop.description,
                pictureUrl: shop.pictureUrl
            },
            {
                headers: {
                    Authorization: "Bearer " + Auth.getToken()
                }
            })
            .then(res => {
                if (res.ok) {
                    console.log("Add Successful");
                } else {
                    return Promise.reject(res.status.toString() + ': ' + res.statusText)
                }
            })
            .catch(error => {
                console.log(error);
                return Promise.reject(error)
            })
    }

    static getShop(id){
        return axios.get(API_URL + SHOP_ROUTE + '/' + id, {
            headers: {
                Authorization: "Bearer " + Auth.getToken()
            }
        })
            .then(res => {
                if (res.status === 200) {
                    return res.data
                } else {
                    return Promise.reject(res.status.toString() + ': ' + res.statusText)
                }
            })
            .catch(error => {
                console.log(error);
                return Promise.reject(error)
            })
    };
}

export {ShopApi}