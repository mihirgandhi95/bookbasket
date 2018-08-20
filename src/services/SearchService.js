import React from 'react';


let _singleton = Symbol();

const SEARCH_URL = 'https://www.googleapis.com/books/v1/volumes?q=';

const NEWSEARCH_URL='https://api.nytimes.com/svc/books/v3/lists/best-sellers/history.json?api-key=';

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
            SEARCH_URL+'isbn:'+isbnId+ '&key=AIzaSyAQmhb0K6x-0zVoMFlMtFpaRzOBxnVxT4E').then((response) => {
            return response.json();
        });
    }


    createSearchForHome(){
        return fetch(
            NEWSEARCH_URL+'4f0ff7ce8c70407ea1c0759b352fb301').then((response) => {
            return response.json();
        });
    }



}