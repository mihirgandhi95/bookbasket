import React from 'react';


let _singleton = Symbol();
const BASE_URL = 'https://polar-oasis-75619.herokuapp.com/api/';
// const BASE_URL = 'http://localhost:8080/api/';

export default class NoteService {

    constructor(singletonToken) {
        if(_singleton !== singletonToken){
            throw new Error('Cannot instantiate directly');
        }
    }

    static get instance(){
        if(!this[_singleton])
            this[_singleton] =  new NoteService(_singleton);
        return this[_singleton];
    }


    addNoteForBook(userId,bookId,note){
        return fetch(BASE_URL+'note/user/'+userId+'/book/'+bookId, {
            method: 'post',
            body: JSON.stringify(note),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json());
    }


    fetchNotesForBooks(userId,bookId){
        return fetch(BASE_URL+'note/user/'+userId+'/book/'+bookId).then(response => response.json()
        );
    }



}