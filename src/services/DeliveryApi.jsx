import React from "react";
import {API_URL} from "../utils/Config";

const DELIVERY_ROUTE = 'delivery/';
const DELIVERIES_ROUTE = 'deliveries/';

class DeliveryApi extends React.Component {

    static getDeliveries(p){
        const requestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'},
        };
        return fetch(API_URL + DELIVERIES_ROUTE + '?' + 'page=' + p, requestOptions)
            .then(res => {
                if (res.ok) {
                    return res.json();
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
        const requestOptions = {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'}
        };
        return fetch(API_URL + DELIVERY_ROUTE + id, requestOptions)
            .then(res => {
                if (res.ok) {
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
        const requestOptions = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'},
            body: JSON.stringify({firstName: delivery.firstName, lastName: delivery.lastName,
                email: delivery.email, phone: delivery.phone, subscription: delivery.subscription,
                reputation: delivery.reputation, gratitudePoints: delivery.gratitudePoints, balance: delivery.balance})
        };
        return fetch(API_URL + DELIVERY_ROUTE + delivery.id, requestOptions)
            .then(res => {
                if (res.ok) {
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
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'},
            body: JSON.stringify({firstName: delivery.firstName, lastName: delivery.lastName,
                email: delivery.email, phone: delivery.phone, subscription: delivery.subscription})
        };
        return fetch(API_URL + DELIVERY_ROUTE, requestOptions)
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
