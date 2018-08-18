import React, {Component} from 'react';
import SearchService from "../services/SearchService"
import {Link, Route} from 'react-router-dom'
import {BrowserRouter as Router} from 'react-router-dom'
import BookPreview from "./BookPreview";
import BookViewerStyles from "../styles/BookViewerStyle.css"


export default class BookCard extends React.Component {

    constructor(props) {
        super(props)

    }


    render() {
        return (

            <div>
                <br/>


                <div className="row">
                    <div className="col-3">
                        <a href={"/bookpreview/" + this.props.book.volumeInfo.industryIdentifiers[0].identifier}>
                            <img className="card-img-top"
                                 src={this.props.book.volumeInfo.imageLinks.thumbnail.replace("zoom=1", "zoom=0")}
                                 style={{width: "200px", height: "300px"}}/>
                        </a>
                    </div>
                    <div className="col-9">


                        <div className="row">
                            <div className="col-4">
                                <p><h4>Author: </h4>{this.props.book.volumeInfo.authors[0]}</p>
                                {/*<p><h4>Title: </h4> {this.props.book.volumeInfo.title}</p>*/}

                            </div>
                            <div className="col-4">
                                <p><h4>PublishedDate:</h4> {this.props.book.volumeInfo.publishedDate}</p>

                                <p><h4>Publisher:</h4> {this.props.book.volumeInfo.publisher}</p>

                            </div>
                            <div className="col-4">
                                <p><h4>Rating: </h4>{this.props.book.volumeInfo.averageRating}</p>

                                <p><h4>Category:</h4> {this.props.book.volumeInfo.categories[0]}</p>
                            </div>
                        </div>

                        <p><h4>Description:</h4> {this.props.book.volumeInfo.description}</p>


                    </div>

                </div>
                <br/>
                <div align="center">
                    <h4>Personal Notes</h4>
                </div>
                <br/>
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text">Personal Notes</span>
                    </div>
                    <textarea class="form-control" aria-label="With textarea"></textarea>
                    <button className="btn btn-primary">Submit</button>
                </div>

            </div>



        )
    }
}