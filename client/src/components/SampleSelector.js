import React from "react";

import samples from "./samples.json";

class SampleSelector extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          open: true,
        };

        this.handleChange = this.handleChange.bind(this);
    }
  
    open = (event) => {
      event.preventDefault();
      this.setState({open: true});
    };
  
    close = () => {
      this.setState({open: false});
    };
  
    handleChange(event) {
        this.setState({value: event.target.value});
        var currentSample = event.target.value;
        var key = event.target.key;

        console.log(currentSample,"key: " + key);
    }
  
    render() {
      const {current} = this.props;
        return (
          <select className="selector" autoFocus value={this.props.selectedDrum} onChange={this.props.onSelectDrum.bind(this)} onBlur={this.close}>{this.props.createdDrums}</select>
        )
    };
  }

  export default SampleSelector;