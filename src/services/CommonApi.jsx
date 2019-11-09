import React from "react";
import axios from "axios";
import { Auth } from './Authentication'
import {API_URL} from "../utils/Config";

axios.defaults.headers.common['Content-Type'] =  'application/json';

class CommonApi extends React.Component {

    static get(route, params, headers) {
        axios.get(route, {params: params, headers: headers})
            .then(res => {
                if (res.status === 200) {
                    return res.data;
                } else {
                    return Promise.reject(res.status.toString() + ': ' + res.statusText)
                }
            })
            .catch(error => {
                return Promise.reject(error)
            })
    }

    static delete(route, params, headers) {
        axios.delete(route, {params: params, headers: headers})
            .then(res => {
                if (res.status === 200) {
                    return res.data;
                } else {
                    return Promise.reject(res.status.toString() + ': ' + res.statusText)
                }
            })
            .catch(error => {
                return Promise.reject(error)
            })
    }

    static put(route, params, headers) {
        axios.put(route, {params: params, headers: headers})
            .then(res => {
                if (res.status === 200) {
                    return res.data;
                } else {
                    return Promise.reject(res.status.toString() + ': ' + res.statusText)
                }
            })
            .catch(error => {
                return Promise.reject(error)
            })
    }

    static post(route, params, headers) {
        axios.post(route, {params: params, headers: headers})
            .then(res => {
                if (res.status === 200) {
                    return res.data;
                } else {
                    return Promise.reject(res.status.toString() + ': ' + res.statusText)
                }
            })
            .catch(error => {
                return Promise.reject(error)
            })
    }
}

export {CommonApi}