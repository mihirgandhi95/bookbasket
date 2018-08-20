import React from 'react';


let _singleton = Symbol();
//const BASE_URL = 'https://polar-oasis-75619.herokuapp.com/api/';
const BASE_URL = 'http://localhost:8080/api/';

export default class BookService {

    constructor(singletonToken) {
        if(_singleton !== singletonToken){
            throw new Error('Cannot instantiate directly');
        }
    }

    static get instance(){
        if(!this[_singleton])
            this[_singleton] =  new BookService(_singleton);
        return this[_singleton];
    }


    addBook(book){
        return fetch(BASE_URL+'book', {
            method: 'post',
            body: JSON.stringify(book),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json());
    }


    findBookByISBN(isbn){
        return fetch(BASE_URL+'book/isbn/'+isbn).then(response => {
            return response.text().then(function(text) {
                return text ? JSON.parse(text) : null
            })
        });
    }


}