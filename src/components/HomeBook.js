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




                <div className="card"
                     styles={{width: '18rem'}}>


                        <img className="card-img-top"
                             src={this.props.img} style={{width: "200px", height: "300px"}}/>


                    <div className="card-body">
                        <h5 className="card-title">
                            {/*{this.props.book.volumeInfo.title}*/}
                        </h5>
                    </div>
                </div>


            </div>


        )
    }
}