import React from 'react';


const Controls = (props) => {

    let buttonText = props.playing ? 'Stop' : 'Play';
    return (
        <div className="controls">
            <button onClick={() => props.togglePlaying()}>{buttonText}</button>
            <div className="bpm">
                <label>BPM:</label>
                <input
                    type="range"
                    id="bpm"
                    min="1"
                    max="420"
                    step="1"
                    defaultValue={props.bpm}
                    onChange={props.handleChange} />
                <output>
                    {props.bpm}
                </output>
            </div>
            <button onClick={() => props.addNewPads()}>+</button>
        </div>
    );
}


export default Controls;