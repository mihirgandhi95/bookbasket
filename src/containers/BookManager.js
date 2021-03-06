import React, {Component} from 'react';
import SearchBar from "../components/SearchBar";
import {BrowserRouter as Router, Route} from 'react-router-dom'
import BookPreview from "../components/BookPreview";
import BookDescription from "../components/BookDescription";
import HomeComponent from "../components/HomeComponent";

import LoginComponent from "../components/LoginComponent";
import RegistrationComponent from "../components/RegisterComponent";
import ProfileComponent from "../components/ProfileComponent";


let
    imgUrl = '.../images/background.jpg';
let
    styles = {
        root: {
            backgroundImage: `url(${ imgUrl })`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
        }
    }

export default class BookManager
    extends Component {



    render() {
        return (
            <div className="container-fluid" style={styles}>

                <Router>
                    <div>
                        <Route path="/search" component={SearchBar}/>
                        <Route path="/bookpreview/:id" component={BookPreview}/>

                        <Route path="/bookdescription/:id" component={BookDescription}/>
                        <Route path="/home" component={HomeComponent}/>
                        <Route path="/login"
                               component={LoginComponent}>
                        </Route>
                        <Route path="/register"
                               component={RegistrationComponent}>
                        </Route>
                        <Route path="/profile"
                               component={ProfileComponent}>
                        </Route>
                    </div>
                </Router>


            </div>
        )
    }
}
