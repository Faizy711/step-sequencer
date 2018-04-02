import React, { Component } from 'react';

import ReactDOM from 'react-dom';
import API from "../utils/API";
import { Button, FormGroup, FormControl, ControlLabel, Modal } from "react-bootstrap";

class SignUpContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            FirstName: "",
            LastName: "",
            email: "",
            password: ""
        };
    }

    validateForm = () => {
        return this.state.email.length > 0 && this.state.password.length > 0 && this.state.FirstName.length > 0 && this.state.LastName.length > 0;
    };

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
        console.log("Email: ", this.state.email, "Password: ", this.state.password);
    };

    handleSubmit = event => {
        event.preventDefault();
        console.log("Email: ", this.state.email, "Password: ", this.state.password);
    };

    handleFormSubmit = event => {
        event.preventDefault();
        console.log("User submit?")
        if (this.state.FirstName && this.state.LastName && this.state.email && this.state.password) {
          API.saveUser({
            FirstName: this.state.FirstName,
            LastName: this.state.LastName,
            Email: this.state.email,
            Password: this.state.password
          })
            .catch(err => console.log(err));
        }
        
      };

    render() {
        return (
            <div className="SignUp">
                <form onSubmit={this.handleFormSubmit}>
                <FormGroup className="form_FirstName" controlId="FirstName" bsSize="large">
                        <ControlLabel className="label" >First Name</ControlLabel>
                        <FormControl
                            autoFocus
                            type="text" 
                            name="firstname" 
                            placeholder="First Name" 
                            required=""
                            value={this.state.FirstName}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup className="form_LastName" controlId="LastName" bsSize="large">
                        <ControlLabel className="label" >Last Name</ControlLabel>
                        <FormControl
                            type="text" 
                            name="lastname" 
                            placeholder="Last Name" 
                            required=""
                            value={this.state.LastName}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
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
                    <Button
                        className="login_button"
                        block
                        bsSize="large"
                        disabled={!this.validateForm()}
                        type="submit"
                        onClick={this.props.onClose}>
                        Login
                    </Button>
                </form>
            </div>
        );
    }
}

export default SignUpContainer;