import React from "react";
import API from "../utils/API";
import Modal from 'react-responsive-modal';

class SaveBtn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            usersavedPads: [],
            UserPads: []
        }

        this.SetPads = this.SetPads.bind(this);
    }

    onOpenModal_SavePattern = () => {
        console.log(this.props.pads_users);
        this.props.LoadUserPads;
        this.FindUserPads();
        this.setState({ open: true });

    };

    onCloseModal_SavePattern = () => {
        this.setState({ open: false });
    };

    SetPads = () => {
        console.log("press")
        let pads = this.props.pads;
        let current_users = this.props.users
        let current_email = this.props.email
        console.log(pads);
        console.log(current_email);
        console.log(current_users);

        for (var i = 0; i < current_users.length; i++) {
            console.log(current_email[i].Email);
            if (current_email === current_users[i].Email) {
                API.savePads({
                    Email: current_email,
                    Pads: pads
                })
                    .catch(err => console.log(err));
                break;
            }
            else {
                console.log("user does not exist")
            }
        }
    };

    ClickPads = (rowIndex, event) => {
        console.log(rowIndex);
        console.log(this.state.usersavedPads[rowIndex]);

        // this.state.usersavedPads[rowIndex] = this.props.pads;

        this.props.clickPadButtons(this.state.usersavedPads[rowIndex]);

    }

    FindUserPads = () => {
        let UserPads = [];
        let rowIndex = 0;
        let button_count = 1;
        let key_count = 0;
        let tempUserPads = [];
        for (var i = 0; i < this.props.pads_users.length; i++) {
            if (this.props.email === this.props.pads_users[i].Email) {
                UserPads.push(<div><button onClick={this.ClickPads.bind(this, rowIndex)} key={key_count}> Pads {button_count} </button></div>);
                button_count++;
                tempUserPads.push(this.props.pads_users[i].Pads);
                rowIndex++;
                key_count++;
            }
            
        }
        this.setState({UserPads: UserPads});
        this.setState({usersavedPads: tempUserPads});
        console.log(this.state.UserPads);
        console.log(this.state.usersavedPads);
    }



    render() {
        const { open } = this.state;
        return (
            <div>
                <button onClick={this.SetPads}> Save Pattern </button>
                <button onClick={this.onOpenModal_SavePattern}> Load Pattern </button>
                <Modal open={open} onClose={this.onCloseModal_SavePattern} little>
                    <p>Save your sequence</p>
                    {this.state.UserPads}
                </Modal>
            </div>
        )
    };
}

export default SaveBtn;