import React, { Component } from 'react';

import ReactDOM from 'react-dom';
import { Button, FormGroup, FormControl, ControlLabel, Modal } from "react-bootstrap";

class SignInContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            auth: false,
            submit: false
        };
    }


    handleFormSubmit = event => {
        event.preventDefault();
        this.props.LoadUsers;
        console.log("Email: ", this.props.email, "Password: ", this.props.password);
        let users = this.props.users;
        let email = this.props.email;
        let password = this.props.password;
        let exist = this.state.auth;

        for(var i=0; i< users.length; i++){
            if(users[i].Email === email && users[i].Password === password){
                console.log("Succes log In!")
                exist = true;
                this.setState({auth: true, submit: true});
               
                break;
            }
            else{
                console.log("Does not exist")
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
            <div className="SignIn">
                <form onSubmit={this.handleFormSubmit}>
                    <FormGroup className="form_email" controlId="email" bsSize="large">
                        <ControlLabel className="label" >Email</ControlLabel>
                        <FormControl
                            type="text" 
                            name="email" 
                            placeholder="E-mail" 
                            required=""
                            value={this.props.email}
                            onChange={this.props.handleChange}
                        />
                    </FormGroup>
                    <FormGroup className="form_password" controlId="password" bsSize="large">
                        <ControlLabel className="label"  >Password</ControlLabel>
                        <FormControl
                            type="password" 
                            name="password" 
                            placeholder="Password" 
                            required=""
                            value={this.props.password}
                            onChange={this.props.handleChange}
                            type="password"
                        />
                    </FormGroup>
                    {login_message}
                    <Button
                        className="login_button"
                        block
                        bsSize="large"
                        disabled={!this.props.validateForm}
                        type="submit">
                        Login
                    </Button>
                </form>
            </div>
        );
    }
}

export default SignInContainer;