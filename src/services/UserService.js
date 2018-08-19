import React from 'react';


let _singleton = Symbol();

const BASE_URL = 'https://polar-oasis-75619.herokuapp.com/api/';

export default class UserService {

    constructor(singletonToken) {
        if (_singleton !== singletonToken) {
            throw new Error('Cannot instantiate directly');
        }
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new UserService(_singleton);
        return this[_singleton];
    }


    registerUser(userObjStr) {
        return fetch(BASE_URL+'register', {
            method: 'post',
            body: JSON.stringify(userObjStr),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json());
    }

    getProfile(){
        return fetch(BASE_URL+'profile').then(response => {
            console.log(response)
           return response.json()
        });
    }

    logoutUser(){
        return fetch(BASE_URL+'logout').then(response => response);
    }


    getLogin(user) {
        return fetch(BASE_URL+'login', {
            method: 'post',
            body: JSON.stringify(user),
            headers: {
                'content-type': 'application/json'
            },
            credentials: "same-origin"
        }).then(response => {
           if(response.status == 200)
               return response.json();
           else
             return null;
        });
    }
}