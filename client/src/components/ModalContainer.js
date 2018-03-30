import React, { Component } from 'react';

import ReactDOM from 'react-dom';

import { Button, FormGroup, FormControl, ControlLabel, Modal } from "react-bootstrap";

class ModalContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: ""
        };
    }

    validateForm = () => {
        return this.state.email.length > 0 && this.state.password.length > 0;
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

    render() {
        return (
            <div className="Login">
                <form onSubmit={this.handleSubmit} action="/" method="post">
                    <FormGroup className="form_email" controlId="email" bsSize="large">
                        <ControlLabel className="label" >Email</ControlLabel>
                        <FormControl
                            autoFocus
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
                        type="submit">
                        Login
                    </Button>
                </form>
            </div>
        );
    }
}

export default ModalContainer;