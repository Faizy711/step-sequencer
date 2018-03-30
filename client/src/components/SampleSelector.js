import React from "react";

import samples from "./samples.json";

class SampleSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: true,
        };


    }


    render() {
        return (
            <div>
                <select className="selector" autoFocus value={this.props.selectedDrum} onChange={this.props.onSelectDrum.bind(this)} onBlur={this.close}>{this.props.createdDrums}</select>
            </div>
        )
    };
}

export default SampleSelector;