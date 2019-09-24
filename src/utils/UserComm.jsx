import React from "react";
import {API_URL} from "./Config";

class UserComm extends React.Component {

    deleteUser(id){
        const requestOptions = {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'},
            body: JSON.stringify({id})
        };
        return fetch(API_URL + 'user/', requestOptions)
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

    modifyUser(id, opts){
        const requestOptions = {
            method: 'UPDATE',
            headers: {'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'},
            body: JSON.stringify({id})
        };
        return fetch(API_URL + 'user/', requestOptions)
            .then(res => {
                if (res.ok) {
                    console.log("Update Successful");
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

export {UserComm}
