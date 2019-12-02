import React from "react";
import axios from "axios";
import { Auth } from './Authentication'

import {API_URL} from "../utils/Config";
import {CommonApi} from "./CommonApi";

const STATISTICS_ROUTE = 'statistics';

axios.defaults.headers.common['Content-Type'] =  'application/json';

class StatisticsApi extends React.Component {

    static getCurrentStatistics(){

        let params = {};

        let headers = {
            Authorization: Auth.getToken(),
        };

        return CommonApi.get(API_URL + STATISTICS_ROUTE, params, headers);
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

        let params = {
            year_from: year_from,
            month_from: month_from,
            year_to: year_to,
            month_to: month_to
        };

        let headers = {
            Authorization: Auth.getToken(),
        };

        return CommonApi.get(API_URL + STATISTICS_ROUTE + route, params, headers);
    }

}

export {StatisticsApi}