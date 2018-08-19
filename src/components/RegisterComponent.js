import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import UserService from "../services/UserService";
import {Link,Route} from 'react-router-dom'

export default class RegisterComponent extends React.Component {

    constructor(props){
        super(props);
        this.state={
            firstName:'',
            username:'',
            lastName:'',
            type:'',
            email:'',
            password:''
        }
        this.service = UserService.instance;
        this.updateType = this.updateType.bind(this);
    }


    updateType(){
        this.setState({
            type:document.getElementById("typeSelect").value
        })
    }

    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <div>
                        <AppBar
                            title="Register"
                        />
                        <TextField
                            hintText="Enter your First Name"
                            floatingLabelText="First Name"
                            onChange = {(event,newValue) => this.setState({firstName:newValue})}
                        />
                        <br/>
                        <TextField
                            hintText="Enter your Last Name"
                            floatingLabelText="Last Name"
                            onChange = {(event,newValue) => this.setState({lastName:newValue})}
                        />
                        <br/>
                        <TextField
                            hintText="Enter your Username"
                            floatingLabelText="Username"
                            onChange = {(event,newValue) => this.setState({username:newValue})}
                        />
                        <br/>
                        <TextField
                            hintText="Enter your Email"
                            type="email"
                            floatingLabelText="Email"
                            onChange = {(event,newValue) => this.setState({email:newValue})}
                        />
                        <br/>
                        <h4>Select User Type:</h4>
                        <select id="typeSelect" onChange={this.updateType}>
                            <option value="user">Registered User</option>
                            <option value="author">Author</option>
                            <option value="admin">Admin</option>
                        </select>
                        <br/>
                        <TextField
                            type = "password"
                            hintText="Enter your Password"
                            floatingLabelText="Password"
                            onChange = {(event,newValue) => this.setState({password:newValue})}
                        />
                        <br/>
                        <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }


    handleClick(event){
    this.service.registerUser(this.state).then((response) => {
         window.location.replace("/home");
    });
    }

}

const style = {
    margin: 15,
};