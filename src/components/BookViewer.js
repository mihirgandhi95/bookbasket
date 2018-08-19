import React, {Component} from 'react';
import SearchService from "../services/SearchService"
import {Link, Route} from 'react-router-dom'
import {BrowserRouter as Router} from 'react-router-dom'
import BookPreview from "./BookPreview";
import BookViewerStyles from "../styles/BookViewerStyle.css"


export default class BookViewer extends React.Component {

    constructor(props) {
        super(props)

    }

    handleNotesClick(event)
    {

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
                                <p><strong>Author: </strong>{this.props.book.volumeInfo.authors[0]}</p>
                                {/*<p><h4>Title: </h4> {this.props.book.volumeInfo.title}</p>*/}

                            </div>
                            <div className="col-4">
                                <p><strong>PublishedDate:</strong> {this.props.book.volumeInfo.publishedDate}</p>

                                <p><strong>Publisher:</strong> {this.props.book.volumeInfo.publisher}</p>

                            </div>
                            <div className="col-4">
                                <p><strong>Rating: </strong>{this.props.book.volumeInfo.averageRating}</p>

                                <p><strong>Category:</strong> {this.props.book.volumeInfo.categories[0]}</p>
                            </div>
                        </div>

                        <p><strong>Description:</strong> {this.props.book.volumeInfo.description}</p>


                    </div>

                </div>
                <br/>
                <div align="center">
                    <h4>Personal Notes</h4>
                </div>
                <br/>
                <div className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Personal Notes</span>
                    </div>
                    <textarea className="form-control" aria-label="With textarea"></textarea>
                    <button className="btn btn-primary" onClick={(event) =>{this.handleNotesClick(event)}}>Submit</button>
                </div>

            </div>



        )
    }
}