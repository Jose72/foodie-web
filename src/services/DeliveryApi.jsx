import React from "react";
import axios from "axios";
import {Auth} from "./Authentication";
import {API_URL} from "../utils/Config";

const DELIVERY_ROUTE = 'delivery';
const DELIVERIES_ROUTE = 'deliveries';

axios.defaults.headers.common['Content-Type'] =  'application/json';

class DeliveryApi extends React.Component {

    static getDeliveries(pIndex, pSize){
        return axios.get(API_URL + DELIVERIES_ROUTE, {
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

    static deleteDelivery(id){
        return axios.delete(API_URL + DELIVERY_ROUTE + '/' + id, {
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

    static modifyDelivery(delivery, opts){
        return axios.put(API_URL + DELIVERY_ROUTE + '/' + delivery.id,
            {
                firstName: delivery.firstName,
                lastName: delivery.lastName,
                email: delivery.email,
                phone: delivery.phone,
                subscription: delivery.subscription,
                reputation: delivery.reputation,
                gratitudePoints: delivery.gratitudePoints,
                balance: delivery.balance
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

    static addDelivery(delivery, opts){
        return axios.post(API_URL + DELIVERY_ROUTE,
            {
                firstName: delivery.firstName,
                lastName: delivery.lastName,
                email: delivery.email,
                phone: delivery.phone,
                subscription: delivery.subscription
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
}

export {DeliveryApi}
