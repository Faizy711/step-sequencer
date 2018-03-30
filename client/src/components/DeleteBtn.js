import React from "react";
import deleteicon1 from "../images/001-delete-3.svg";
import deleteicon2 from "../images/003-delete-2.svg";
import deleteicon3 from "../images/004-delete-1.svg";
import deleteicon4 from "../images/002-garbage.svg";
import deleteicon5 from "../images/005-delete.svg";


class DeleteBtn extends React.Component {
    constructor(props) {
      super(props);
      this.state = {

        };
    }
  
    render() {
        return (
            <div className="DeleteBtn">
                <img src={deleteicon3} className="clearIcon" alt="clear" onClick={() => this.props.clearRow(this.props.rowIndex)}/>
                <img src={deleteicon5} className="deleteIcon" alt="delete" onClick={() => this.props.deleteRow(this.props.rowIndex)} />
            </div>
        )
    };
  }

  export default DeleteBtn;