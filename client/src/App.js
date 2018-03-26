import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import DrumMachine from './components/DrumMachine';
import Pads from './components/Pads';
import Controls from './components/Controls';

class App extends Component {
  constructor() {
    super();
    this.frequencies = [261.63, 277.18, 293.66, 311.13, 329.63, 349.23, 369.99, 392];
    this.audioCx = new (window.AudioContext || window.webkitAudioContext)();
    this.gain = this.audioCx.createGain();
    this.gain.connect(this.audioCx.destination);
    this.gain.gain.value = 1;
    this.state = {
      pads: [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0]
      ],
      playing: false,
      position: 0,
      bpm: 220
    }
    this.togglePlaying = this.togglePlaying.bind(this);
    this.toggleActive = this.toggleActive.bind(this);
    this.changeBpm = this.changeBpm.bind(this);
  }

  toggleActive(rowIndex, id) {
    console.log('Pad', rowIndex, id);
    let pads = [...this.state.pads];
    let padState = pads[rowIndex][id];

    if (padState === 1) {
      pads[rowIndex][id] = 0;
    } else {
      pads[rowIndex][id] = 1;
    }

    this.setState({ pads: pads });
  }

  togglePlaying() {
    if (this.state.playing) {
      clearInterval(this.timerId);
      this.setState({ playing: false });
    } else {
      this.setTimer();
      this.setState({ playing: true });
    }
  }

  setTimer() {
    this.timerId = setInterval(() => this.tick(), this.calculateTempo(this.state.bpm));
  }

  calculateTempo(bpm) {
    return 60000 / bpm;
  }

  tick() {
    let pos = this.state.position;
    pos++;

    if (pos > 7) {
      pos = 0;
    }

    this.setState({ position: pos });
    console.log(pos);

    this.checkPad();
  }

  checkPad() {
    this.state.pads.forEach((row, rowIndex) => {
      row.forEach((pad, index) => {
        if (index === this.state.position && pad === 1) {
          console.log("active");
          this.playSound(rowIndex);
        };
      })
    });
  }
  playSound(rowIndex) {
    // let freq = this.frequencies[rowIndex];
    // let node = this.audioCx.createOscillator();
    // let currentTime = this.audioCx.currentTime;
    // node.frequency.value = freq;
    // node.detune.value = 0;
    // node.type = 'sine';
    // node.connect(this.gain);
    // node.start(currentTime);
    // node.stop(currentTime + 0.2);
    if(rowIndex === 0){
      console.log("Row: 0");
    }
  }

  changeBpm(bpm) {
    this.setState({ bpm: bpm.target.value });
    if (this.state.playing) {
      clearInterval(this.timerId);
      this.setTimer();
    }
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Pads pos={this.state.position} pads={this.state.pads} toggleActive={this.toggleActive} />
        <Controls
          bpm={this.state.bpm}
          handleChange={this.changeBpm}
          playing={this.state.playing}
          togglePlaying={this.togglePlaying} />
      </div>
    );
  }
}

export default App;
