import React from "react";
import axios from "axios";
import { Auth } from './Authentication'

import {API_URL} from "../utils/Config";

const STATISTICS_ROUTE = 'statistics';

axios.defaults.headers.common['Content-Type'] =  'application/json';

class StatisticsApi extends React.Component {

    static getUsersStatistics(period, from, to){
        return this.getStatistics(period, from, to, '/users')
    }

    static getDeliveriesStatistics(period, from, to){
        return this.getStatistics(period, from, to, '/deliveries')
    }

    static getCompletedOrdersStatistics(period, from, to){
        return this.getStatistics(period, from, to, '/orders/completed')
    }

    static getCanceledOrdersStatistics(period, from, to){
        return this.getStatistics(period, from, to, '/orders/canceled')
    }

    static getStatistics(unit, from, to, route){
        return axios.get(API_URL + STATISTICS_ROUTE + route, {
            params: {
                unit: unit,
                from: from,
                to: to,
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

}

export {StatisticsApi}