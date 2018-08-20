
import React from 'react';


let _singleton = Symbol();
const BASE_URL = 'https://polar-oasis-75619.herokuapp.com/api/';

// const BASE_URL = 'http://localhost:8080/api/';
export default class ReviewService {

    constructor(singletonToken) {
        if(_singleton !== singletonToken){
            throw new Error('Cannot instantiate directly');
        }
    }

    static get instance(){
        if(!this[_singleton])
            this[_singleton] =  new ReviewService(_singleton);
        return this[_singleton];
    }


    addReviewForBook(userId,bookId,review){
        return fetch(BASE_URL+'review/user/'+userId+'/book/'+bookId, {
            method: 'post',
            body: JSON.stringify(review),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json());
    }


    fetchReviewsForBooks(userId,bookId){
        return fetch(BASE_URL+'review/user/'+userId + '/book/'+ bookId ).then(response => response.json()
        );
    }

    fetchOtherReviews(bookId) {
        return fetch(BASE_URL+'review/book/'+ bookId ).then(response => response.json()
        );
    }


    deleteReview(reviewId){
        return fetch(BASE_URL+'review/'+reviewId, {
            method: 'delete',
            body: JSON.stringify(reviewId),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }




}
