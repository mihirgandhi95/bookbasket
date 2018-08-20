import React, {Component} from 'react';
import SearchService from "../services/SearchService"
import {Link, Route} from 'react-router-dom'
import {BrowserRouter as Router} from 'react-router-dom'
import BookPreview from "./BookPreview";
import BookViewerStyles from "../styles/BookViewerStyle.css"
import UserService from "../services/UserService";
import BookService from "../services/BookService";
import NoteService from "../services/NoteService";
import ReviewService from "../services/ReviewService";


export default class BookViewer extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            user: {userId: ''},
            book: {},
            notes: [],
            currentNote: 'temp',
            reviews: [],
            currentReview: 'temp',
            newReviews: []
        };

        this.userService = UserService.instance;
        this.bookService = BookService.instance;
        this.noteService = NoteService.instance;
        this.reviewService = ReviewService.instance;

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
                    if (this.state.book != null) {
                        this.noteService.fetchNotesForBooks(this.state.user.userId, this.state.book.id).then(responseReview => this.setState({
                            notes: responseReview
                        }));
                        this.reviewService.fetchReviewsForBooks(this.state.user.userId, this.state.book.id).then(responseReview => this.setState({
                            reviews: responseReview
                        }));
                        this.reviewService.fetchOtherReviews(this.state.book.id).then(responseReview => this.setState({
                            newReviews: responseReview
                        }));
                    }
                }
            )
        })
    }

    handleNotesClick(event) {
        console.log(this.state.book);
        if (this.state.book == null) {
            const newBook = {
                title: this.props.book.volumeInfo.title,
                imageLink: this.props.book.volumeInfo.imageLinks.thumbnail,
                isbn10: this.props.book.volumeInfo.industryIdentifiers[0].identifier
            };

            this.bookService.addBook(newBook).then(response => {
                    this.setState({
                        book: response
                    })
                    console.log(this.state.book);
                    var note = {
                        noteComment: this.state.currentNote
                    }
                    this.noteService.addNoteForBook(this.state.user.userId, this.state.book.id, note).then(response => this.noteService.fetchNotesForBooks(this.state.user.userId, this.state.book.id).then(responseReview => this.setState({
                        notes: responseReview
                    })));
                }
            )
        }
        else {
            console.log(this.state.book);
            var note = {
                noteComment: this.state.currentNote
            }
            console.log('in else');
            this.noteService.addNoteForBook(this.state.user.userId, this.state.book.id, note).then(response => this.noteService.fetchNotesForBooks(this.state.user.userId, this.state.book.id).then(responseReview => this.setState({
                notes: responseReview
            })))
        }
    }


    handleReviewsClick(event) {
        console.log(this.state.book);
        if (this.state.book == null) {
            const newBook = {
                title: this.props.book.volumeInfo.title,
                imageLink: this.props.book.volumeInfo.imageLinks.thumbnail,
                isbn10: this.props.book.volumeInfo.industryIdentifiers[0].identifier
            };

            this.bookService.addBook(newBook).then(response => {
                    this.setState({
                        book: response
                    })
                    // console.log(this.state.book);
                    // console.log(this.state.currentReview);
                    var review = {
                        reviewText: this.state.currentReview
                    }
                    this.reviewService.addReviewForBook(this.state.user.userId, this.state.book.id, review).then(response => this.reviewService.fetchReviewsForBooks(this.state.user.userId, this.state.book.id).then(responseReview => this.setState({
                        reviews: responseReview
                    })));
                }
            )
        }
        else {
            // console.log(this.state.book);
            var review = {
                reviewText: this.state.currentReview
            }
            console.log('in else');
            this.reviewService.addReviewForBook(this.state.user.userId, this.state.book.id, review).then(response => this.reviewService.fetchReviewsForBooks(this.state.user.userId, this.state.book.id).then(responseReview => this.setState({
                reviews: responseReview
            })))
        }
    }



    handleReviewDeleteClick(event,review) {
        console.log(this.state.book);
       /* var review = {
            reviewText: this.state.currentReview
        }*/
        this.reviewService.deleteReview(review.id,review).then(response=> {
            this.reviewService.fetchOtherReviews(this.state.book.id).then(responseReview => this.setState({
                newReviews: responseReview
            }));
        });

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


                        {this.state.user.userId !== '' &&
                        <a href={"/bookpreview/" + this.props.book.volumeInfo.industryIdentifiers[0].identifier}>
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

                                {this.props.book.volumeInfo.categories !== undefined &&
                                <p><strong>Category:</strong> {this.props.book.volumeInfo.categories[0]}</p>}
                            </div>
                        </div>

                        <p><strong>Description:</strong> {this.props.book.volumeInfo.description}</p>


                    </div>

                </div>
                <br/>


                {this.state.user.userId !== '' && this.state.user.type == 'user' &&
                <div className="row">
                    <div align="center" className="col-6">
                        <h1>Personal Notes</h1>
                        <br/>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">Personal Notes</span>
                            </div>
                            <textarea
                                onChange={(event) => {
                                    this.setState({currentNote: event.target.value})
                                    console.log(event.target.value)
                                }}
                                className="form-control" aria-label="With textarea">sdsda</textarea>
                            <button className="btn btn-primary" onClick={(event) => {
                                this.handleNotesClick(event)
                            }}>Submit
                            </button>
                        </div>
                        {this.state.notes.map(note => <h4> {note.noteComment} </h4>)}
                    </div>
                    <div align="center" className="col-6">
                        <h1>Reviews</h1>
                        {this.state.newReviews.map(review =>

                            <div align="center">
                            <p> Review: {review.reviewText} Reviewer: {review.user.username} </p>
                            </div>
                        )}
                    </div>
                </div>
                }


                {this.state.user.userId !== '' && this.state.user.type == 'author' &&
                    <div>
                <div className="row">
                    <div className="col-6">
                        <h1 align ="center">Add Reviews</h1>

                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"> Reviews </span>
                                </div>
                                <textarea
                                    onChange={(event) => {
                                        this.setState({currentReview: event.target.value})
                                        console.log(event.target.value)
                                    }}
                                    className="form-control" aria-label="With textarea">abcde</textarea>
                                <button className="btn btn-primary" onClick={(event) => {
                                    this.handleReviewsClick(event)
                                }}>Submit
                                </button>
                            </div>
                        {this.state.reviews.map(review =>
                            <h4> {review.reviewText}  </h4>
                        )}

                    </div>
                    <div align="center" className="col-6">
                        <h1>Other Reviews</h1>
                        {this.state.newReviews.map(review =>
                            <div align="center">
                                <p> Review: {review.reviewText} Reviewer: {review.user.username} </p>
                            </div>
                        )}
                    </div>
                </div>

                    </div>

                }

                {this.state.user.userId !== '' && this.state.user.type == 'admin' &&
                <div>
                            {this.state.newReviews.map(review =>
                                <div >


                                    <p>
                                        <br/>
                                        Review: {review.reviewText} Reviewer: {review.user.username}

                                    <button className="btn btn-danger float-right" onClick={(event) => {
                                        this.handleReviewDeleteClick(event,review)
                                    }}>Delete
                                    </button>
                                    </p>

                                </div>

                            )}

                </div>

                }



            {/*    {this.state.user.userId !== '' &&
                <div>
                    <div className="row">
                        {this.state.user.type == 'user' &&
                        <div className="col-6">


                        </div>
                        }

                        {this.state.user.type == 'author' &&
                        <div className="col-6">

                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"> Reviews </span>
                                </div>
                                <textarea
                                    onChange={(event) => {
                                        this.setState({currentReview: event.target.value})
                                        console.log(event.target.value)
                                    }}
                                    className="form-control" aria-label="With textarea">abcde</textarea>
                                <button className="btn btn-primary" onClick={(event) => {
                                    this.handleReviewsClick(event)
                                }}>Submit
                                </button>
                            </div>
                        </div>
                        }



                    </div>


                    <div className="row">


                        {this.state.user.type === 'user' &&
                        <div className="col-6">

                        </div>
                        }



                        {this.state.user.type === 'author' && <div className="col-6">
                            {this.state.reviews.map(review =>

                                <h4> {review.reviewText}  </h4>
                            )}
                        </div>
                        }

                    </div>
                </div>


                }*/}
            </div>


        )
    }
}