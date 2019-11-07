import React from "react";
import axios from "axios";
import { Auth } from './Authentication'

import {API_URL} from "../utils/Config";

const STATISTICS_ROUTE = 'statistics';

axios.defaults.headers.common['Content-Type'] =  'application/json';

class StatisticsApi extends React.Component {

    static getCurrentStatistics(){
        return axios.get(API_URL + STATISTICS_ROUTE, {
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

    static getUsersStatistics(year_from, month_from, year_to, month_to){
        return this.getStatistics(year_from, month_from, year_to, month_to, '/users')
    }

    static getDeliveriesStatistics(year_from, month_from, year_to, month_to){
        return this.getStatistics(year_from, month_from, year_to, month_to, '/deliveries')
    }

    static getCompletedOrdersStatistics(year_from, month_from, year_to, month_to){
        return this.getStatistics(year_from, month_from, year_to, month_to, '/orders/completed')
    }

    static getCanceledOrdersStatistics(year_from, month_from, year_to, month_to){
        return this.getStatistics(year_from, month_from, year_to, month_to, '/orders/canceled')
    }

    static getStatistics(year_from, month_from, year_to, month_to, route){
        return axios.get(API_URL + STATISTICS_ROUTE + route, {
            params: {
                year_from: year_from,
                month_from: month_from,
                year_to: year_to,
                month_to: month_to
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