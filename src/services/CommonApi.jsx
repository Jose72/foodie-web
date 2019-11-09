import React from "react";
import axios from "axios";

axios.defaults.headers.common['Content-Type'] =  'application/json';

class CommonApi extends React.Component {

    static get(route, params, headers) {
        return axios.get(route, {params: params, headers: headers})
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
        return axios.delete(route, {params: params, headers: headers})
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
        return axios.put(route, {params: params, headers: headers})
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
        return axios.post(route, {params: params, headers: headers})
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