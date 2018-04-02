import React, { Component } from 'react';

import ReactDOM from 'react-dom';
import API from "../utils/API";
import { Button, FormGroup, FormControl, ControlLabel, Modal } from "react-bootstrap";

class SignUpContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: [],
            email: "",
            password: "",
            auth: false,
            submit: false
        };
    }

    componentDidMount() {
        this.loadUsers();
        console.log(this.state.users);
    }
    
    loadUsers = () => {
        API.getUser()
          .then(res =>
            this.setState({ users: res.data, email: "", password: "" })
          )
          .catch(err => console.log(err));
    };

    validateForm = () => {
        return this.state.email.length > 0 && this.state.password.length > 0;
    };

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
        console.log("Email: ", this.state.email, "Password: ", this.state.password);
        console.log(this.state.users);
    };

    handleSubmit = event => {
        event.preventDefault();
        console.log("Email: ", this.state.email, "Password: ", this.state.password);
        let users = this.state.users;
        let email = this.state.email;
        let password = this.state.password;
        let exist = this.state.auth;

        for(var i=0; i< users.length; i++){
            if(users[i].Email === email && users[i].Password === password){
                // console.log("Succes log In!")
                exist = true;
                this.setState({auth: true, submit: true});
               
                break;
            }
            else{
                // console.log("Does not exist")
                this.setState({auth: false, submit: true});
                exist = false;
            }
        }

        if(exist){
            console.log("Succes log In!");
            console.log(this.state.submit);
            
        }
        else{
            console.log("Does not exist");
        }
    };

    render() {
        var login_message;
        if(this.state.submit){
            if(this.state.auth){
                login_message = <div>Successfully Logged In</div>
            }
            else{
                login_message = <div>The User does not exist or password incorrect please try again</div>
            }
        }
        return (
            <div className="SignUp">
                <form onSubmit={this.handleSubmit}>
                    <FormGroup className="form_email" controlId="email" bsSize="large">
                        <ControlLabel className="label" >Email</ControlLabel>
                        <FormControl
                            type="text" 
                            name="email" 
                            placeholder="E-mail" 
                            required=""
                            value={this.state.email}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup className="form_password" controlId="password" bsSize="large">
                        <ControlLabel className="label"  >Password</ControlLabel>
                        <FormControl
                            type="password" 
                            name="password" 
                            placeholder="Password" 
                            required=""
                            value={this.state.password}
                            onChange={this.handleChange}
                            type="password"
                        />
                    </FormGroup>
                    {login_message}
                    <Button
                        className="login_button"
                        block
                        bsSize="large"
                        disabled={!this.validateForm()}
                        type="submit">
                        Login
                    </Button>
                </form>
            </div>
        );
    }
}

export default SignUpContainer;