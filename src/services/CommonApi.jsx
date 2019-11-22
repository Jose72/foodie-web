import React from "react";
import axios from "axios";
import {ApiErrorHandler} from "./ApiErrorHandler";

axios.defaults.headers.common['Content-Type'] =  'application/json';



class CommonApi extends React.Component {

    static get(route, params, headers, data) {
        return axios.get(route, {params: params, headers: headers})
            .then(res => {
                if (res.status === 200) {
                    return res.data;
                } else {
                    return ApiErrorHandler.handle(res);
                }
            })
            .catch(error => {
                return ApiErrorHandler.handle(error.response);
            })
    }

    static delete(route, params, headers) {
        return axios.delete(route, {params: params, headers: headers})
            .then(res => {
                if (res.status === 200) {
                    return res.data;
                } else {
                    return Promise.reject(res.toString());
                }
            })
            .catch(error => {
                return ApiErrorHandler.handle(error.response);
            })
    }

    static put(route, params, headers, data) {
        return axios.put(route, data,{params: params, headers: headers})
            .then(res => {
                if (res.status === 200) {
                    return res.data;
                } else {
                    return ApiErrorHandler.handle(res);
                }
            })
            .catch(error => {
                return ApiErrorHandler.handle(error.response);
            })
    }

    static post(route, params, headers, data) {
        return axios.post(route, data,{params: params, headers: headers})
            .then(res => {
                if (res.status === 200) {
                    return res.data;
                } else {
                    return ApiErrorHandler.handle(res);
                }
            })
            .catch(error => {
                return ApiErrorHandler.handle(error.response);
            })
    }
}

export {CommonApi}