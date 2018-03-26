import React from "react";

class DrumMachine extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            steps: [0, 0, 0, 0],
            currentStep: 0,
            playing: false
        }
    };

    render() {
        const{ currentStep, playing, steps } = this.state;

        return (
            <div className="sequence-wrapper">
                <div className="step-display">
                    Current Step: {currentStep % steps.length}
                </div>
                <button 
                    className="play-button" 
                    onClick={()=>this.handlePlayPress()}
                >
                    {playing ? 'Stop' : 'Play'}
                </button>
            </div>
        );
    }
}

export default DrumMachine;

