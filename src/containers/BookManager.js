import React,{Component} from 'react';
import BookCard from '../components/BookCard';
import SearchBar from "../components/SearchBar";
import {BrowserRouter as Router,Route} from 'react-router-dom'
import BookPreview from "../components/BookPreview";
import BookDescription from "../components/BookDescription";
import HomeComponent from "../components/HomeComponent";

export default class BookManager
    extends Component {

    render() {
        return (
            <div className="container-fluid">

                <Router>
                    <div>
                        <Route path="/search" component={SearchBar}/>
                        <Route path="/bookpreview/:id" component={BookPreview}/>
                        <Route path="/bookdescription/:id" component={BookDescription}/>
                        <Route path="/home" component={HomeComponent}/>
                    </div>
                </Router>



            </div>
        )}}
