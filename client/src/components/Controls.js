import React, { Component } from 'react';

class Controls extends React.Component {
    constructor(props) {
        super(props);
        
    }

        render() {
            let buttonText = this.props.playing ? 'Stop' : 'Play';
            return (
                <div className="controls">
                    <button className="control_buttons" onClick={() => this.props.togglePlaying()}>{buttonText}</button>
                    <div className="bpm">
                        <label>BPM:</label>
                        <input
                            type="range"
                            id="bpm"
                            min="1"
                            max="210"
                            step="1"
                            defaultValue={this.props.bpm}
                            onChange={this.props.handleChange} />
                        <output>
                            {this.props.bpm}
                        </output>
                    </div>
                    <button className="control_buttons" onClick={() => this.props.addNewPads()}>+</button>
                </div>
            );
        }
    
}


export default Controls;