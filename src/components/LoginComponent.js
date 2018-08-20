import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import UserService from "../services/UserService";
import GoogleLogin from 'react-google-login';
import '../styles/BookViewerStyle.css';

export default class LoginComponent extends React.Component {

    constructor(props){
        super(props);
        this.state={
            username:'',
            password:''
        }
        this.service = UserService.instance;
    }

    responseGoogle=(googleUser)=>{
        console.log(googleUser);
        var userNew = {
            username: googleUser.profileObj.email,
            password: googleUser.profileObj.googleId,
            firstName: googleUser.profileObj.givenName,
            lastName: googleUser.profileObj.familyName,
            googleId: googleUser.profileObj.googleId,
            type: 'user',
        }
         this.service.checkGoogleId(googleUser.profileObj.googleId).then((response)=>
         {
             if(response.googleId == null)
             {
                 this.service.registerUser(userNew).then((response) => {
                 window.location.replace("/home");
             });
             }
             else {
                 this.service.getLogin(userNew).then((response) => {
                     if(response != null)
                         window.location.replace("/home");
                     else
                         alert('Invalid Username or Password!');
                 });
             }
         })

    }

    render() {
        return (
            <div className="-align-center">
                <MuiThemeProvider>
                    <div className="-align-center">
                        <AppBar
                            title="Login"
                        />
                        <TextField
                            hintText="Enter your Username"
                            floatingLabelText="Username"
                            onChange = {(event,newValue) => this.setState({username:newValue})}
                        />
                        <br/>
                        <TextField
                            type="password"
                            hintText="Enter your Password"
                            floatingLabelText="Password"
                            onChange = {(event,newValue) => this.setState({password:newValue})}
                        />
                        <br/>
                        <RaisedButton className="searchbar" label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
                        <GoogleLogin className=" btn btn-danger button3"
                            clientId="76076140323-tdeq6ph7jv4jg2cabols2mg5jfffctrg.apps.googleusercontent.com"
                            buttonText="Google Login"
                            onSuccess={this.responseGoogle}
                            onFailure={this.responseGoogle}
                        />
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }


    handleClick(event){
        this.service.getLogin(this.state).then((response) => {
            if(response != null)
                window.location.replace("/home");
            else
                alert('Invalid Username or Password!');
        });
    }
}

const style = {
    margin: 15,
};