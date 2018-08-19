
import React, {Component} from 'react';
import SearchService from "../services/SearchService"
import {Link, Route} from 'react-router-dom'
import {BrowserRouter as Router} from 'react-router-dom'
import BookPreview from "./BookPreview";
import BookViewerStyles from "../styles/BookViewerStyle.css"
import UserService from "../services/UserService";
import BookService from "../services/BookService";
import NoteService from "../services/NoteService";


export default class BookViewer extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            user: {userId: ''},
            book: {},
            notes: []
        };

        this.userService = UserService.instance;
        this.bookService = BookService.instance;
        this.noteService = NoteService.instance;

    }


    componentDidMount() {
        this.userService.getProfile().then(response => {
                if (response.status == 500)
                    return

                this.setState({

                    user: response
                });
                this.bookService.findBookByISBN(this.props.book.volumeInfo.industryIdentifiers[0].identifier).then(response => {
                    this.setState({

                        book: response
                    });

                    if(this.state.book!=null)
                    {
                        this.noteService.fetchNotesForBooks(this.state.user.userId, this.state.book.id).then(response => {
                            this.setState({

                                notes: response
                            });
                        })
                    }
                })


            }
        )
        ;
    }

    handleNotesClick(event) {
        console.log(this.state.book);
        if(this.state.book == null){
            const newBook ={
                title: this.props.book.volumeInfo.title,
                imageLink: this.props.book.volumeInfo.imageLinks.thumbnail,
                isbn10: this.props.book.volumeInfo.industryIdentifiers[0].identifier
            };

            this.bookService.addBook(newBook).then(response => {
                    this.setState({

                        book: response
                    })
                console.log(this.state.book);

                }
            )
        }
        else{
            console.log('in else');
        }
    }



render() {
        return (

            <div>
                <br/>


                <div className="row">
                    <div className="col-3">

                        {this.state.user.userId == '' && <img className="card-img-top"
                                                              src={this.props.book.volumeInfo.imageLinks.thumbnail}
                                                              style={{width: "200px", height: "300px"}}/>}



                        {this.state.user.userId !== '' &&  <a href={"/bookpreview/" + this.props.book.volumeInfo.industryIdentifiers[0].identifier}>
                            <img className="card-img-top"
                                 src={this.props.book.volumeInfo.imageLinks.thumbnail}
                                 style={{width: "200px", height: "300px"}}/>
                        </a>}
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

                                {this.props.book.volumeInfo.categories !== undefined && <p><strong>Category:</strong> {this.props.book.volumeInfo.categories[0]}</p>}
                            </div>
                        </div>

                        <p><strong>Description:</strong> {this.props.book.volumeInfo.description}</p>


                    </div>

                </div>
                <br/>

                {this.state.user.userId !== '' &&
                <div>
                    <div align="center">
                        <h4>Personal Notes</h4>
                    </div>
                    <br/>
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Personal Notes</span>
                        </div>
                        <textarea className="form-control" aria-label="With textarea"></textarea>
                        <button className="btn btn-primary" onClick={(event) => {
                            this.handleNotesClick(event)
                        }}>Submit
                        </button>
                    </div>
                </div>

                }
            </div>


        )
    }
}