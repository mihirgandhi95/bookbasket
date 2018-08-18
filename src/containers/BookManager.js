import React,{Component} from 'react';
import BookCard from '../components/BookCard';
import SearchBar from "../components/SearchBar";
import {BrowserRouter as Router,Route} from 'react-router-dom'
import BookPreview from "../components/BookPreview";


export default class BookManager
    extends Component {

    render() {
        return (
            <div className="container-fluid">

                <Router>
                    <div>
                        <Route path="/home" component={SearchBar}/>
                        <Route path="/bookpreview/:id" component={BookPreview}/>
                        <Route path="/bookdescription/:id" component={BookPreview}/>
                    </div>
                </Router>



            </div>
        )}}