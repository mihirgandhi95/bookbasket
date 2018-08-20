import React, {Component} from 'react';
import SearchService from "../services/SearchService"

import BookCard from "./BookCard"
import {Link, Route} from 'react-router-dom'
import UserService from "../services/UserService";
import $ from 'jquery';

class SearchBar extends React.Component {

    constructor() {

        super();
        this.state = {
            searchString: '',
            arrayOfBooksObject: []
        };
        this.SearchService = SearchService.instance;
        this.titleChanged = this.titleChanged.bind(this);
        this.createSearch = this.createSearch.bind(this);
    }


    titleChanged(event) {
        console.log(event.target.value);
        this.setState({searchString: event.target.value});
    }

    createSearch(searchString) {

        $("tbody").empty();
        this.SearchService.search(this.state.searchString).then((response) => {
            // console.log("************ this is the response ***********")
            // console.log(response.items);

            this.setState(
                {
                    arrayOfBooksObject: response.items,
                }
            );
        });
    }




    renderBooks() {
        var grid = this.state.arrayOfBooksObject.map((book) => {

            console.log("********* each item of the books array *********")
            console.log(book)
            return (
                <div>
                    {/*<img src = {book.volumeInfo.imageLinks.thumbnail}></img>*/}

                    <BookCard book={book} key={book.id}/>

                </div>
            )
        })
        return (grid)
    }


    render() {
        return (
            <div>
                <div>

                    <div className="container  inputField">
                        {/*<label for="search">Search Books</label>*/}
                        {/*<input type="search" id="books"></input>*/}
                        {/*<button className="btn btn-primary">Search</button>*/}
                        <input onChange={this.titleChanged}
                               value={this.state.searchString}
                               className="form-control btn-outline-dark"
                               placeholder="Enter book name here..."/>
                        <br/>
                        <button className="btn btn-primary btn-block" onClick={this.createSearch}>Search</button>
                    </div>
                    <div className="card-deck">
                        {this.renderBooks()}
                    </div>
                </div>
            </div>
        )
    }


}


export default SearchBar;