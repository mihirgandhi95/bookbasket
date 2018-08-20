import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import UserService from "../services/UserService";
import HeaderComponent from "./HeaderComponent";

export default class LoginComponent extends React.Component {

    constructor(props){
        super(props);
        /* this.state={
             username:'',
             password:'',
             firstName: '',
             lastName: ''
         }*/

        this.state = {


            userId: '',
            username:'',
            password: '',
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',

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
                    username: response.username,
                    firstName: response.firstName,
                    lastName: response.lastName,
                    password: response.password,
                    phoneNumber: response.phoneNumber,
                    email: response.email,
                    googleId: response.googleId

                });


            }
        );
    }


    render() {
        return (
            <div>
                <HeaderComponent/>
                <MuiThemeProvider>
                    <div>
                        <AppBar
                            title="Profile"
                        />
                        <TextField
                            hintText="Username"
                            floatingLabelText={this.state.username}
                            /*onChange = {(event,newValue) => this.setState({

                                    username: newValue
                                })}*/
                        />
                        <br/>
                        {this.state.googleId == null &&  <TextField
                            type="password"
                            hintText="Password"
                            floatingLabelText={this.state.password}
                            onChange = {(event,newValue) => this.setState({

                                password:newValue
                            })}
                        />}
                        <br/>
                        <TextField
                            type="text"
                            hintText="firstName"
                            floatingLabelText={this.state.firstName}
                            onChange = {(event,newValue) => this.setState({

                                firstName:newValue
                            })}
                        />
                        <br/>
                        <TextField
                            type="text"
                            hintText="lastName"
                            floatingLabelText={this.state.lastName}
                            onChange = {(event,newValue) => this.setState({

                                lastName:newValue
                            })}
                        />
                        <br/>
                        <br/>
                        <TextField
                            type="text"
                            hintText="email"
                            floatingLabelText={this.state.email}
                            onChange = {(event,newValue) => this.setState({

                                email:newValue
                            })}
                        />
                        <br/>
                        <br/>
                        <TextField
                            type="text"
                            hintText="phone"
                            floatingLabelText={this.state.phoneNumber}
                            onChange = {(event,newValue) => this.setState({

                                phoneNumber:newValue
                            })}
                        />
                        <br/>

                        <RaisedButton label="Update" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }


    handleClick(event){
        this.userService.updateProfile(this.state).then((response) => {
            if(response != null)
                window.location.reload();
            else
                alert('Wrong input for the entries!');
        });
    }
}

const style = {
    margin: 15,
};