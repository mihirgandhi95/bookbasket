import React,{Component} from 'react';
import SearchService from "../services/SearchService"
import {Link,Route} from 'react-router-dom'
import {BrowserRouter as Router} from 'react-router-dom'
import BookPreview from "./BookPreview";
import '../styles/BookViewerStyle.css';


export default class BookCard extends React.Component
{
    constructor(props){
        super(props)
    }

    render(){
        return (
            <div className="card bookcard"
                 styles={{width: '18rem'}}>

                <a href={"/bookdescription/"+this.props.book.volumeInfo.industryIdentifiers[0].identifier}>
                <img className="card-img-top"
                     src={this.props.book.volumeInfo.imageLinks.thumbnail.replace("zoom=1","zoom=0")} style={{width: "200px", height: "300px"}}/>
                </a>

             {/*   <div className="card-body">
                    <h5 className="card-title">
                        {this.props.book.volumeInfo.title}
                    </h5>
                </div>*/}
            </div>
        )
    }
}