import React, {Component} from 'react';
import {Link, Route} from 'react-router-dom'
import UserService from "../services/UserService";
import '../styles/BookViewerStyle.css';


class HeaderComponent extends React.Component {

    constructor() {

        super();
        this.state = {
            user: {userId: ''}
        };
        this.userService = UserService.instance;
    }

    componentDidMount() {
        this.userService.getProfile().then(response => {
                console.log('User in');
                console.log(response);

                if (response.status == 500)
                    return

                this.setState({

                    user: response
                });


            }
        )
        ;
    }


    logoutUserApi() {
        this.userService.logoutUser().then(response => window.location.replace('/home'));

    }


    render() {
        return (
            <div className="container col">
                {this.state.user !== 'undefined' && <h3>Welcome <strong>{this.state.user.firstName} {this.state.user.lastName}</strong>!</h3>}

                {this.state.user.userId == '' &&
                <Link to="/login" className="btn btn-success float-right button3 button3">Login</Link>}
                &nbsp;

                {this.state.user.userId == '' && <Link to="/register" className="btn btn-dark float-right button3">Register</Link>}
                &nbsp;

                <Link to="/home" className="btn btn-primary float-left button3">Home</Link>
                &nbsp;

                {this.state.user.userId !== '' && <Link to="/profile" className="btn btn-primary float-right button3">Profile</Link> }
                &nbsp;

                {this.state.user.userId !== '' && <button className="btn btn-danger float-right button3" onClick={() => {
                    this.logoutUserApi()
                }}>Logout</button>}
            <br/>
                <br/>
            </div>
        )
    }

}

export default HeaderComponent;