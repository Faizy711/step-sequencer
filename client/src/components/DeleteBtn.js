import React from "react";

class DeleteBtn extends React.Component {
    constructor(props) {
      super(props);
      this.state = {

        };
    }
  
    render() {
        return (
            <div className="DeleteBtn">
                <button onClick={() => this.props.clearRow(this.props.rowIndex)} >Clear</button>
                <button>Delete</button>
            </div>
        )
    };
  }

  export default DeleteBtn;