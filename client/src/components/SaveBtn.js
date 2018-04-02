import React from "react";

class SaveBtn extends React.Component {
    constructor(props) {
        super(props);

    }
    SetPads = () => {
        let pads =this.props.pads;


      };

    render() {
        return (
            <div>
                <button> Save Pattern </button>
                <button> Load Pattern </button>
            </div>
        )
    };
}

export default SaveBtn;