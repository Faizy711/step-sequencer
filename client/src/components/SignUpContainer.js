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
            password: "",
            signedUp: false,
            exist: true,
            FNFill: false,
            LNFill: false,
            EMFill: false,
            PSFill: false
        };
    }

    // validateForm = () => {
    //     return this.state.email.length > 0 && this.state.password.length > 0 && this.state.FirstName.length > 0 && this.state.LastName.length > 0;
    // };

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

    SetFalse = () => {
        this.setState({FNFill: false});
        this.setState({LNFill: false});
        this.setState({EMFill: false});
        this.setState({PSFill: false});
    }

    handleFormSubmit = event => {
        event.preventDefault();
        console.log("User submit?")
        let users = this.props.users;
        console.log(users);
        this.SetFalse();

        if(this.state.FirstName){
            this.setState({FNFill: true});
        }

        if(this.state.LastName){
            this.setState({LNFill: true});
        }

        if(this.state.email){
            this.setState({EMFill: true});
        }

        if(this.state.password){
            this.setState({PSFill: true});
        }


        for(var i=0; i<users.length; i++){
            if(this.state.email === users[i].Email){
                this.setState({exist: true});
                this.setState({signedUp: true});
                break;
            }
            else{
                this.setState({exist: false});
                this.setState({signedUp: true});
            }
        }

        if(!this.state.exist){
            // if (this.state.FirstName && this.state.LastName && this.state.email && this.state.password) {
                API.saveUser({
                  FirstName: this.state.FirstName,
                  LastName: this.state.LastName,
                  Email: this.state.email,
                  Password: this.state.password
                })
                  .catch(err => console.log(err));
      
                  
            // }
        }
      };

    render() {
        var signup_message;
        if(this.state.signedUp){
            if(!this.state.exist && this.state.FNFill && this.state.LNFill && this.state.EMFill && this.state.PSFill){
                signup_message = <div>Successfully Signed Up please Sign In</div>
            }
            else if(!this.state.exist && !this.state.FNFill && this.state.LNFill && this.state.EMFill && this.state.PSFill){
                signup_message = <div>Missing First Name</div>
            }
            else if(!this.state.exist && this.state.FNFill && !this.state.LNFill && this.state.EMFill && this.state.PSFill){
                signup_message = <div>Missing Last Name</div>
            }
            else if(!this.state.exist && this.state.FNFill && this.state.LNFill && !this.state.EMFill && this.state.PSFill){
                signup_message = <div>Needs Email/User</div>
            }
            else if(!this.state.exist && this.state.FNFill && this.state.LNFill && this.state.EMFill && !this.state.PSFill){
                signup_message = <div>Please type in your password</div>
            }
            else if(this.state.exist && this.state.FNFill && this.state.LNFill && this.state.EMFill && this.state.PSFill){
                signup_message =<div>User already exists please type in new user or sign in</div>
            }
            else if(this.state.exist && !this.state.FNFill && !this.state.LNFill && !this.state.EMFill && !this.state.PSFill){
                signup_message =<div>User already exists please type in new user or sign in</div>
            }
        }
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
                    {signup_message}
                    <Button
                        className="login_button"
                        block
                        bsSize="large"
                        // disabled={!this.validateForm()}
                        type="submit"
                        onClick={this.props.LoadUsers}>
                        Login
                    </Button>
                </form>
            </div>
        );
    }
}

export default SignUpContainer;