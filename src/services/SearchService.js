import React from 'react';


let _singleton = Symbol();

const SEARCH_URL = 'https://www.googleapis.com/books/v1/volumes?q=';

export default class SearchService {

    constructor(singletonToken) {
        if(_singleton !== singletonToken){
            throw new Error('Cannot instantiate directly');
        }
    }

    static get instance(){
        if(!this[_singleton])
            this[_singleton] =  new SearchService(_singleton);
        return this[_singleton];
    }


    search(searchString){

     console.log(searchString);

     if(searchString == ""){
         alert('search string cannot be empty!');
         window.location.reload();

     }
     else{
         return fetch(
             SEARCH_URL + searchString)
             .then( (response) =>  {
                 return response.json();
             });
     }

    }


    createSearchForDescription(isbnId) {
        return fetch(
            SEARCH_URL+'isbn:'+isbnId).then((response) => {
            return response.json();
        });
    }
}