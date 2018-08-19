import React, {Component} from 'react';
import SearchService from "../services/SearchService"
import {Link, Route} from 'react-router-dom'
import {BrowserRouter as Router} from 'react-router-dom'
import BookPreview from "./BookPreview";
import BookViewerStyles from "../styles/BookViewerStyle.css"

export default class HomeBook extends React.Component {

    constructor(props) {
        super(props)

    }

    handleNotesClick(event)
    {

    }


    render() {
        return (

            <div>




                <div className="card"
                     styles={{width: '18rem'}}>


                    {this.props.book.isbns[0] && <a href={"/bookdescription/" + this.props.book.isbns[0].isbn10}>
                        <img className="card-img-top"
                             src={this.props.img} style={{width: "200px", height: "300px"}}/>
                    </a>
                    }

                    <div className="card-body">
                        <h5 className="card-title">
                            {/*{this.props.book.volumeInfo.title}*/}

                        </h5>
                        <p className="card-text"></p>

                    </div>
                </div>


            </div>


        )
    }
}
